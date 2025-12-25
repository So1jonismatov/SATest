import { Outlet } from "react-router-dom";
import links from "@/data/admin-page/sidebar-links";
import AdminHeader from "@/components/shared/admin-portal/Admin-Header";
import { GenericSidebarComponent } from "@/components/shared/Sidebar/GenericSidebarComponent";

const AdminPortalLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      <GenericSidebarComponent linksData={links} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPortalLayout;
