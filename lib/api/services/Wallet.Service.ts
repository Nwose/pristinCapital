import { apiClient } from "../ApiClient";
import { BackendRoutes } from "../BackendRoutes";
import { ApiResponse } from "../ApiClient"; 

export interface Wallet {
  wallet_name: string;
  balance: string;
  status: "active" | "inactive" | string;
  wallet_type: "main" | "savings" | "locked" | string;
  created_at: string;
  updated_at: string;
}

export type WalletList = Wallet[];


class WalletService {
  static async getWallets(): Promise<WalletList> {
    const res = await apiClient.get<WalletList>(BackendRoutes.getUserWallets, {
      requiresAuth: true,
    });

    return res.data;
  }

  static async getMainWallet(): Promise<Wallet | undefined> {
    const wallets = await this.getWallets();
    return wallets.find(w => w.wallet_type === "main");
  }
}

export default WalletService;
