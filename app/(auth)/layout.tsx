import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center md:items-stretch px-10 py-11">
      <section className="flex flex-1 h-full md:h-auto flex-col items-center bg-white py-5 rounded-xl md:justify-center md:rounded-s-3xl md:rounded-e-none md:p-10">
        <Image
          src="/assets/images/Logo.png"
          alt="logo"
          width={224}
          height={82}
          className="md:hidden p-5 mb-5"
          draggable={false}
        />
        {children}
      </section>

      <section className="hidden w-1/2 items-center justify-center bg-[url(/assets/images/AuthBackground.jpg)] bg-no-repeat bg-cover bg-left p-10 rounded-e-3xl md:flex md:w-2/5">
        <div className="space-y-5 text-black flex flex-col items-center">
          <Image
            src="/assets/images/Logo.png"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[250px] md:w-[250px] mt-2"
            draggable={false}
          />
          <h1 className="text-3xl">Welcome to Storevia</h1>
          <p className="text-lg text-center font-normal">
            Your personal storage manager is just a click away.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Layout;
