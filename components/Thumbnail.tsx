import React from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

export const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure
      className={cn(
        "flex items-center justify-center size-[50px] border-2 min-w-[50px] overflow-hidden rounded-full bg-blue-50",
        className
      )}
    >
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-5",
          imageClassName,
          isImage && "size-full object-contain object-center"
        )}
        draggable={false}
      />
    </figure>
  );
};
export default Thumbnail;
