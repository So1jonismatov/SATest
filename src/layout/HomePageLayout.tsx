import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LazyHeader } from "@/components";

const HomePageLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      }
    >
      <div className="flex flex-col min-h-screen h-screen">
        <LazyHeader />

        <main className="flex-1 pt-20">
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
};

export default HomePageLayout;
