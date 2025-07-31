import axios from "axios";
import { BASE_URL } from "../../core/BaseUrl";
import type { CreateRoomDto } from "../../types/dtos/rooms/CreateRoom.dto";

export const CreateRoom = async (
    { id_user,
        city,
        description,
        images,
        location_number,
        location_postal_code,
        location_street,
        price_monthly,
        state,
        zone,
        other_services,
        services,
        status = "En revision"
    }: CreateRoomDto

): Promise<CreateRoomDto> => {

    try {
        const response = await axios.post(`${BASE_URL}/rooms`, {
            id_user,
            city,
            description,
            images,
            location_number,
            location_postal_code,
            location_street,
            price_monthly,
            state,
            zone,
            other_services,
            services,
            status
        });

        return response.data
    } catch (error) {
        throw new Error("Ocurrió un error inesperado al crear el cuarto.");
    }

}