import React from "react";
import { Outlet } from "react-router-dom";
import { GenericSidebarComponent } from "@/components/shared/Sidebar/GenericSidebarComponent";
import studentLinksData from "@/data/student-page/sidebar-links";

const StudentPortalLayout: React.FC = () => {
  return (
    <div className="h-screen bg-background">
      {/* Desktop: flex layout, Mobile: block layout */}
      <div className="flex flex-col h-full md:flex-row">
        {/* Sidebar */}
        <GenericSidebarComponent linksData={studentLinksData} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto min-h-0 md:min-h-full">
          <div className="h-full p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentPortalLayout;
