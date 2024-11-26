import CupcakeModel from "./cupcake-model";

export default interface CartModel {
  cupcake: CupcakeModel;
  quantity: number;
}