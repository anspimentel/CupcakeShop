import { useNavigate } from "react-router-dom";
import BreadCrumb, { Page } from "../../../../components/bread-crumb";
import AdminLayout from "../../../../components/layouts/admin-layout";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ServiceResult from "../../../../interfaces/service-result";
import api from "../../../../services/api-client";
import { getApiErrorMessage } from "../../../../services/api-error-handler";

interface CupcakeField {
  name: string;
  description: string;
  ingredients: string;
  amount: string;
  quantity: string;
  image: FileList;
}

export default function Cupcakes() {
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
      link: "/admin/cupcakes/create",
      name: "Cupcakes - Criar",
    },
  ];

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CupcakeField>();

  const onSubmit: SubmitHandler<CupcakeField> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("ingredients", data.ingredients || "");
    formData.append("amount", data.amount);
    formData.append("quantity", data.quantity);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    toast
      .promise(
        api.post<ServiceResult>("/cupcakes", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Cadastrando produto...",
          success: () => {
            navigate("/admin/cupcakes");
            return "Produto criado com sucesso!";
          },
          error: (error) => getApiErrorMessage(error),
        }
      )
      .finally(() => {
        setLoading(false);
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
            <label className="block mb-2 font-medium">Descrição*</label>
            <input
              type="text"
              id="description"
              placeholder="Informe a descrição"
              className={`w-full p-2 rounded-lg border ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              {...register("description", { required: "A descrição é obrigatória" })}
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
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm">{errors.ingredients.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Preço*</label>
            <input
              type="text"
              id="amount"
              placeholder="Informe o preço"
              className={`w-full p-2 rounded-lg border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              {...register("amount", { required: "O preço é obrigatório" })}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Quantidade*</label>
            <input
              type="text"
              id="quantity"
              placeholder="Informe a quantidade"
              className={`w-full p-2 rounded-lg border ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              }`}
              {...register("quantity", { required: "A qauntidade é obrigatória" })}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>
          <div className="col-span-12 xl:col-span-4">
            <label className="block mb-2 font-medium">Foto*</label>
            <input
              type="file"
              id="image"
              {...register("image")}
              className={`w-full p-2 rounded-lg border ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />

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
