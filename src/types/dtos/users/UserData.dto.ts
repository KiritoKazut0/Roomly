
export interface UserData {
        id: string;
        name: string;
        lastName: string;
        phone: string;
        rol: 'Propietario' | 'Estudiante';
        email: string;
        image: string | null;
        tipo_suscription: 'Premium' | 'Gratuita';
    }