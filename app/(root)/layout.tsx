import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />

      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header
          userId={currentUser.$id}
          accountId={currentUser.accountId}
          {...currentUser}
        />
        <div className="scrollbar-hide h-full flex-1 overflow-auto bg-yellow-300 px-5 py-7 md:mr-7 md:rounded-[30px] md:mb-7 md:px-9 md:py-10">
          {children}
        </div>
      </section>

      <Toaster />
    </main>
  );
};
export default Layout;
