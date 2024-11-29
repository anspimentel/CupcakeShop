import { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/main-layout";
import CupcakeModel from "../../interfaces/models/cupcake-model";
import api from "../../services/api-client";
import ListServiceResult from "../../interfaces/list-service-result";
import Loading from "../../components/loading";
import apiErrorHandler from "../../services/api-error-handler";
import { Link, useNavigate } from "react-router-dom";
import CupcakeStatusType from "../../enums/cupcake-status-type";
import { formatCurrency } from "../../utils/format-currency";
import { getCupcakeStatusTypeLabel } from "../../utils/convert-status-enum";

export default function Main() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const [cupcakes, setCupcakes] = useState<CupcakeModel[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const fetchCupcakes = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ListServiceResult<CupcakeModel>>("/cupcakes")
      .then(({ data }) => {
        const cupcakesData = data.data;
        setCupcakes(cupcakesData);

        const initialQuantities: { [key: number]: number } = {};

        cupcakesData.forEach((cupcake) => {
          initialQuantities[cupcake.id] = 1;
        });

        setQuantities(initialQuantities);
      })
      .finally(() => setLoading(false));
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

  const addToCart = (cupcake: CupcakeModel) => {
    const quantity = quantities[cupcake.id] || 1;
    api
      .post(`/cupcakes/${cupcake.id}/cart`, { ...cupcake, quantity })
      .then(() => {
        navigate("/cart");
      })
      .catch(apiErrorHandler);
  };

  useEffect(() => {
    fetchCupcakes();
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <p className="text-2xl">Vitrine da loja</p>

        {loading && (
          <div className="mt-6">
            <Loading centered />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 mt-6 gap-5">
          {!loading && cupcakes.length > 0 && (
            <>
              {cupcakes.map((cupcake) => (
                <div className="col-span-3" key={cupcake.id}>
                  <div
                    className={`py-7 px-8 bg-white rounded-lg flex flex-col ${
                      cupcake.status === CupcakeStatusType.OUT_OF_STOCK
                        ? "opacity-40"
                        : ""
                    }`}
                  >
                    <img
                      className="w-full h-full object-cover object-center rounded-lg"
                      src={`http://127.0.0.1:8000/storage/${cupcake.image}`}
                      alt={cupcake.name}
                    />

                    <div className="mt-3">
                      <p className="text-xl truncate">{cupcake.name}</p>
                      {cupcake.status === CupcakeStatusType.IN_STOCK && (
                        <p className="text-2xl font-bold mt-2">
                          {formatCurrency(cupcake.amount)}{" "}
                          <span className="font-light text-lg">/uni</span>
                        </p>
                      )}

                      {cupcake.status === CupcakeStatusType.IN_STOCK && (
                        <div className="flex items-center justify-between mt-3 space-x-2">
                          <button
                            onClick={() => updateQuantity(cupcake.id, -1)}
                            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white transition-all"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {quantities[cupcake.id] || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(cupcake.id, 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white transition-all"
                          >
                            +
                          </button>
                        </div>
                      )}

                      {cupcake.status === CupcakeStatusType.IN_STOCK ? (
                        <button
                          onClick={() => addToCart(cupcake)}
                          className="text-medium bg-transparent text-black border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white w-full p-2 mt-5 rounded transition-all"
                        >
                          Adicionar ao carrinho
                        </button>
                      ) : (
                        <p className="text-red-600 uppercase font-semibold text-center mt-5">
                          {getCupcakeStatusTypeLabel(cupcake.status)}
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-center">
                        <Link
                          to={`/cupcake/${cupcake.id}`}
                          className="font-light underline"
                        >
                          Ver produto
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {!loading && cupcakes.length === 0 && (
          <p className="mt-6 flex items-center justify-center">Vitrine vazia</p>
        )}
      </div>
    </MainLayout>
  );
}
