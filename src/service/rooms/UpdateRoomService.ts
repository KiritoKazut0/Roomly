
import axios from "axios";
import { BASE_URL } from "../../core/BaseUrl";
import type { UpdateRoomDto } from "../../types/dtos/rooms/UpdateRoom.dto";
import type { RoomDto } from "../../types/dtos/rooms/Room.dto";

export const updateRoomService = async (
  id_room: string,
  updateData: UpdateRoomDto
): Promise<RoomDto> => {
    
  try {

    const response = await axios.patch(`${BASE_URL}/rooms/${id_room}`, updateData);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          throw new Error("Datos incompletos o inválidos para actualizar.");
        case 404:
          throw new Error("El cuarto no fue encontrado.");
        case 500:
          throw new Error("Error del servidor al actualizar el cuarto.");
        default:
          throw new Error("Ocurrió un error inesperado.");
      }
    }

    throw new Error("Error de red o del cliente.");
  }
};
