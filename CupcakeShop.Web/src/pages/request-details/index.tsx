import { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/main-layout";
import ProfileModel from "../../interfaces/models/profile.model";
import api from "../../services/api-client";
import ServiceResult from "../../interfaces/service-result";
import { format } from "date-fns";
import Loading from "../../components/loading";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/format-currency";
import RequestModel from "../../interfaces/models/request-model";
import RequestStatusType from "../../enums/request-status-type";
import { getRequestStatusTypeLabel } from "../../utils/convert-status-enum";
import { getDeliveryTypeLabel, getPaymentTypeLabel } from "../../utils/convert-velues-enum";
import PaymentType from "../../enums/payment-type";
import DeliveryType from "../../enums/delivery-type";

export default function RequestDetails() {
  const { requestId } = useParams();

  const [loading, setLoading] = useState<boolean>(false);

  const [profile, setProfile] = useState<ProfileModel | null>();
  const [request, setRequest] = useState<RequestModel | null>();

  const fetchProfile = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ServiceResult<ProfileModel>>("/me")
      .then(({ data }) => {
        setProfile(data.data);
      })
      .finally(() => setLoading(false));
  };

  const fetchRequest = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ServiceResult<RequestModel>>(`/checkout/${requestId}`)
      .then(({ data }) => {
        setRequest(data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfile();
    fetchRequest();
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <p className="text-2xl">Checkout</p>

        {loading && (
          <div className="mt-6">
            <Loading centered />
          </div>
        )}

        {!loading && (
          <form>
            <div className="mt-5 p-6 border border-gray-300 rounded-md bg-white">
              <p className="mb-8 font-medium text-2xl">
                Status:{" "}
                <span
                  className={`uppercase font-semibold ${
                    request?.status === RequestStatusType.FINISHED
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {getRequestStatusTypeLabel(
                    request?.status as RequestStatusType
                  )}
                </span>
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                <div className="col-span-6">
                  <div className="text-sm space-y-2">
                    <p>Para</p>
                    <p className="font-semibold">{profile?.name}</p>
                    {profile?.street && profile?.number && (
                      <p>
                        {profile?.street}, {profile?.number}
                      </p>
                    )}

                    {profile?.city && profile?.state && (
                      <p>
                        {profile?.city} - {profile?.state}
                      </p>
                    )}

                    {profile?.phone && <p>Telefone: {profile?.phone}</p>}

                    <p>E-mail: {profile?.email}</p>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="text-sm space-y-2">
                    <p className="font-semibold">
                      Data do pedido:{" "}
                      <span className="font-normal">
                        {profile?.created_at &&
                          format(new Date(profile.created_at), "dd/MM/yyyy")}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Cliente:{" "}
                      <span className="font-normal">{profile?.name}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="col-span-6 p-6 border border-gray-300 rounded-md bg-white">
                  <p className="font-semibold">Itens</p>
                  <div
                    className="flex items-center justify-between mt-6"
                    key={request?.id}
                  >
                    <div className="flex flex-col">
                      <p className="break-words">{request?.name}</p>
                      <div className="flex items-center space-x-5">
                        <p className="mt-3">
                          Preço:{" "}
                          <span className="font-semibold">
                            {formatCurrency(request?.amount || 0)}
                          </span>
                        </p>
                        <p className="mt-3">
                          Quantidade:{" "}
                          <span className="font-semibold">
                            {request?.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-5 mt-2">
                      <p className="mt-3">
                        Tipo de pagamento:{" "}
                        <span className="font-semibold">
                          {getPaymentTypeLabel(
                            request?.payment_type as PaymentType
                          )}
                        </span>
                      </p>
                      <p className="mt-3">
                        Tipo de entrega:{" "}
                        <span className="font-semibold">
                          {getDeliveryTypeLabel(
                            request?.delivery_type as DeliveryType
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-6 p-6 border border-gray-300 rounded-md bg-white">
                  <p className="font-semibold">Valor da compra</p>
                  <hr className="mt-5" />
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 mt-4">
                    <div className="col-span-1">
                      <p className="font-semibold">Total:</p>
                    </div>
                    <div className="col-span-11">
                      <p className="font-light">
                        {formatCurrency(request?.total_amount || 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </MainLayout>
  );
}
