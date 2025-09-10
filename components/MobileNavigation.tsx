"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
import { Toaster } from "@/components/ui/sonner";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

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

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex h-[80px] justify-between px-5 md:hidden">
      <Image
        src="/assets/images/Logo.png"
        alt="logo"
        width={210}
        height={52}
        className="h-auto py-2"
        draggable={false}
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Search"
            width={50}
            height={50}
          />
        </SheetTrigger>
        <SheetContent className="pt-1 bg-white h-screen px-1">
          <SheetTitle className="mt-10">
            <div className="my-1 flex items-center justify-center gap-2 rounded-full p-1 text-white bg-blue-500">
              <Image
                src="/assets/images/avatarPlaceholderurl.png"
                alt="avatar"
                width={150}
                height={50}
                className="aspect-square w-10 object-contain"
                draggable={false}
              />
              <div className="md:hidden block">
                <p className="text-sm font-semibold capitalize">{fullName}</p>
                <p className="text-xs font-normal">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-black" />
          </SheetTitle>

          <nav className="text-lg font-semibold flex-1 gap-1 text-blue-500">
            <ul className="flex flex-1 flex-col gap-4">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="md:w-full">
                  <li
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg font-semibold flex text-black hover:bg-blue-600 hover:text-white gap-4 w-full justify-center items-center px-6 h-[52px] rounded-full",
                      pathname === url && "bg-blue-500 text-white"
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "w-6 filter invert opacity-80",
                        pathname === url && "invert-0 opacity-100"
                      )}
                    />
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="my-5 bg-black" />

          <div className="flex flex-col w-full items-center gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type="submit"
              className="text-base font-semibold flex h-[52px] items-center rounded-full bg-blue-500 px-6 text-white shadow-none transition-all hover:bg-blue-600"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logout logo"
                width={50}
                height={30}
                className="p-2"
              />
              <p>Logout</p>
            </Button>
          </div>
          <Toaster />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
