import { Link, useNavigate } from "react-router-dom";
import CleanLayout from "../../components/layouts/clean-layout";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../services/api-client";
import toast from "react-hot-toast";
import apiErrorHandler from "../../services/api-error-handler";

interface UserField {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserField>();

  const handleLogin: SubmitHandler<UserField> = async (data) => {
    setLoading(true);

    api
      .postForm("/auth/login", data)
      .then(({ data: { token, role } }) => {
        sessionStorage.setItem("auth", JSON.stringify({ token, role }));
        navigate("/");
        toast.success("Bem-vindo!");
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  };

  return (
    <CleanLayout>
      <img
        src="/images/cupcake1.png"
        alt="logo"
        className="w-24 mx-auto lg:hidden mt-10"
      />

      <div className="flex flex-col items-center justify-center mt-5">
        <h2 className="text-3xl text-center font-semibold leading-tight text-black sm:text-4xl">
          Cupcake Shop
        </h2>

        <p className="mt-3 text-xl font-light">Acesse sua conta</p>
      </div>

      <form className="mt-5" onSubmit={handleSubmit(handleLogin)}>
        <div className="space-y-5">
          <div>
            <label className="text-base font-medium text-gray-900">
              E-mail
            </label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                type="email"
                id="email"
                placeholder="Informe seu e-mail"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                {...register("email", { required: "O e-mail é obrigatório" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-900">
                Senha
              </label>
            </div>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                type="password"
                id="password"
                placeholder="Informe sua senha"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:black focus:bg-whit"
                {...register("password", {
                  required: "A senha é obrigatória",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-2">
            <p className="text-center">
              Ainda não tem uma conta? <Link to="/register" className="underline">Cadastre-se!</Link>
            </p>
          </div>

          <button
            type="submit"
            className="bg-[#d42e86] inline-flex items-center justify-center w-full h-16 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md hover:bg-opacity-95"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
    </CleanLayout>
  );
}
