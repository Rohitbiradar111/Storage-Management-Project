import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionDropdown from "@/components/ActionDropdown";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex flex-wrap cursor-pointer flex-col gap-4 md:gap-6 rounded-xl md:rounded-[18px] bg-white px-4 py-3 md:p-5 shadow-sm transition-all hover:scale-105"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="size-12 md:size-20"
          imageClassName="size-11"
        />

        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="text-sm md:text-base font-normal text-black">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-black break-all">
        <p className="text-sm font-semibold">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="text-sm font-normal text-black"
        />
        <p className="text-sm font-normal capitalize text-black">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};
export default Card;
