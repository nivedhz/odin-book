import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <Skeleton className="h-5 w-28" />
      <div className="mt-6 flex items-center gap-2" aria-hidden="true">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="mt-4 h-9 w-4/5" />
      <div className="mt-4 flex flex-col gap-2" aria-hidden="true">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <p className="sr-only" role="status">
        Loading…
      </p>
    </div>
  );
}
