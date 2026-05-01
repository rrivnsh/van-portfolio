import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-6 py-2">
      <span className="text-[0.65rem] md:text-caption tracking-widest text-(--color-subtle) font-bold">
        PAGE {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
      </span>
      <div className="flex gap-8">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="text-[0.65rem] md:text-caption tracking-[0.25em] font-bold disabled:opacity-20 hover:text-(--color-fg) transition-colors cursor-pointer disabled:cursor-default"
        >
          PREV
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="text-[0.65rem] md:text-caption tracking-[0.25em] font-bold disabled:opacity-20 hover:text-(--color-fg) transition-colors cursor-pointer disabled:cursor-default"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};
