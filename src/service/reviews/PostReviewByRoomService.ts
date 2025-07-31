
import axios from "axios";
import { BASE_URL } from "../../core/BaseUrl";
import type { ReviewDto } from "../../types/dtos/reviews/Reviews.dto";

export default interface PostReviews {
    id_user: string,
    id_room: string
    comment: string
    calif: number
}

export const postReviewsByHomeService = async (data: PostReviews):Promise<ReviewDto[]> => {

    try {
        const response = await axios.post(`${BASE_URL}/rooms}`,data)
        return response.data
        
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
    
}