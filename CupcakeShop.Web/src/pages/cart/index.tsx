import { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/main-layout";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CartModel from "../../interfaces/models/cart-model";
import api from "../../services/api-client";
import ListServiceResult from "../../interfaces/list-service-result";
import Loading from "../../components/loading";
import { formatCurrency } from "../../utils/format-currency";

export default function Cart() {
  const [loading, setLoading] = useState<boolean>(false);

  const [cupcakesCart, setCupcakesCart] = useState<CartModel[]>([]);

  const fetchCupcakesCart = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ListServiceResult<CartModel>>("/cart")
      .then(({ data }) => {
        setCupcakesCart(data.data);
      })
      .finally(() => setLoading(false));
  };

  const increaseQuantity = async (cupcakeId: number): Promise<void> => {
    api.postForm(`/cupcakes/${cupcakeId}/cart/increase`, {}).then(() => {
      setCupcakesCart((prevCart) =>
        prevCart.map((item) =>
          item.cupcake.id === cupcakeId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    });
  };

  const decreaseQuantity = async (cupcakeId: number): Promise<void> => {
    api.postForm(`/cupcakes/${cupcakeId}/cart/decrease`, {}).then(() => {
      setCupcakesCart((prevCart) =>
        prevCart.map((item) =>
          item.cupcake.id === cupcakeId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    });
  };

  const deleteCupcakeCart = async (cupcakeId: number): Promise<void> => {
    api.delete(`/cupcakes/${cupcakeId}/cart`, {}).then(() => {
      fetchCupcakesCart();
    });
  };

  useEffect(() => {
    fetchCupcakesCart();
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <p className="text-2xl">Carrinho de compras</p>

        {loading && (
          <div className="mt-6">
            <Loading centered />
          </div>
        )}

        {!loading && cupcakesCart.length > 0 && (
          <>
            <div className="hidden lg:grid grid-cols-12 mt-6 text-sm font-semibold border-b border-gray-400 pb-2">
              <div className="col-span-6">Item</div>
              <div className="col-span-2 text-center">Quantidade</div>
              <div className="col-span-2 text-center">Preço</div>
              <div className="col-span-2 text-center">Subtotal</div>
            </div>

            <div className="mt-4 space-y-4">
              {cupcakesCart.map(({ cupcake, quantity }) => (
                <div
                  key={cupcake.id}
                  className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 items-center lg:items-start p-4 border border-gray-400 rounded-md"
                >
                  <div className="lg:col-span-6 flex lg:flex-row flex-col items-center lg:items-start mt-6 lg:mt-0">
                    <img
                      className="w-56 lg:w-24 object-contain rounded-lg"
                      src={`http://127.0.0.1:8000/storage/${cupcake.image}`}
                      alt={cupcake.name}
                    />
                    <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start mt-2 lg:mt-0 lg:ml-5">
                      <p className="font-medium mt-5 lg:mt-0 break-words">
                        {cupcake.name}
                      </p>
                      <button
                        onClick={() => deleteCupcakeCart(cupcake.id)}
                        className="mt-4 w-10 h-10 flex items-center justify-center transition-all border-2 border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-2 flex flex-col items-center mt-4 lg:mt-0">
                    <p className="lg:hidden font-semibold mb-2 text-center">
                      Quantidade
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(cupcake.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white transition-all"
                        disabled={quantity === 1}
                      >
                        -
                      </button>
                      <p className="w-8 text-center">{quantity}</p>
                      <button
                        onClick={() => increaseQuantity(cupcake.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-2 flex flex-col items-center mt-4 lg:mt-0">
                    <p className="lg:hidden font-semibold mb-1">Preço</p>
                    <p className="font-medium">R${cupcake.amount}</p>
                  </div>

                  <div className="lg:col-span-2 flex flex-col items-center mt-4 lg:mt-0">
                    <p className="lg:hidden font-semibold mb-1 flex items-center justify-center">
                      Subtotal
                    </p>
                    <p className="font-medium flex items-center justify-center">
                      {formatCurrency(cupcake.amount * quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-end justify-end space-x-3">
              <Link
                to="/"
                className="lg:w-auto w-full text-center border-2 border-gray-500 hover:bg-gray-500 hover:text-white transition-all py-2 px-4 rounded"
              >
                Continuar comprando
              </Link>
              <Link
                to="/checkout"
                className="lg:w-auto w-full text-center border-2 border-[#d42e86] hover:bg-[#d42e86] hover:text-white transition-all py-2 px-4 rounded"
              >
                Fazer Checkout
              </Link>
            </div>
          </>
        )}

        {!loading && cupcakesCart.length === 0 && (
          <p className="mt-6 flex items-center justify-center">
            O carrinho está vazio
          </p>
        )}
      </div>
    </MainLayout>
  );
}
