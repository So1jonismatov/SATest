import React from "react";
import { Outlet } from "react-router-dom";
import links from "@/data/parent-page/sidebar-links";
import { GenericSidebarComponent } from "@/components/shared/Sidebar/GenericSidebarComponent";

const ParentPortalLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      <GenericSidebarComponent linksData={links} />
      <main className="flex-1 overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default ParentPortalLayout;
