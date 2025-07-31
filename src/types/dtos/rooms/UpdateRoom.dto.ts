import type { CreateRoomDto } from "./CreateRoom.dto";

export type UpdateRoomDto = Partial<Omit<CreateRoomDto, 'id_user'>>;