import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface)/50 backdrop-blur-xs py-8 px-5 sm:px-8 md:px-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-(--color-muted)">
        {/* Copyright */}
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Muhamad Rivan Sahronie.</span>
          <span className="hidden sm:inline">Crafted with precision.</span>
        </div>

        {/* Back to Top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-xs font-semibold text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
