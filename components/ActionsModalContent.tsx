import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="mb-1 flex items-center gap-3 rounded-xl break-all border bg-white p-3">
    <Thumbnail
      type={file.type}
      extension={file.extension}
      url={file.url}
      className="size-12"
      imageClassName="size-7"
    />
    <div className="flex flex-col">
      <p className="text-sm font-semibold mb-2">{file.name}</p>
      <FormattedDateTime
        date={file.$createdAt}
        className="text-xs font-normal text-black"
      />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="text-sm font-normal w-[30%] text-black text-left">{label}</p>
    <p className="text-sm font-semibold flex-1 text-left capitalize">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format :" value={file.extension} />
        <DetailRow label="Size :" value={convertFileSize(file.size)} />
        <DetailRow label="Owner :" value={file.owner.fullName} />
        <DetailRow
          label="Last Edit :"
          value={formatDateTime(file.$updatedAt)}
        />
      </div>
    </>
  );
};

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="mt-2 space-y-2">
        <p className="text-sm font-semibold pl-1 text-black">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="text-sm font-normal outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-[52px] w-full rounded-full border border-black px-4"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-black">Shared with</p>
            <p className="text-sm font-semibold text-black">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="text-sm font-semibold">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="rounded-full bg-transparent text-white shadow-none hover:bg-transparent"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="aspect-square rounded-full"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
