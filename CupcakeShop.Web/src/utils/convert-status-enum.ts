import CupcakeStatusType from "../enums/cupcake-status-type";
import RequestStatusType from "../enums/request-status-type";

const getCupcakeStatusTypeLabel = (type: CupcakeStatusType) => {
  switch (type) {
    case CupcakeStatusType.IN_STOCK:
      return "Em estoque";
    case CupcakeStatusType.OUT_OF_STOCK:
      return "Fora de estoque";
    default:
      return "Desconhecido";
  }
}

const getRequestStatusTypeLabel = (type: RequestStatusType) => {
  switch (type) {
    case RequestStatusType.FINISHED:
      return "Finalizado";
    case RequestStatusType.CANCELED:
      return "Cancelado";
    default:
      return "Desconhecido";
  }
}

export { getCupcakeStatusTypeLabel, getRequestStatusTypeLabel };
