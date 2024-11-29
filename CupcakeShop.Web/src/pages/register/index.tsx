import { useNavigate } from "react-router-dom";
import CleanLayout from "../../components/layouts/clean-layout";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../services/api-client";
import toast from "react-hot-toast";
import apiErrorHandler from "../../services/api-error-handler";
import Inputmask from "react-input-mask";

interface RegisterField {
  name: string;
  email: string;
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  city: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterField>();

  const onSubmit: SubmitHandler<RegisterField> = async (data) => {
    setLoading(true);

    api
      .postForm("/auth/register", data)
      .then(() => {
        navigate("/login");
        toast.success("Usuário cadastrado com sucesso!");
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  };

  const checkCEP = (e: ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("street", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("state", data.uf);
      })
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

        <p className="mt-3 text-xl font-light">Registre sua conta</p>
      </div>

      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="col-span-12">
            <label className="text-base font-medium text-gray-900">Nome</label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                type="name"
                id="name"
                placeholder="Informe seu nome"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                {...register("name", { required: "O nome é obrigatório" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="col-span-12">
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

          <div className="col-span-12 lg:col-span-6">
            <label className="text-base font-medium text-gray-900">CEP</label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <Inputmask
                mask="99999-999"
                placeholder="_____-___"
                type="text"
                id="zipcode"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                {...register("zipcode", { required: "O cep é obrigatório" })}
                onBlur={checkCEP}
              />
              {errors.zipcode && (
                <p className="text-red-500 text-sm">{errors.zipcode.message}</p>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <label className="text-base font-medium text-gray-900">Rua</label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                placeholder="Informe sua rua"
                type="text"
                id="street"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                {...register("street", { required: "A rua é obrigatória" })}
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street.message}</p>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <label className="text-base font-medium text-gray-900">
              Bairro
            </label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                placeholder="Informe seu bairro"
                type="text"
                id="neighborhood"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                {...register("neighborhood", {
                  required: "A rua é obrigatória",
                })}
              />
              {errors.neighborhood && (
                <p className="text-red-500 text-sm">
                  {errors.neighborhood.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <label className="text-base font-medium text-gray-900">
              Número
            </label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                placeholder="Informe seu número"
                type="number"
                id="number"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                {...register("number", { required: "A rua é obrigatória" })}
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number.message}</p>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <label className="text-base font-medium text-gray-900">
              Estado
            </label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <select
                id="state"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                {...register("state", { required: "O estado é obrigatório" })}
              >
                <option value="" disabled>
                  UF
                </option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <label className="text-base font-medium text-gray-900">
              Cidade
            </label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                placeholder="Informe sua cidade"
                type="text"
                id="city"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                {...register("city", { required: "A cidade é obrigatória" })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="col-span-12">
            <label className="text-base font-medium text-gray-900">
              Telefone
            </label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <Inputmask
                mask="(99) 99999-9999"
                placeholder="(__) _____-____"
                type="text"
                id="phone"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
                {...register("phone", { required: "A cidade é obrigatória" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="col-span-12">
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

          <div className="col-span-12">
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-900">
                Confirme sua senha
              </label>
            </div>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                type="password"
                id="password_confirmation"
                placeholder="Informe novamente sua senha"
                className="block w-full py-4 pl-5 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:black focus:bg-whit"
                {...register("password_confirmation", {
                  required: "A confirmação de senha é obrigatória",
                })}
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-12">
            <button
              type="submit"
              className="bg-[#d42e86] inline-flex items-center justify-center w-full h-16 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md hover:bg-opacity-95"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </div>
        </div>
      </form>
    </CleanLayout>
  );
}
