import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/layouts/main-layout";
import { useEffect, useState } from "react";
import CupcakeModel from "../../interfaces/models/cupcake-model";
import api from "../../services/api-client";
import ServiceResult from "../../interfaces/service-result";
import apiErrorHandler from "../../services/api-error-handler";
import Loading from "../../components/loading";
import { formatCurrency } from "../../utils/format-currency";
import CupcakeStatusType from "../../enums/cupcake-status-type";

export default function CupcakeDetails() {
  const { cupcakeId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [cupcake, setCupcake] = useState<CupcakeModel>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const fetchCupcake = async () => {
    setLoading(true);

    api
      .get<ServiceResult<CupcakeModel>>(`/cupcakes/${cupcakeId}`)
      .then(({ data }) => {
        setCupcake(data.data as CupcakeModel);
        setImageUrl(data.data?.image_url || null);
      })
      .finally(() => setLoading(false));
  };

  const addToCart = (cupcake: CupcakeModel) => {
    const quantity = quantities[cupcake.id] || 1;
    api
      .post(`/cupcakes/${cupcake.id}/cart`, { ...cupcake, quantity })
      .then(() => {
        navigate("/cart");
      })
      .catch(apiErrorHandler);
  };

  const updateQuantity = (cupcakeId: number, delta: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[cupcakeId] || 1) + delta;
      return {
        ...prevQuantities,
        [cupcakeId]: newQuantity > 0 ? newQuantity : 1,
      };
    });
  };

  useEffect(() => {
    fetchCupcake();
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <p className="text-2xl">Detalhes do produto</p>

        {loading && (
          <div className="mt-6">
            <Loading centered />
          </div>
        )}

        {!loading && (
          <div className="bg-white rounded">
            <div
              className="px-8 lg:px-12 py-12 mt-10 container mx-auto"
              data-aos="zoom-in"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-6 flex items-center justify-center h-96">
                  <img
                    src={imageUrl || ""}
                    alt={cupcake?.name}
                    className="w-full h-full object-cover object-center rounded-md"
                  />
                </div>

                <div className="col-span-6">
                  <p className="text-4xl font-bold uppercase mb-1 break-words">
                    {cupcake?.name}
                  </p>
                  <p className="mt-5 font-bold text-lg">
                    Descrição:{" "}
                    <span className="font-normal">{cupcake?.description}</span>
                  </p>
                  <p className="mt-5 font-bold text-lg">
                    Ingredientes:{" "}
                    <span className="font-normal">{cupcake?.ingredients}</span>
                  </p>
                  <p className="mt-8 font-bold text-2xl">
                    Preço:{" "}
                    <span className="font-normal">
                      {formatCurrency(cupcake?.amount || 0)}
                    </span>
                  </p>

                  <div className="flex items-center justify-start mt-3 space-x-2">
                    <button
                      onClick={() => updateQuantity(cupcake?.id || 0, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white transition-all"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">
                      {quantities[cupcake?.id || 0] || 1}
                    </span>
                    <button
                      onClick={() => updateQuantity(cupcake?.id || 0, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white transition-all"
                    >
                      +
                    </button>
                  </div>
                  {cupcake?.status === CupcakeStatusType.IN_STOCK ? (
                    <button
                      onClick={() => addToCart(cupcake as CupcakeModel)}
                      className="text-medium bg-transparent text-black border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white w-full p-2 mt-5 rounded transition-all"
                    >
                      Adicionar ao carrinho
                    </button>
                  ) : (
                    <div
                      className="text-medium text-center bg-zinc-700 text-zinc-200 uppercase font-semibold w-full p-2 mt-5 rounded transition-all"
                    >
                      Fora de estoque
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !cupcake && (
          <div className="flex items-center justify-center text-gray-500 text-xl mt-28">
            Informações do cupcake não encontradas.
          </div>
        )}
      </div>
    </MainLayout>
  );
}
