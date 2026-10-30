// TODO [D]: misma forma que CardProducto pero con <Skeleton />
import { Skeleton } from "./Skeleton";

export function SkeletonCardProducto() {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <Skeleton className="h-40 w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-1/3" />
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </article>
  );
}
