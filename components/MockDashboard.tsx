export function MockDashboard() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-brand-900 p-6 text-white shadow-soft"
      aria-label="Illustrative control room dashboard placeholder"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-sm font-semibold">Live monitoring</span>
        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-300">Online</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-white/5 p-3">
            <div className="h-2 w-12 rounded bg-white/20" />
            <div className="mt-3 h-16 rounded bg-white/10" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <div className="h-24 flex-1 rounded-lg bg-white/10" />
        <div className="h-24 w-1/3 rounded-lg bg-accent-amber/30" />
      </div>
      <p className="mt-4 text-center text-xs text-white/50">Placeholder visual — replace with product screenshots.</p>
    </div>
  );
}
