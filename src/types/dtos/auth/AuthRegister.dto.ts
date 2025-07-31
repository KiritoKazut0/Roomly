
export interface AuthRegisterDto{
  name: string;          
  lastName: string;     
  phone: string;        
  rol: 'Estudiante' | 'Propietario';
  email: string;        
  password: string;      
}