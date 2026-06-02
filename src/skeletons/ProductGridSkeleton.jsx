import ProductSkeleton from "./ProductSkeleton";
import SkeletonBlock from "./SkeletonBlock";

const ProductGridSkeleton = ({ count = 5, showHeader = false }) => {
  return (
    <div className="w-full">
      {showHeader && (
        <div className="mb-4 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <SkeletonBlock className="h-3 w-28" />
            <SkeletonBlock className="h-7 w-52" />
          </div>
          <SkeletonBlock className="hidden h-4 w-32 sm:block" />
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: count }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductGridSkeleton;
