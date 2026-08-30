export const BackgroundGrid = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle top ambient warmth (non-distracting) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_350px_at_50%_-60px,var(--color-accent-soft),transparent)] opacity-60" />
    </div>
  );
};
