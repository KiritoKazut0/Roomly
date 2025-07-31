import { useContext } from "react";
import { AuthGuardContext } from "../context/AuthGuardContex";

export function useAuthGuard() {
    const context = useContext(AuthGuardContext)
    if(!context){
        throw new Error("useAuthGuard must be used within an AuthGuardProvider");
    }
    return context
}