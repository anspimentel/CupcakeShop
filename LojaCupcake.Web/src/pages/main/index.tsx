import { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/main-layout";
import CupcakeModel from "../../interfaces/models/cupcake-model";
import api from "../../services/api-client";
import ListServiceResult from "../../interfaces/list-service-result";
import Loading from "../../components/loading";
import apiErrorHandler from "../../services/api-error-handler";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/format-currency";

export default function Main() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const [cupcakes, setCupcakes] = useState<CupcakeModel[]>([]);
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const fetchCupcakes = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ListServiceResult<CupcakeModel>>("/cupcakes")
      .then(({ data }) => {
        const cupcakesData = data.data;
        setCupcakes(cupcakesData);

        const imagesTemp: { [key: string]: string } = {};
        const initialQuantities: { [key: number]: number } = {};

        cupcakesData.forEach((cupcake) => {
          if (cupcake.image) {
            imagesTemp[cupcake.image] = cupcake.image_url;
          }
          initialQuantities[cupcake.id] = 1;
        });

        setImages(imagesTemp);
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
                  <div className="py-7 px-8 bg-white rounded-lg">
                    <div className="h-full lg:h-44">
                      {images[cupcake.image] && (
                        <img
                          className="w-full h-full object-cover object-center rounded-lg"
                          src={images[cupcake.image]}
                          alt={cupcake.name}
                        />
                      )}
                    </div>

                    <div className="mt-3">
                      <p className="text-xl truncate">{cupcake.name}</p>
                      <p className="text-2xl font-bold mt-2">
                        {formatCurrency(cupcake.amount)}{" "}
                        <span className="font-light text-lg">/uni</span>
                      </p>

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

                      <button
                        onClick={() => addToCart(cupcake)}
                        className="text-medium bg-transparent text-black border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white w-full p-2 mt-5 rounded transition-all"
                      >
                        Adicionar ao carrinho
                      </button>

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
