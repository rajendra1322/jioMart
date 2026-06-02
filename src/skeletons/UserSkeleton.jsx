import SkeletonBlock from "./SkeletonBlock";

const UserSkeleton = ({ orders = false }) => {
  return (
    <div className="grid w-full gap-4">
      {!orders ? (
        <div className="account-panel rounded-xl border border-slate-200 bg-white p-5 shadow">
          <SkeletonBlock className="h-6 w-48" />
          <div className="mt-6 space-y-3">
            <SkeletonBlock className="h-5 w-3/4" />
            <SkeletonBlock className="h-5 w-2/3" />
            <SkeletonBlock className="h-5 w-52" />
            <SkeletonBlock className="h-16 w-full" />
          </div>
        </div>
      ) : (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-4 shadow">
            <SkeletonBlock className="h-5 w-24" />
            <div className="mt-3 flex gap-4">
              <SkeletonBlock className="h-14 w-14 rounded-lg" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-5 w-4/5" />
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-5 w-20" />
              </div>
            </div>
            <SkeletonBlock className="mt-4 h-4 w-16" />
          </div>
        ))
      )}
    </div>
  );
};

export default UserSkeleton;
