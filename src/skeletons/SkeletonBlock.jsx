const SkeletonBlock = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse animate-shimmer rounded-xl bg-[linear-gradient(110deg,#e5e7eb_8%,#f8fafc_18%,#e5e7eb_33%)] bg-[length:200%_100%] ${className}`}
    />
  );
};

export default SkeletonBlock;
