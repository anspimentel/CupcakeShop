import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthValidation, useAuthCheck } from "../hooks/use-auth-check";

interface Props {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function PrivateRoute({ children, adminOnly = false }: Props) {
  const navigate = useNavigate();
  const authValidation: AuthValidation = useAuthCheck();

  useEffect(() => {
    if (!authValidation.hasToken) {
      navigate("/login");
    } 
    else if (authValidation.expired) {
      navigate("/login");
      toast.error("Sua sessão expirou. Faça login novamente.");
    } 
    else if (adminOnly && authValidation.role !== "admin") {
      navigate("/");
      toast.error("Acesso restrito para administradores.");
    }
  }, [authValidation, navigate, adminOnly]);

  return (
    <>
      {!authValidation.hasToken && <Navigate to="/login" replace />}
      {authValidation.hasToken && (!adminOnly || authValidation.role === "admin") && children}
    </>
  );
}
