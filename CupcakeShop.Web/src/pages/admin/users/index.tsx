import BreadCrumb, { Page } from "../../../components/bread-crumb";
import AdminLayout from "../../../components/layouts/admin-layout";
import { useEffect, useState } from "react";
import Loading from "../../../components/loading";
import api from "../../../services/api-client";
import ListServiceResult from "../../../interfaces/list-service-result";
import { AiOutlineDelete } from "react-icons/ai";
import { getApiErrorMessage } from "../../../services/api-error-handler";
import ProfileModel from "../../../interfaces/models/profile.model";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ServiceResult from "../../../interfaces/service-result";

export default function ListUsers() {
  const breadCrumbHistory: Page[] = [
    {
      link: "/",
      name: "Início",
    },
    {
      link: "/admin/users",
      name: "Usuários",
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const [users, setUsers] = useState<ProfileModel[]>([]);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);

    api
      .get<ListServiceResult<ProfileModel>>("/users")
      .then(({ data }) => {
        setUsers(data.data);
      })
      .finally(() => setLoading(false));
  };

  const deleteUser = async (userId: number): Promise<void> => {
    setLoadingDelete(true);

    toast
      .promise<ServiceResult>(
        api.delete(`/users/${userId}`),

        {
          loading: "Excluindo usuário...",
          success: () => {
            const updatedProducts = users.filter(
              (user) => user.id !== userId
            );
            setUsers(updatedProducts);
            fetchUsers();
            return "Usuário excluído com sucesso!";
          },
          error: (error) => getApiErrorMessage(error),
        }
      )
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mb-3">
        <BreadCrumb history={breadCrumbHistory} />

        <Link
          to="/admin/users/create"
          className="rounded-full px-8 py-2 bg-gray-800 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
        >
          Adicionar
        </Link>
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
                    Email
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    CEP
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Rua
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Bairro
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Número
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Estado
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Cidade
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Telefone
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr className="bg-white" key={user.id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.zipcode}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.street}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.neighborhood}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.number}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.state}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.city}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.phone}
                    </td>
                    <td className="px-3 py-6 whitespace-nowrap flex items-center text-center">
                        <button>
                          <AiOutlineDelete
                            className="text-red-600 cursor-pointer ml-2"
                            onClick={() => deleteUser(user.id)}
                            size={20}
                          />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {users.map((user) => (
              <div
                className="bg-white space-y-3 p-4 rounded-lg shadow"
                key={user.id}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <span>Nome:</span>
                  <span className="text-gray-500">{user.name}</span>
                </div>
                <div className="text-sm">
                  Email: <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="text-sm">
                  CEP: <span className="text-gray-700">{user.zipcode}</span>
                </div>
                <div className="text-sm">
                  Rua: <span className="text-gray-700">{user.street}</span>
                </div>
                <div className="text-sm">
                  Bairro:{" "}
                  <span className="text-gray-700">{user.neighborhood}</span>
                </div>
                <div className="text-sm">
                  Número: <span className="text-gray-700">{user.number}</span>
                </div>
                <div className="text-sm">
                  Estado: <span className="text-gray-700">{user.state}</span>
                </div>
                <div className="text-sm">
                  Cidade: <span className="text-gray-700">{user.city}</span>
                </div>
                <div className="text-sm">
                  Telefone: <span className="text-gray-700">{user.phone}</span>
                </div>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="rounded-full px-8 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-all text-center mt-3 lg:mt-0 mb-2 lg:mb-0 w-full lg:w-[200px]"
                  disabled={loadingDelete}
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && users.length === 0 && (
        <div className="text-center text-gray-500 mt-5">
          Nenhum usuário encontrado
        </div>
      )}
    </AdminLayout>
  );
}
