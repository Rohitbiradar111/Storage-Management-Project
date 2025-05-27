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
    <header className="header">
      <Search />

      <div className="user-info">
        <Image
          src="/assets/images/avatarPlaceholderurl.png"
          alt="Avatar"
          width={150}
          height={50}
          className="user-avatar"
          draggable={false}
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>

      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
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
