import axios from "axios";
import { BASE_URL } from "../../core/BaseUrl";

export const deleteRoomService = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${BASE_URL}/rooms/${id}`);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;

      switch (status) {
        case 404:
          throw new Error("El cuarto no fue encontrado.");
        case 500:
          throw new Error("Error del servidor. Intenta más tarde.");
        default:
          throw new Error("Ocurrió un error inesperado al eliminar el cuarto.");
      }
    }

    throw new Error("Error de red o inesperado al eliminar el cuarto.");
  }
};
