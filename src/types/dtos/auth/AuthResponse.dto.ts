import type { UserData } from "../users/UserData.dto";

export interface AuthResponse {
    data: UserData
    token: string;
}
