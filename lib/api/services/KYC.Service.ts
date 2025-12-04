import { apiClient } from "../ApiClient";
import { BackendRoutes } from "../BackendRoutes";


export interface LivenessCheckIn {
// nothing for now
}

export interface LivenessCheckOut {
// nothing for now
}


export interface VerifyCustomerIn {
    bvn: string;
    bank_code: string;
    account_number: string;
}

export interface VerifyCustomerOut {
}


class KYCService {
    static async verifyCustomer(verifyCustomerIn: VerifyCustomerIn): Promise<VerifyCustomerOut> {
        const res = await apiClient.post<VerifyCustomerOut>(BackendRoutes.doKycCheck, verifyCustomerIn, {
            requiresAuth: true,
        });
        
        return res.data;
    }
    static async livenessCheck(livenessCheckIn: LivenessCheckIn): Promise<LivenessCheckOut> {
        const res = await apiClient.post<LivenessCheckOut>(BackendRoutes.doLivenessCheck, livenessCheckIn, {
            requiresAuth: true,
        });
        
        return res.data;
    }
}


export default KYCService;