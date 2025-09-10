import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId,
  fullName,
  avatar,
  email,
}: {
  userId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}) => {
  return (
    <header className="hidden items-center justify-between gap-4 p-5 md:flex md:py-7 md:gap-10">
      <Search />

      <div className="flex items-center justify-center gap-2 rounded-full bg-blue-500 p-[5px] text-white md:justify-start md:px-[14px] md:py-2 border border-black">
        <Image
          src="/assets/images/avatarPlaceholderurl.png"
          alt="Avatar"
          width={150}
          height={50}
          className="aspect-square w-10 object-contain"
          draggable={false}
        />
        <div className="hidden md:block">
          <p className="text-sm font-semibold capitalize">{fullName}</p>
          <p className="text-xs font-normal">{email}</p>
        </div>
      </div>

      <div className="flex items-center justify-center min-w-fit gap-4">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
          <Button
            type="submit"
            className="flex justify-center h-[52px] min-w-[54px] items-center rounded-full bg-blue-500 p-3 shadow-none transition-all hover:bg-blue-600 border border-black"
          >
            <Image
              src="/assets/icons/logout.svg"
              alt="logout logo"
              width={24}
              height={24}
              className="w-6"
              draggable={false}
              title="Logout"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};
export default Header;
