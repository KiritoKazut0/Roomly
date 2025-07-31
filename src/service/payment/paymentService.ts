import axios from "axios";
import { BASE_URL } from "../../core/BaseUrl";


export const PaymentService = async (idUser: string): Promise<{url: string}> => {
    try {
        const response = await axios.post(`${BASE_URL}/payment/create-checkout-session/${idUser}`);
        return response.data
    } catch (error) {
        throw new Error("Ocurrió un error inesperado al acceder a pagos");
    }

}