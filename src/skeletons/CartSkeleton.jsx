import SkeletonBlock from "./SkeletonBlock";

const CartSkeleton = ({ items = 3 }) => {
  return (
    <div className="mx-auto my-8 grid w-[min(1180px,calc(100%_-_32px))] grid-cols-[minmax(0,1fr)_minmax(320px,400px)] items-start gap-[30px] max-[900px]:grid-cols-1 max-[520px]:my-5 max-[520px]:w-[min(100%_-_20px,1180px)]">
      <section>
        <SkeletonBlock className="mt-5 h-9 w-36" />
        <div className="mt-7 flex justify-between gap-4">
          <SkeletonBlock className="h-6 w-44" />
          <SkeletonBlock className="h-6 w-24" />
        </div>
        <SkeletonBlock className="mt-4 h-10 w-full" />
        {Array.from({ length: items }).map((_, index) => (
          <div key={index} className="mt-5 rounded-3xl bg-white p-3.5 shadow">
            <SkeletonBlock className="h-4 w-56" />
            <div className="mt-3 flex items-center gap-4">
              <SkeletonBlock className="h-[100px] w-[100px] rounded-xl" />
              <div className="flex-1 space-y-3">
                <SkeletonBlock className="h-5 w-4/5" />
                <SkeletonBlock className="h-5 w-24" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <SkeletonBlock className="h-5 w-24" />
              <div className="flex gap-2">
                <SkeletonBlock className="h-[38px] w-[38px] rounded-full" />
                <SkeletonBlock className="h-[38px] w-10 rounded-full" />
                <SkeletonBlock className="h-[38px] w-[38px] rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </section>
      <aside className="mt-[60px] max-[900px]:mt-0">
        <SkeletonBlock className="h-24 w-full rounded-[20px]" />
        <div className="mt-5 rounded-[20px] border border-slate-200 bg-white p-3">
          <SkeletonBlock className="m-2 h-6 w-44" />
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex justify-between gap-4 border-t border-slate-100 px-2 py-4">
              <SkeletonBlock className="h-4 w-36" />
              <SkeletonBlock className="h-4 w-20" />
            </div>
          ))}
          <SkeletonBlock className="ml-auto mt-2 h-4 w-28" />
        </div>
        <SkeletonBlock className="mt-3 h-[58px] w-full rounded-[20px]" />
        <SkeletonBlock className="mt-3 h-[50px] w-full rounded-full" />
      </aside>
    </div>
  );
};

export default CartSkeleton;
