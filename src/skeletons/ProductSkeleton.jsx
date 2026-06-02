import SkeletonBlock from "./SkeletonBlock";

const ProductSkeleton = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3 rounded-[10px] p-[9px]">
        <SkeletonBlock className="h-[52px] w-[52px] rounded-[10px]" />
        <div className="space-y-2">
          <SkeletonBlock className="h-3.5 w-4/5" />
          <SkeletonBlock className="h-3 w-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[278px] rounded-[14px] border border-slate-100 bg-white p-3">
      <SkeletonBlock className="mt-3 h-[150px] w-full rounded-xl" />
      <SkeletonBlock className="mt-4 h-4 w-11/12" />
      <SkeletonBlock className="mt-2 h-4 w-2/3" />
      <SkeletonBlock className="mt-3 h-5 w-20 rounded-full" />
    </div>
  );
};

export default ProductSkeleton;
