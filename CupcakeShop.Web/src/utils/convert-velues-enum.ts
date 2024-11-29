import DeliveryType from "../enums/delivery-type";
import PaymentType from "../enums/payment-type";

const getDeliveryTypeLabel = (type: DeliveryType) => {
  switch (type) {
    case DeliveryType.RECEIVE:
      return "Entregar no endereço";
    case DeliveryType.WITHDRAW:
      return "Retirar na loja";
    default:
      return "Desconhecido";
  }
}

const getPaymentTypeLabel = (type: PaymentType) => {
  switch (type) {
    case PaymentType.MONEY:
      return "Dinheiro";
    case PaymentType.CREDIT_CARD:
      return "Cartão de crédito";
    case PaymentType.PIX:
      return "Pix";
    default:
      return "Desconhecido";
  }
};

export { getDeliveryTypeLabel, getPaymentTypeLabel };
