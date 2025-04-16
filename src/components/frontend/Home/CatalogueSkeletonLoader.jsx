import { Skeleton } from "@/components/ui/skeleton";

function CatalogueSkeletonLoader() {
  return (
    <div className="flex rounded-md overflow-hidden flex-col border-[1px] border-[#e5e5e5] gap-5">
      <Skeleton className="w-full h-[11rem] rounded-none bg-gray-300 duration-500" />
      <div className="p-5 flex flex-col gap-5">
        <Skeleton className="w-[50%] h-[1rem] bg-gray-300" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-[0.8rem] rounded-full bg-gray-300 duration-500" />
          <Skeleton className="w-full h-[0.8rem] rounded-full bg-gray-300 duration-500" />
        </div>
        <Skeleton className="w-[25%] h-[1.8rem] bg-gray-300 duration-500" />
      </div>
    </div>
  );
}
export default CatalogueSkeletonLoader;
