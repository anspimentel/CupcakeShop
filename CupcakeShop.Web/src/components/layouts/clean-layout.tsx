interface Props {
  children: React.ReactNode;
}

export default function CleanLayout({ children }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="relative hidden lg:flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <img
            className="object-cover w-full h-full absolute"
            src="/images/fundo-cupcake.jpg"
            alt=""
          />
          <div className="relative flex items-center justify-center mt-8">
            <img className="w-20" src="/images/cupcake1.png" alt="" />
            <p className="mt-2 mx-3 text-[28px] font-light">Cupcake Shop</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="bg-white px-12 md:px-20 lg:py-16">
        <div className="mb-10">{children}</div>
      </div>
    </div>
  );
}
