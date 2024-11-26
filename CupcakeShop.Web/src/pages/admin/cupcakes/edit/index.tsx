import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb, { Page } from "../../../../components/bread-crumb";
import AdminLayout from "../../../../components/layouts/admin-layout";
import { useEffect, useState } from "react";
import api from "../../../../services/api-client";
import ServiceResult from "../../../../interfaces/service-result";
import CupcakeModel from "../../../../interfaces/models/cupcake-model";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "../../../../services/api-error-handler";

interface CupcakeField {
  name: string;
  description: string;
  ingredients: string;
  amount: string;
  quantity: string;
}

export default function EditCupcake() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/admin",
      name: "Início",
    },
    {
      link: "/admin/cupcakes",
      name: "Cupcakes",
    },
    {
      link: "/admin/cupcakes/edit",
      name: "Cupcakes - Editar",
    },
  ];

  const { cupcakeId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CupcakeField>();

  const fetchCupcake = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ServiceResult<CupcakeModel>>(`/cupcakes/${cupcakeId}`)
      .then(({ data }) => {
        const cupcake = data.data as CupcakeModel;
        setValue("name", cupcake.name);
        setValue("description", cupcake.description);
        setValue("ingredients", cupcake.ingredients);
        setValue("amount", cupcake.amount.toString());
        setValue("quantity", cupcake.quantity);
      })
      .catch((error) => {
        toast.error("Erro ao buscar dados do cupcake: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmitChange: SubmitHandler<CupcakeField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("ingredients", data.ingredients);
    formData.append("amount", data.amount);
    formData.append("quantity", data.quantity);

    toast
      .promise(
        api.post<ServiceResult>(`/cupcakes/${cupcakeId}`, formData),
        {
          loading: "Editando cupcake...",
          success: () => {
            navigate("/admin/cupcakes");
            return "Cupcake editado com sucesso!";
          },
          error: (error) => getApiErrorMessage(error),
        }
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCupcake();
  }, [cupcakeId]);

  return (
    <AdminLayout>
      <div className="mb-3">
        <BreadCrumb history={breadCrumbHistory} />
      </div>

      <form className="mt-3" onSubmit={handleSubmit(onSubmitChange)}>
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
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-6">
            <label className="block mb-2 font-medium">Descrição*</label>
            <input
              type="text"
              id="description"
              placeholder="Informe a descrição"
              className={`w-full p-2 rounded-lg border ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              {...register("description", { required: "A descrição é obrigatória" })}
              disabled={loading}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-6">
            <label className="block mb-2 font-medium">Ingredientes*</label>
            <input
              type="text"
              id="ingredients"
              placeholder="Informe os ingredientes"
              className={`w-full p-2 rounded-lg border ${
                errors.ingredients ? "border-red-500" : "border-gray-300"
              }`}
              {...register("ingredients", { required: "Os ingredientes são obrigatórios" })}
              disabled={loading}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm">{errors.ingredients.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-6">
            <label className="block mb-2 font-medium">Preço*</label>
            <input
              type="text"
              id="amount"
              placeholder="Informe o preço"
              className={`w-full p-2 rounded-lg border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              {...register("amount", { required: "O preço é obrigatório" })}
              disabled={loading}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-6">
            <label className="block mb-2 font-medium">Quantidade*</label>
            <input
              type="text"
              id="quantity"
              placeholder="Informe a quantidade"
              className={`w-full p-2 rounded-lg border ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              }`}
              {...register("quantity", { required: "A qauntidade é obrigatória" })}
              disabled={loading}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all"
            disabled={loading}
          >
            Editar
          </button>
        </div>
      </form>
    </AdminLayout>
  )
}