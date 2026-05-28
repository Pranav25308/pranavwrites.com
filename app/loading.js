export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-purple-200 dark:border-slate-700" />
          <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-purple-600 border-r-cyan-500 animate-spin" />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}
