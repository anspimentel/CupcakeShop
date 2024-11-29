import CupcakeStatusTypeEnum from "../../enums/cupcake-status-type";

export default interface CupcakeModel {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  amount: number;
  quantity: string;
  status: CupcakeStatusTypeEnum
  image: string;
  image_url: string;
}
