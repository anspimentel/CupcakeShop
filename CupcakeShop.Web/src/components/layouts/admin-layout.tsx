import { useState } from "react";
import { Sidebar } from "../admin/sidebar";
import { Header } from "../admin/header";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((state) => !state);
  };

  return (
    <div className="flex h-screen" style={{ overflowX: "hidden" }}>
      <div>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
      <div
        className="flex flex-col flex-1 w-full"
        style={{ overflowX: "auto" }}
      >
        <Header toggleSidebar={toggleSidebar} />
        <div className="px-8 py-6">{children}</div>
      </div>
    </div>
  );
}
