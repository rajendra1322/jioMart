import SkeletonBlock from "./SkeletonBlock";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <SkeletonBlock className="h-8 w-64" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-md">
            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-9 w-24" />
            </div>
            <SkeletonBlock className="h-14 w-14 rounded-full" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-md lg:col-span-3">
          <SkeletonBlock className="mb-4 h-6 w-40" />
          <SkeletonBlock className="h-[220px] w-full" />
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-md">
          <SkeletonBlock className="mb-4 h-6 w-40" />
          <SkeletonBlock className="h-[230px] w-full" />
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-md">
          <SkeletonBlock className="mb-4 h-6 w-32" />
          <SkeletonBlock className="mx-auto h-[220px] w-[220px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
