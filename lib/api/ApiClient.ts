/**
 * Production-Grade API Client with Token Management
 * Handles all HTTP requests with automatic token refresh and error handling
 */

import { tokenManager, authUtils } from './auth/TokenManager';

// Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

export interface ApiRequestConfig extends RequestInit {
  requiresAuth?: boolean;
  skipErrorHandler?: boolean;
  timeout?: number;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

// Configuration
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api/v1',
  TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;


export interface ErrorWithCode {
  message: string;
  status: number;
  code: string;
  details?: unknown;
}

// Type guard
export function isErrorWithCodeType(obj: unknown): obj is ErrorWithCode {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "message" in obj &&
    typeof (obj as any).message === "string" &&
    "status" in obj &&
    typeof (obj as any).status === "number" &&
    "code" in obj &&
    typeof (obj as any).code === "string"
  );
}



class ApiClient {
  private baseURL: string;
  private onUnauthorized?: () => void;
  private requestInterceptors: Array<(config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>> = [];
  private responseInterceptors: Array<(response: Response) => Response | Promise<Response>> = [];

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Set callback for unauthorized responses (401)
   */
  onUnauthorizedCallback(callback: () => void): void {
    this.onUnauthorized = callback;
    tokenManager.onTokenExpired(callback);
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(
    interceptor: (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>
  ): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(
    interceptor: (response: Response) => Response | Promise<Response>
  ): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * GET request
   */
  async get<T = unknown>(
    endpoint: string,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(
    endpoint: string,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  /**
   * Main request method
   */
  private async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      requiresAuth = true,
      skipErrorHandler = false,
      timeout = API_CONFIG.TIMEOUT,
      ...fetchConfig
    } = config;

    try {
      // Build URL
      const url = this.buildURL(endpoint);

      // Prepare headers
      const headers = await this.prepareHeaders(config.headers, requiresAuth);

      // Apply request interceptors
      let finalConfig: ApiRequestConfig = {
        ...fetchConfig,
        headers,
      };

      for (const interceptor of this.requestInterceptors) {
        finalConfig = await interceptor(finalConfig);
      }

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        // Make request
        let response = await fetch(url, {
          ...finalConfig,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Apply response interceptors
        for (const interceptor of this.responseInterceptors) {
          response = await interceptor(response);
        }

        if (!response.ok){
          const error = response;
          if (isErrorWithCodeType(error)){
            if (error.code === "TOKEN_EXPIRED"){
              console.log("ApiClient: trying to referesh token...")
              try {
                await tokenManager.refreshAccessToken();
                // Retry request with new token
                return this.request<T>(endpoint, config);
              } catch (refreshError) {
                console.error('[ApiClient] Token refresh failed:', refreshError);
                this.handleUnauthorized();
                throw this.createError(
                  'Authentication session expired. Please login again.',
                  401,
                  'TOKEN_EXPIRED'
                );
              }
            }
          }
        }

        // Handle other error status codes
        if (!response.ok) {
          throw await this.handleErrorResponse(response, skipErrorHandler);
        }

        // Parse response
        const data = await this.parseResponse<T>(response);

        return {
          data,
          status: response.status,
          headers: response.headers,
        };
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw this.createError(
          'Request timeout',
          408,
          'REQUEST_TIMEOUT'
        );
      }
      throw this.handleRequestError(error, skipErrorHandler);
    }
  }

  /**
   * Build full URL
   */
  private buildURL(endpoint: string): string {
    // Remove leading slash from endpoint if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    
    // Remove trailing slash from baseURL if present
    const cleanBaseURL = this.baseURL.endsWith('/') 
      ? this.baseURL.slice(0, -1) 
      : this.baseURL;
    
    return `${cleanBaseURL}/${cleanEndpoint}`;
  }

  /**
   * Prepare request headers
   */
  private async prepareHeaders(
    customHeaders?: HeadersInit,
    requiresAuth: boolean = true
  ): Promise<Headers> {
    const headers = new Headers(customHeaders);

    // Set default content type if not already set
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    // Add authorization header if required
    if (requiresAuth) {
      const authHeader = await authUtils.getAuthHeader();
      if ('Authorization' in authHeader) {
        headers.set('Authorization', authHeader.Authorization);
      }
    }

    return headers;
  }

  /**
   * Parse response data
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    // Handle empty responses
    if (response.status === 204 || !contentType) {
      return null as T;
    }

    // Parse JSON
    if (contentType?.includes('application/json')) {
      return response.json();
    }

    // Parse text
    if (contentType?.includes('text/')) {
      return response.text() as T;
    }

    // Parse blob for binary data
    return response.blob() as T;
  }

  /**
   * Handle error response
   */
  private async handleErrorResponse(
    response: Response,
    skipHandler: boolean
  ): Promise<ApiError> {
    let errorMessage = `Request failed with status ${response.status}`;
    let errorDetails: unknown;

    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        errorDetails = await response.json();
        errorMessage = (errorDetails as { message?: string; detail?: string }).message 
          || (errorDetails as { message?: string; detail?: string }).detail 
          || errorMessage;
      } else {
        errorMessage = await response.text() || errorMessage;
      }
    } catch (parseError) {
      console.error('[ApiClient] Failed to parse error response:', parseError);
    }

    const error = this.createError(
      errorMessage,
      response.status,
      this.getErrorCode(response.status),
      errorDetails
    );

    if (!skipHandler) {
      this.logError(error);
    }

    return error;
  }

  /**
   * Handle request error
   */
  private handleRequestError(error: unknown, skipHandler: boolean): ApiError {
    if (this.isApiError(error)) {
      return error;
    }

    const apiError = this.createError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0,
      'NETWORK_ERROR',
      error
    );

    if (!skipHandler) {
      this.logError(apiError);
    }

    return apiError;
  }

  /**
   * Create standardized API error
   */
  private createError(
    message: string,
    status: number,
    code?: string,
    details?: unknown
  ): ApiError {
    return {
      message,
      status,
      code,
      details,
    };
  }

  /**
   * Check if error is ApiError
   */
  private isApiError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'status' in error
    );
  }

  /**
   * Get error code from status
   */
  private getErrorCode(status: number): string {
    const codes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'VALIDATION_ERROR',
      429: 'RATE_LIMIT_EXCEEDED',
      500: 'INTERNAL_SERVER_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE',
    };
    return codes[status] || 'UNKNOWN_ERROR';
  }

  /**
   * Log error
   */
  private logError(error: ApiError): void {
    console.error('[ApiClient] Request failed:', {
      message: error.message,
      status: error.status,
      code: error.code,
      details: error.details,
    });
  }

  /**
   * Handle unauthorized response
   */
  private handleUnauthorized(): void {
    if (this.onUnauthorized) {
      this.onUnauthorized();
    }
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();

// Export utility function to configure API client
export const configureApiClient = (config: {
  baseURL?: string;
  onUnauthorized?: () => void;
}): void => {
  if (config.baseURL) {
    // Create new instance with custom base URL
    Object.assign(apiClient, new ApiClient(config.baseURL));
  }
  
  if (config.onUnauthorized) {
    apiClient.onUnauthorizedCallback(config.onUnauthorized);
  }
};

// Export convenience methods
export const api = {
  get: <T>(endpoint: string, config?: ApiRequestConfig) => 
    apiClient.get<T>(endpoint, config),
  
  post: <T>(endpoint: string, data?: unknown, config?: ApiRequestConfig) => 
    apiClient.post<T>(endpoint, data, config),
  
  put: <T>(endpoint: string, data?: unknown, config?: ApiRequestConfig) => 
    apiClient.put<T>(endpoint, data, config),
  
  patch: <T>(endpoint: string, data?: unknown, config?: ApiRequestConfig) => 
    apiClient.patch<T>(endpoint, data, config),
  
  delete: <T>(endpoint: string, config?: ApiRequestConfig) => 
    apiClient.delete<T>(endpoint, config),
};