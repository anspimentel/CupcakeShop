import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layouts/admin-layout";
import Loading from "../../../components/loading";
import CardsModel from "../../../interfaces/models/cards-model";
import ServiceResult from "../../../interfaces/service-result";
import api from "../../../services/api-client";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<CardsModel>();

  const fetchCards = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ServiceResult<CardsModel>>(`/dashboard`)
      .then(({ data }) => {
        setCards(data.data as CardsModel);
      })
      .catch(() => {
        toast.error("Erro ao buscar informações dos cards.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
        <div className="col-span-1 lg:col-span-4">
          <Link to="/admin/cupcakes">
            <div className="bg-white shadow-lg w-full py-4 px-5">
              <p className="text-sm font-medium">Cupcakes cadastrados</p>
              <div className="mt-2">
                {loading && <Loading className="mt-2 mb-2" />}

                {!loading && (
                  <p className="text-4xl font-medium">
                    {cards?.cupcakesCount !== 0 ? cards?.cupcakesCount : 0}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <Link to="/admin/requests">
            <div className="bg-white shadow-lg w-full py-4 px-5">
              <p className="text-sm font-medium">Pedidos cadastrados</p>
              <div className="mt-2">
                {loading && <Loading className="mt-2 mb-2" />}

                {!loading && (
                  <p className="text-4xl font-medium">
                    {cards?.requestsCount !== 0 ? cards?.requestsCount : 0}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <Link to="/admin/users">
            <div className="bg-white shadow-lg w-full py-4 px-5">
              <p className="text-sm font-medium">Usuários cadastrados</p>
              <div className="mt-2">
                {loading && <Loading className="mt-2 mb-2" />}

                {!loading && (
                  <p className="text-4xl font-medium">
                    {cards?.usersCount !== 0 ? cards?.usersCount : 0}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
