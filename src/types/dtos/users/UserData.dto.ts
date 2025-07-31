
export interface UserData {
        id: string;
        name: string;
        lastName: string;
        phone: string;
        rol: 'Propietario' | 'Usuario';
        email: string;
        image: string | null;
        tipo_suscription: 'Premium' | 'Gratuita';
    }