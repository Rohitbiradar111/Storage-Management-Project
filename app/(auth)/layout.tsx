import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen px-10 py-11 bg-gradient-to-r from-emerald-400 to-lime-600 ">
      <section className="flex flex-1 flex-col items-center bg-white py-28 lg:justify-center rounded-xl lg:rounded-s-3xl lg:rounded-e-none lg:p-10 lg:py-0">
        <Image
          src="/assets/images/Logo.png"
          alt="logo"
          width={224}
          height={82}
          className="lg:hidden p-5 mx-2 mb-10"
          draggable={false}
        />
        {children}
      </section>

      <section className="hidden w-1/2 items-center justify-center bg-[url(/assets/images/AuthBackground.jpg)] bg-no-repeat bg-cover bg-center p-10 rounded-e-3xl lg:flex xl:w-2/5">
        <div className="space-y-5 text-white flex flex-col items-center">
          <Image
            src="/assets/images/Logo.png"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[250px] lg:w-[250px] mt-2"
            draggable={false}
          />
          <h1 className="h1">Welcome to Storevia</h1>
          <p className="subtitle-1">
            Your personal storage manager is just a click away.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Layout;
