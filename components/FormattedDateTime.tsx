import React from "react";
import { cn, formatDateTime } from "@/lib/utils";

export const FormattedDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p className={cn("text-lg font-normal text-black", className)}>
      {formatDateTime(date)}
    </p>
  );
};
export default FormattedDateTime;
