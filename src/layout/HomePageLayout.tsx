import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LazyFooter, LazyHeader } from "@/components";

const HomePageLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="flex flex-col min-h-screen">
        <LazyHeader />

        <main>
          <Outlet />
        </main>
        <LazyFooter />
      </div>
    </Suspense>
  );
};

export default HomePageLayout;
