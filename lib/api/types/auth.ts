// Types
export interface UserType {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface LoginCredentialsType {
  email: string;
  password: string;
}

export interface RegisterDataType {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
