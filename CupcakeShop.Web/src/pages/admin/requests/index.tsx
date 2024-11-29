import BreadCrumb, { Page } from "../../../components/bread-crumb";
import AdminLayout from "../../../components/layouts/admin-layout";
import { useEffect, useState } from "react";
import Loading from "../../../components/loading";
import api from "../../../services/api-client";
import ListServiceResult from "../../../interfaces/list-service-result";
import { AiOutlineDelete } from "react-icons/ai";
import { formatCurrency } from "../../../utils/format-currency";
import { getRequestStatusTypeLabel } from "../../../utils/convert-status-enum";
import RequestModel from "../../../interfaces/models/request-model";
import RequestStatusType from "../../../enums/request-status-type";
import { format } from "date-fns";
import apiErrorHandler from "../../../services/api-error-handler";

export default function ListRequests() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/",
      name: "Início",
    },
    {
      link: "/admin/requests",
      name: "Pedidos",
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCancel, setLoadingCancel] = useState<boolean>(false);

  const [requests, setRequests] = useState<RequestModel[]>([]);

  const fetchRequests = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ListServiceResult<RequestModel>>("/requests")
      .then(({ data }) => {
        setRequests(data.data);
      })
      .finally(() => setLoading(false));
  };

  const cancelRequest = async (requestId: number): Promise<void> => {
    setLoadingCancel(true);

    api
      .post(`/checkout/${requestId}/cancel`)
      .then(() => {
        fetchRequests();
      })
      .catch(apiErrorHandler)
      .finally(() => setLoadingCancel(false));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-3">
        <BreadCrumb history={breadCrumbHistory} />
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
                    Preço
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Quantidade
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Total
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Tipo de entrega
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Tipo de pagamento
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Status
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Data do pedido
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((request) => (
                  <tr className="bg-white" key={request.id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {request.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {formatCurrency(request.amount)}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {request.quantity}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {formatCurrency(request.total_amount)}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {request.delivery_type}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {request.payment_type}
                    </td>
                    <td
                      className={`p-3 text-center uppercase font-semibold ${
                        request.status === RequestStatusType.FINISHED
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {getRequestStatusTypeLabel(request.status)}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {format(new Date(request.created_at), "dd/MM/yyyy")}
                    </td>
                    <td className="px-3 py-6 whitespace-nowrap flex items-center text-center">
                      {request.status !== RequestStatusType.CANCELED ? (
                        <button>
                          <AiOutlineDelete
                            className="text-red-600 cursor-pointer ml-2"
                            onClick={() => cancelRequest(request.id)}
                            size={20}
                          />
                        </button>
                      ) : (
                        <button disabled>
                          <AiOutlineDelete
                            className="text-gray-600 ml-2"
                            size={20}
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {requests.map((request) => (
              <div
                className="bg-white space-y-3 p-4 rounded-lg shadow"
                key={request.id}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <span>Nome:</span>
                  <span className="text-gray-500">{request.name}</span>
                </div>
                <div className="text-sm">
                  Preço:{" "}
                  <span className="text-gray-700">
                    {formatCurrency(request.amount)}
                  </span>
                </div>
                <div className="text-sm">
                  Quantidade:{" "}
                  <span className="text-gray-700">{request.quantity}</span>
                </div>
                <div className="text-sm">
                  Total:{" "}
                  <span className="text-gray-700">
                    {formatCurrency(request.total_amount)}
                  </span>
                </div>
                <div className="text-sm">
                  Tipo de entrega:{" "}
                  <span className="text-gray-700">{request.delivery_type}</span>
                </div>
                <div className="text-sm">
                  Tipo de pagamento:{" "}
                  <span className="text-gray-700">{request.payment_type}</span>
                </div>
                <div className="text-sm">
                  Data do pedido:{" "}
                  <span className="text-gray-700">
                    {format(new Date(request.created_at), "dd/MM/yyyy")}
                  </span>
                </div>
                <div className="text-sm">
                  Status:{" "}
                  <span
                    className={`${
                      request.status === RequestStatusType.FINISHED
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <button
                  onClick={() => cancelRequest(request.id)}
                  className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
                  disabled={
                    loadingCancel ||
                    request.status === RequestStatusType.CANCELED
                  }
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && requests.length === 0 && (
        <div className="text-center text-gray-500 mt-5">
          Nenhum pedido encontrado
        </div>
      )}
    </AdminLayout>
  );
}
