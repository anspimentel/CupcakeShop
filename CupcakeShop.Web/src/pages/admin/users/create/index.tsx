import { useNavigate } from "react-router-dom";
import BreadCrumb, { Page } from "../../../../components/bread-crumb";
import AdminLayout from "../../../../components/layouts/admin-layout";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ServiceResult from "../../../../interfaces/service-result";
import api from "../../../../services/api-client";
import { getApiErrorMessage } from "../../../../services/api-error-handler";
import Inputmask from "react-input-mask";

interface UserField {
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

export default function CreateUsers() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/users",
      name: "Usuários",
    },
    {
      link: "/admin/users/create",
      name: "Usuários - Criar",
    },
  ];

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserField>();

  const onSubmit: SubmitHandler<UserField> = async (data) => {
    setLoading(true);

    const updatedData = {
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      street: data.street,
      number: data.number,
      neighborhood: data.neighborhood,
      state: data.state,
      city: data.city,
      phone: data.phone,
      password: data.password ? data.password : undefined,
      password_confirmation: data.password_confirmation
        ? data.password_confirmation
        : undefined,
    };

    toast
      .promise(api.post<ServiceResult>("/auth/register", updatedData), {
        loading: "Cadastrando usuário...",
        success: () => {
          navigate("/admin/users");
          return "Usuário criado com sucesso!";
        },
        error: (error) => getApiErrorMessage(error),
      })
      .finally(() => {
        setLoading(false);
      });
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
      });
  };

  return (
    <AdminLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <p className="font-medium text-slate-600 mt-8">
        Campos com (*) são obrigatórios
      </p>
      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mb-6">
          <div className="col-span-12">
            <label className="block mb-2 font-medium">Nome*</label>
            <input
              type="text"
              id="name"
              placeholder="Informe o nome do produto"
              className={`w-full p-2 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name", { required: "O nome é obrigatório" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-6">
            <label className="block mb-2 font-medium">Email*</label>
            <input
              type="text"
              id="email"
              placeholder="Informe o e-mail"
              className={`w-full p-2 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", { required: "O e-mail é obrigatório" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-6">
            <label className="block mb-2 font-medium">CEP</label>
            <Inputmask
              mask="99999-999"
              type="text"
              id="zipcode"
              placeholder="_____-___"
              className={`w-full p-2 rounded-lg border ${
                errors.zipcode ? "border-red-500" : "border-gray-300"
              }`}
              {...register("zipcode")}
              onBlur={checkCEP}
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm">{errors.zipcode.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-6">
            <label className="block mb-2 font-medium">Rua</label>
            <input
              type="text"
              id="street"
              placeholder="Informe a rua"
              className={`w-full p-2 rounded-lg border ${
                errors.street ? "border-red-500" : "border-gray-300"
              }`}
              {...register("street")}
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Bairro*</label>
            <input
              type="text"
              id="neighborhood"
              placeholder="Informe o bairro"
              className={`w-full p-2 rounded-lg border ${
                errors.neighborhood ? "border-red-500" : "border-gray-300"
              }`}
              {...register("neighborhood")}
            />
            {errors.neighborhood && (
              <p className="text-red-500 text-sm">
                {errors.neighborhood.message}
              </p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-2">
            <label className="block mb-2 font-medium">Número</label>
            <input
              type="number"
              id="number"
              placeholder="Nº"
              className={`w-full p-2 rounded-lg border ${
                errors.number ? "border-red-500" : "border-gray-300"
              }`}
              {...register("number")}
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-2">
            <label className="block mb-2 font-medium">Estado</label>
            <select
              id="state"
              className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-black focus:bg-white"
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
          <div className="col-span-12 xl:col-span-5">
            <label className="block mb-2 font-medium">Cidade</label>
            <input
              type="text"
              id="city"
              placeholder="Informe a cidade"
              className={`w-full p-2 rounded-lg border ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              {...register("city")}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-5">
            <label className="block mb-2 font-medium">Telefone</label>
            <Inputmask
              mask="(99) 99999-9999"
              type="text"
              id="phone"
              placeholder="(__) _____-____"
              className={`w-full p-2 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-900">
                Senha*
              </label>
            </div>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                type="password"
                id="password"
                placeholder="Informe sua senha"
                className={`w-full p-2 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
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

          <div className="col-span-12 lg:col-span-6">
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-900">
                Confirme sua senha*
              </label>
            </div>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
              <input
                type="password"
                id="password_confirmation"
                placeholder="Informe novamente sua senha"
                className={`w-full p-2 rounded-lg border ${
                  errors.password_confirmation ? "border-red-500" : "border-gray-300"
                }`}
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
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
            disabled={loading}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
