import React from "react";
import Sort from "@/components/Sort";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import {
  convertFileSize,
  getFileTypesParams,
  getUsageSummary,
} from "@/lib/utils";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });

  const [totalSpace] = await Promise.all([getTotalSpaceUsed()]);
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
      <section className="w-full">
        <h1 className="text-3xl font-bold capitalize">{type}</h1>

        <div className="flex mt-2 flex-col justify-between md:flex-row items-center">
          <p className="text-base font-normal">
            Total Size :&nbsp;
            <span>
              {convertFileSize(
                usageSummary.find(
                  (summary) =>
                    summary.title.toLowerCase() === type.toLowerCase()
                )?.size || 0
              )}
            </span>
          </p>

          <div className="mt-5 flex items-center md:mt-0 md:gap-3">
            <p className="text-base font-normal text-black hidden md:block">
              Sort by:
            </p>
            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="grid w-full gap-3 grid-cols-2 md:grid-cols-4">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="text-base font-normal mt-10 text-center text-black">
          No files uploaded.
        </p>
      )}
    </div>
  );
};

export default Page;
