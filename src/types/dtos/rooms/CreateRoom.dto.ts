
export type RoomService = 
  | 'Baño'
  | 'Wifi'
  | 'Amueblado'
  | 'Cocina'
  | 'Clima';


export interface CreateRoomDto {
  id_user: string;
  zone: string;
  images: string[];
  description: string;
  status: 'Ocupado' | 'Disponible' | 'En revision';
  price_monthly: number;
  services?: RoomService[];
  other_services?: string[];
  location_street: string;
  location_number: number;
  location_postal_code: string;
  city: string;
  state: string;
}
