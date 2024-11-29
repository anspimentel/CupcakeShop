import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { FaClipboardList, FaStore } from "react-icons/fa6";
import { GiCupcake } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  isSidebarOpen: boolean;
}

export const Sidebar = ({ isSidebarOpen }: Props) => {
  const navigate = useNavigate();

  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
    toast.success("Deslogado com sucesso!");
  };

  return (
    <div
      className={`transition-all duration-300 ${
        !isSidebarOpen ? "w-24 lg:w-60" : "w-0"
      } `}
    >
      <div className="h-full flex flex-col bg-gray-800 min-h-screen">
        <div className="p-4 pb-2 flex items-center justify-center lg:justify-start">
          <img src="/images/cupcake1.png" className="w-12 h-12 rounded-md" />
          <p className="hidden lg:flex mx-2 font-semibold text-gray-300">
            <span className={`mt-2 ${isSidebarOpen ? "hidden" : "block"}`}>
              Cupcake Shop
            </span>
          </p>
        </div>
        <ul className="flex-1 p-4 lg:p-2">
          <li
            className={`flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              isActive("/")
                ? `${!isSidebarOpen ? "bg-slate-600 text-white" : ""}`
                : "hover:bg-slate-600 hover:text-white text-gray-300"
            } mb-2`}
          >
            <Link
              to="/"
              className="flex items-center overflow-hidden transition-all"
            >
              <FaStore size={25} className="lg:-mt-1"/>
              <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
                Loja
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              isActive("/admin")
                ? `${!isSidebarOpen ? "bg-slate-600 text-white" : ""}`
                : "hover:bg-slate-600 hover:text-white text-gray-300"
            } mb-2`}
          >
            <Link
              to="/admin"
              className="flex items-center overflow-hidden transition-all"
            >
              <RiDashboard2Fill size={25} className="lg:-mt-1"/>
              <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
                Dashboard
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              isActive("/admin/cupcakes")
                ? `${!isSidebarOpen ? "bg-slate-600 text-white" : ""}`
                : "hover:bg-slate-600 hover:text-white text-gray-300"
            } mb-2`}
          >
            <Link
              to="/admin/cupcakes"
              className="flex items-center overflow-hidden transition-all"
            >
              <GiCupcake size={25} className="lg:-mt-1" />
              <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
                Cupcakes
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              isActive("/admin/requests")
                ? `${!isSidebarOpen ? "bg-slate-600 text-white" : ""}`
                : "hover:bg-slate-600 hover:text-white text-gray-300"
            } mb-2`}
          >
            <Link
              to="/admin/requests"
              className="flex items-center overflow-hidden transition-all"
            >
              <FaClipboardList size={25} className="lg:-mt-1" />
              <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
                Pedidos
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center justify-center py-3 lg:py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              isActive("/admin/users")
                ? `${!isSidebarOpen ? "bg-slate-600 text-white" : ""}`
                : "hover:bg-slate-600 hover:text-white text-gray-300"
            } mb-2`}
          >
            <Link
              to="/admin/users"
              className="flex items-center overflow-hidden transition-all"
            >
              <FaUserAlt size={25} className="lg:-mt-1" />
              <span className="hidden lg:flex overflow-hidden transition-all w-52 ml-3">
                Usuários
              </span>
            </Link>
          </li>
        </ul>
        <div className="border-t flex p-4">
          <div className="flex justify-center lg:justify-between items-center overflow-hidden w-52">
            <div className="flex justify-between items-center overflow-hidden transition-all">
              <div className="leading-4 hidden lg:block text-gray-300">
                <h4 className="font-semibold">Sair</h4>
              </div>
            </div>
            <div
              className="cursor-pointer transition-colors group hover:bg-slate-600 hover:text-white py-3 px-4 rounded-md text-gray-300"
              onClick={logout}
            >
              <MdLogout size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
