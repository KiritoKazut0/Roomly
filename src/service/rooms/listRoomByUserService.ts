import axios from "axios"
import { BASE_URL } from "../../core/BaseUrl";
import type { RoomDto } from "../../types/dtos/rooms/Room.dto";

export const listRoomsByUserService = async (id_user: string): Promise<RoomDto[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/rooms/${id_user}`);
        return response.data

    } catch (error) {
        throw new Error("Ocurrio un error en el servidor")

    }
}
