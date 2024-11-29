import { Link, useNavigate } from "react-router-dom";
import BreadCrumb, { Page } from "../../../components/bread-crumb";
import AdminLayout from "../../../components/layouts/admin-layout";
import { useEffect, useState } from "react";
import Loading from "../../../components/loading";
import CupcakeModel from "../../../interfaces/models/cupcake-model";
import api from "../../../services/api-client";
import ListServiceResult from "../../../interfaces/list-service-result";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import ServiceResult from "../../../interfaces/service-result";
import { getApiErrorMessage } from "../../../services/api-error-handler";
import { formatCurrency } from "../../../utils/format-currency";
import { getCupcakeStatusTypeLabel } from "../../../utils/convert-status-enum";
import CupcakeStatusType from "../../../enums/cupcake-status-type";

export default function ListCupcakes() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/",
      name: "Início",
    },
    {
      link: "/admin/cupcakes",
      name: "Cupcakes",
    },
  ];

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const [cupcakes, setCupcakes] = useState<CupcakeModel[]>([]);

  const [images, setImages] = useState<{ [key: string]: string }>({});

  const fetchCupcakes = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ListServiceResult<CupcakeModel>>("/cupcakes")
      .then(({ data }) => {
        const cupcakesData = data.data;
        setCupcakes(cupcakesData);

        const imagesTemp: { [key: string]: string } = {};

        cupcakesData.forEach((cupcake) => {
          if (cupcake.image) {
            imagesTemp[cupcake.image] = cupcake.image_url;
          }
        });

        setImages(imagesTemp);
      })
      .finally(() => setLoading(false));
  };

  const deleteCupcake = async (cupcakeId: number) => {
    setLoadingDelete(true);

    toast
      .promise<ServiceResult>(
        api.delete(`/cupcakes/${cupcakeId}`),

        {
          loading: "Excluindo cupcake...",
          success: () => {
            const updatedProducts = cupcakes.filter(
              (cupcake) => cupcake.id !== cupcakeId
            );
            setCupcakes(updatedProducts);
            fetchCupcakes();
            return "Cupcake excluído com sucesso!";
          },
          error: (error) => getApiErrorMessage(error),
        }
      )
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  const navigateToEditPage = (cupcake: CupcakeModel) => {
    navigate(`/admin/cupcakes/edit/${cupcake.id}`);
  };

  useEffect(() => {
    fetchCupcakes();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-3">
        <BreadCrumb history={breadCrumbHistory} />
        <Link
          to="/admin/cupcakes/create"
          className="rounded-full px-8 py-2 bg-gray-800 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
        >
          Adicionar
        </Link>
      </div>

      {loading && <Loading centered />}

      {!loading && (
        <>
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Nome
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Descrição
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Ingredientes
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Preço
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Quantidade
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Status
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Imagem
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cupcakes.map((cupcake) => (
                  <tr className="bg-white" key={cupcake.id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {cupcake.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {cupcake.description.length > 50
                        ? `${cupcake.description.slice(0, 50)}...`
                        : cupcake.description}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {cupcake.ingredients.length > 50
                        ? `${cupcake.ingredients.slice(0, 50)}...`
                        : cupcake.ingredients}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {formatCurrency(cupcake.amount)}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {cupcake.quantity}
                    </td>
                    <td
                      className={`p-3 text-sm text-gray-700 whitespace-nowrap uppercase font-semibold ${
                        cupcake.status === CupcakeStatusType.IN_STOCK
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {getCupcakeStatusTypeLabel(cupcake.status)}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {images[cupcake.image] && (
                        <img
                          src={images[cupcake.image]}
                          className="max-w-[50px] max-h-[50px] object-cover"
                          alt="foto"
                        />
                      )}
                    </td>
                    <td className="px-3 py-6 whitespace-nowrap flex items-center text-center">
                      <AiOutlineEdit
                        className="text-blue-600 cursor-pointer"
                        onClick={() => navigateToEditPage(cupcake)}
                        size={20}
                      />
                      <button>
                        <AiOutlineDelete
                          className="text-red-600 cursor-pointer ml-2"
                          onClick={() => deleteCupcake(cupcake.id)}
                          size={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {cupcakes.map((cupcake) => (
              <div
                className="bg-white space-y-3 p-4 rounded-lg shadow"
                key={cupcake.id}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <span>Nome:</span>
                  <span className="text-gray-500">{cupcake.name}</span>
                </div>
                <div className="text-sm">
                  Descrição:{" "}
                  <span className="text-gray-700">{cupcake.description}</span>
                </div>
                <div className="text-sm">
                  Ingredientes:{" "}
                  <span className="text-gray-700">{cupcake.ingredients}</span>
                </div>
                <div className="text-sm">
                  Preço: <span className="text-gray-700">{cupcake.amount}</span>
                </div>
                <div className="text-sm">
                  Quantidade:{" "}
                  <span className="text-gray-700">{cupcake.quantity}</span>
                </div>
                {images[cupcake.image] && (
                  <img
                    src={images[cupcake.image]}
                    className="object-cover"
                    alt="foto"
                  />
                )}
                <button
                  onClick={() => navigateToEditPage(cupcake)}
                  className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteCupcake(cupcake.id)}
                  className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
                  disabled={loadingDelete}
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && cupcakes.length === 0 && (
        <div className="text-center text-gray-500 mt-5">
          Nenhum cupcake encontrado
        </div>
      )}
    </AdminLayout>
  );
}
