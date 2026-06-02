import SkeletonBlock from "./SkeletonBlock";

const TableSkeleton = ({ rows = 8, columns = 4, cards = false }) => {
  if (cards) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="rounded-2xl bg-white p-5 shadow-md">
            <SkeletonBlock className="h-12 w-12 rounded-full" />
            <SkeletonBlock className="mt-4 h-5 w-4/5" />
            <SkeletonBlock className="mt-3 h-4 w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="grid gap-4 bg-slate-100 p-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonBlock key={index} className="h-4 w-3/4" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4 border-t border-slate-100 p-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <SkeletonBlock key={columnIndex} className={columnIndex === 0 ? "h-5 w-5/6" : "h-9 w-24 rounded-lg"} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
