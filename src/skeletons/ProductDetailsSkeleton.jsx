import SkeletonBlock from "./SkeletonBlock";

const ProductDetailsSkeleton = () => {
  return (
    <main className="mx-auto my-8 w-[min(1240px,calc(100%_-_32px))] rounded-3xl bg-slate-100/60 p-5 max-[520px]:my-5 max-[520px]:w-[min(100%_-_20px,1240px)] max-[520px]:p-2.5">
      <div className="grid grid-cols-[minmax(320px,0.92fr)_minmax(360px,1.08fr)] gap-5 max-[820px]:grid-cols-1">
        <section className="rounded-[20px] bg-white p-[clamp(16px,4vw,48px)]">
          <SkeletonBlock className="mx-auto mb-6 aspect-[1/0.9] w-full max-w-[500px] rounded-2xl" />
          <div className="mx-auto grid max-w-[500px] grid-cols-2 gap-3.5 max-[520px]:grid-cols-1">
            <SkeletonBlock className="h-[50px] rounded-full" />
            <SkeletonBlock className="h-[50px] rounded-full" />
          </div>
        </section>
        <section className="rounded-[20px] bg-white px-[clamp(18px,4vw,50px)] py-[clamp(24px,5vw,60px)]">
          <SkeletonBlock className="h-9 w-4/5" />
          <SkeletonBlock className="mt-4 h-5 w-full" />
          <SkeletonBlock className="mt-2 h-5 w-3/4" />
          <SkeletonBlock className="mt-8 h-5 w-36" />
          <div className="mt-5 flex items-center gap-3">
            <SkeletonBlock className="h-10 w-36" />
            <SkeletonBlock className="h-8 w-20 rounded-full" />
          </div>
          <SkeletonBlock className="mt-4 h-4 w-64 max-w-full" />
          <SkeletonBlock className="my-5 h-px w-full rounded-none" />
          <SkeletonBlock className="h-7 w-28" />
          <SkeletonBlock className="mt-3 h-12 w-full rounded-[18px]" />
          <SkeletonBlock className="mt-4 h-11 w-20 rounded-full" />
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsSkeleton;
