import SkeletonBlock from "./SkeletonBlock";

const OrdersSkeleton = ({ count = 4 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <SkeletonBlock className="h-5 w-28" />
              <SkeletonBlock className="h-4 w-48" />
            </div>
            <SkeletonBlock className="h-7 w-24 rounded-full" />
          </div>
          <div className="mt-4 flex gap-4">
            <SkeletonBlock className="h-16 w-16 rounded-xl" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-4/5" />
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-4 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersSkeleton;
