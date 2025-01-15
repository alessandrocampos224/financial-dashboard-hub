import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";

export default function Index() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 flex flex-col bg-background dark:bg-gdrive-background">
        <Header />
        <div className="flex-1 overflow-y-auto scrollbar-custom">
          <Outlet />
        </div>
      </main>
    </div>
  );
}