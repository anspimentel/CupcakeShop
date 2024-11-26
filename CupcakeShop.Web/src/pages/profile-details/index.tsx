import { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/main-layout";
import ProfileModel from "../../interfaces/models/profile.model";
import api from "../../services/api-client";
import ServiceResult from "../../interfaces/service-result";
import Loading from "../../components/loading";
import { SubmitHandler, useForm } from "react-hook-form";
import { getApiErrorMessage } from "../../services/api-error-handler";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ProfileField {
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

export default function ProfileDetails() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
  } = useForm<ProfileField>();

  const fetchProfile = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ServiceResult<ProfileModel>>("/me")
      .then(({ data }) => {
        const profile = data.data as ProfileModel;
        setValue("name", profile.name);
        setValue("email", profile.email);
        setValue("zipcode", profile.zipcode);
        setValue("street", profile.street);
        setValue("number", profile.number.toString());
        setValue("neighborhood", profile.neighborhood);
        setValue("state", profile.state);
        setValue("city", profile.city);
        setValue("phone", profile.phone);
      })
      .finally(() => setLoading(false));
  };

  const onSubmitChange: SubmitHandler<ProfileField> = async (data) => {
    setLoadingUpdate(true);

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
      password_confirmation: data.password_confirmation ? data.password_confirmation : undefined,
    };

    toast
      .promise(api.put<ServiceResult>("/me", updatedData), {
        loading: "Editando perfil...",
        success: () => {
          navigate(0);
          return "Perfil editado com sucesso!";
        },
        error: (error) => getApiErrorMessage(error),
      })
      .finally(() => setLoadingUpdate(false));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <p className="text-2xl">Detalhes do perfil</p>

        {loading && (
          <div className="mt-6">
            <Loading centered />
          </div>
        )}

        {!loading && (
          <div className="mt-5 p-6 border border-gray-300 rounded-md bg-white mx-auto w-full lg:max-w-[800px]">
            <p className="text-2xl">Perfil do usuário</p>

            <form onSubmit={handleSubmit(onSubmitChange)}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
                <div className="col-span-12">
                  <label className="block mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-12">
                  <label className="block mb-2 font-medium">Nome</label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-6">
                  <label className="block mb-2 font-medium">Rua</label>
                  <input
                    type="text"
                    id="street"
                    {...register("street")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-6">
                  <label className="block mb-2 font-medium">Bairro</label>
                  <input
                    type="text"
                    id="neighborhood"
                    {...register("neighborhood")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <label className="block mb-2 font-medium">CEP</label>
                  <input
                    type="text"
                    id="zipcode"
                    {...register("zipcode")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <label className="block mb-2 font-medium">Número</label>
                  <input
                    type="text"
                    id="number"
                    {...register("number")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <label className="block mb-2 font-medium">Estado</label>
                  <input
                    type="text"
                    id="state"
                    {...register("state")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-6">
                  <label className="block mb-2 font-medium">Cidade</label>
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-6">
                  <label className="block mb-2 font-medium">Telefone</label>
                  <input
                    type="text"
                    id="phone"
                    {...register("phone")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-6">
                  <label className="block mb-2 font-medium">Senha</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
                <div className="col-span-6">
                  <label className="block mb-2 font-medium">
                    Confirme sua senha
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    {...register("password_confirmation")}
                    className={`w-full p-2 rounded-lg border`}
                  />
                </div>
              </div>
              <div className="flex items-center lg:items-end justify-center lg:justify-end mt-5">
                <button
                  type="submit"
                  className="w-full lg:w-auto text-center bg-[#d42e86] text-white transition-all py-2 px-4 rounded"
                >
                  {loadingUpdate ? "Atualizando..." : "Atualizar"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
