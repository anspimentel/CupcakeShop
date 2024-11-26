import { Footer } from "../footer";
import { Header } from "../header";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col grow">
        <main className="grow mt-24 container mx-auto px-5 py-5">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
