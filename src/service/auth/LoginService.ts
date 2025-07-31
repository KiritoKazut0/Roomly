import axios from "axios";
import type { AuthAccessDto } from "../../types/dtos/auth/AuthAccess.dto";
import type { AuthResponse } from "../../types/dtos/auth/AuthResponse.dto";
import { BASE_URL } from "../../core/BaseUrl";


export const loginService = async ({ email, password }: AuthAccessDto): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, {
            email,
            password,
        });

        return response.data;
        
    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;

            switch (status) {
                case 404:
                    throw new Error("Usuario no encontrado.");
                case 401:
                    throw new Error("Credenciales inválidas.");
                case 500:
                    throw new Error("Error interno del servidor. Intenta más tarde.");
                default:
                    throw new Error("Ocurrió un error inesperado.");
            }
        }
        throw new Error("Error desconocido al iniciar sesión.");

    }
};

