import React, { createContext, useState, useEffect} from 'react';
import type { ReactNode } from "react"
import type { AuthResponse } from '../types/dtos/auth/AuthResponse.dto';
import type { UserData } from '../types/dtos/users/UserData.dto';


interface AuthGuardContextType {
    isAuthenticated: boolean;
    userData: UserData | null;
    login: (userData: AuthResponse) => void;
    logout: () => void;
    getUserRole: () => string | null;
    hasRole: (role: string) => boolean;
}

interface AuthGuardProviderProps {
    children: ReactNode
}

interface TokenData {
    exp: number,
    [key: string]: any;
}

export const AuthGuardContext = createContext<AuthGuardContextType | undefined>(undefined)

export const AuthGuardProvider: React.FC<AuthGuardProviderProps> = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {

        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const tokenData: TokenData = JSON.parse(atob(token.split('.')[1]));
            return tokenData.exp * 1000 > Date.now();

        } catch {
            return false;
        }
    });

    const [userData, setUserData] = useState<UserData | null>(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');

        if (!token || !storedUserData) {
            setIsAuthenticated(false);
            setUserData(null);
            return;
        }

        try {
            const tokenData: TokenData = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = tokenData.exp * 1000;
            const currentTime = Date.now();

            if (expirationTime > currentTime) {
                setIsAuthenticated(true);
                setUserData(JSON.parse(storedUserData));
            } else {
                console.log('ya vencio');
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                setIsAuthenticated(false);
                setUserData(null);
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            setIsAuthenticated(false);
            setUserData(null);
        }
    }, []);


    const login = (userData: AuthResponse): void => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userData', JSON.stringify(userData.data));
        setIsAuthenticated(true);
        setUserData(userData.data);
    };

    const logout = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserData(null);
    };

    const getUserRole = (): string | null => {
        if (!userData || !userData.rol) {
            return null;
        }
        return userData.rol;
    };

   
  const hasRole = (role: string): boolean => ['Estudiante', 'Propietario'].includes(role);

  const contextValue: AuthGuardContextType = {
    isAuthenticated,
    userData,
    login,
    logout,
    getUserRole,
    hasRole,
  }

  return (
    <AuthGuardContext.Provider value={contextValue}>
      {children}
    </AuthGuardContext.Provider>
  );

}

