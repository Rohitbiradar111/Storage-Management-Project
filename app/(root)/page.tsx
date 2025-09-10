import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";
import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
      <section>
        <Chart used={totalSpace.used} />

        <ul className="mt-7 grid grid-cols-2 gap-8 md:mt-10 md:gap-9">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="relative mt-4 md:mt-1 rounded-[20px] bg-white p-2 md:p-5 transition-all hover:scale-105"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="uploaded image"
                    className="absolute -left-3 top-[-25px] z-10 w-[190px] object-contain"
                  />
                  <h4 className="text-sm font-normal md:text-base md:font-medium relative z-20 w-full text-right">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="text-base font-bold md:text-lg md:font-medium relative z-20 text-center">
                  {summary.title}
                </h5>
                <Separator className="bg-gray-200" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center text-[15px]"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      <section className="h-full rounded-[20px] bg-white p-5 md:p-8">
        <h2 className="text-lg text-center font-semibold md:text-2xl md:font-bold text-black">
          Recent Uploads
        </h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.documents.map((file: Models.Document) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                  className="size-12"
                  imageClassName="size-7"
                />

                <div className="flex w-full justify-between md:flex-row md:justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold w-full text-black break-all sm:max-w-[200px] lg:max-w-[250px]">
                      {file.name}
                    </p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="text-xs font-normal"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-lg font-normal mt-10 text-center text-black">
            No files uploaded.
          </p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
