import { format } from "date-fns";

export const Footer = () => {
  return (
    <div className="bg-white shadow-lg">
      <div className="px-8 lg:px-24 py-4 container mx-auto">
        <div className="flex items-center justify-between mb-4 xl:-ms-20 flex-col lg:flex-row">
          <div className="flex items-center space-x-3 mb-4 lg:mb-0 -ms-6 xl:-ms-0">
            <img src="/images/cupcake1.png" className="h-[70px]" />
            <p className="mx-3 mt-2 font-light text-xl">Cupcake Shop</p>
          </div>

          <div className="text-md text-gray-600 flex flex-col items-center lg:items-start">
            <p>Todos os direitos reservados.</p>
            <span className="font-semibold text-center">
              {format(new Date(), "yyyy")} &copy; Cupcake Shop.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
