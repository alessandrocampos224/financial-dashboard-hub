import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background dark:bg-gdrive-background">
      <AppSidebar />
      <main className="flex-1 flex flex-col w-full">
        <Header />
        <div className="flex-1 overflow-y-auto scrollbar-custom p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}