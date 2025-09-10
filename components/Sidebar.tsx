"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Dashboard",
    icon: "/assets/icons/dashboard.svg",
    url: "/",
  },
  {
    name: "Documents",
    icon: "/assets/icons/documents.svg",
    url: "/documents",
  },
  {
    name: "Images",
    icon: "/assets/icons/images.svg",
    url: "/images",
  },
  {
    name: "Media",
    icon: "/assets/icons/video.svg",
    url: "/media",
  },
  {
    name: "Others",
    icon: "/assets/icons/others.svg",
    url: "/others",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col px-5 py-2 w-[325px]">
      <Link href="/">
        <Image
          src="/assets/images/Logo.png"
          alt="logo"
          width={210}
          height={50}
          className="hidden h-auto md:block mx-auto my-4"
          draggable={false}
        />

        <Image
          src="/assets/images/Logo.png"
          alt="logo"
          width={210}
          height={52}
          className="md:hidden mx-auto my-5"
          draggable={false}
        />
      </Link>

      <nav className="mt-5 gap-1 text-lg font-semibold">
        <ul className="flex flex-1 flex-col gap-5">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="md:w-full">
              <li
                className={cn(
                  "flex text-black gap-4 hover:bg-blue-600 hover:text-white rounded-xl md:w-full justify-center md:justify-start items-center text-lg font-medium md:px-[30px] h-[52px] md:rounded-full border-2 border-black",
                  pathname === url && "bg-blue-600 text-white"
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  draggable={false}
                  className={cn(
                    "w-6 filter invert opacity-80",
                    pathname === url && "invert-0 opacity-100"
                  )}
                />
                <p className="hidden md:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
