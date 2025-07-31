import axios from "axios";
import type { AuthRegisterDto } from "../../types/dtos/auth/AuthRegister.dto";
import type { AuthResponse } from "../../types/dtos/auth/AuthResponse.dto";
import { BASE_URL } from "../../core/BaseUrl";


export const loginService = async (
    { email, password, lastName, name, phone, rol }: AuthRegisterDto
): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, {
            name,
            lastName,
            phone,
            rol,
            email,
            password,
        });

        return response.data;

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const status = error.response.status;

            switch (status) {
                case 409:
                    throw new Error("Este correo ya está registrado.");
                case 500:
                    throw new Error("Error interno del servidor. Intenta más tarde.");
                default:
                    throw new Error("Ocurrió un error inesperado.");
            }
        }
        throw new Error("Error desconocido al iniciar sesión.");

    }
};

