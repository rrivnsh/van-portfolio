import { useState, useEffect, useRef, useCallback } from "react";

export interface SectionDef {
  id: string;
  label: string;
}

export const SECTIONS: SectionDef[] = [
  { id: "hero", label: "Ringkasan" },
  { id: "work", label: "Proyek" },
  { id: "journey", label: "Pengalaman" },
  { id: "capabilities", label: "Keahlian" },
  { id: "foundations", label: "Pendidikan" },
  { id: "contact", label: "Kontak" },
];

export const useSectionNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const isThrottled = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (SECTIONS.some((s) => s.id === hash)) {
        setActiveSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigateSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    window.location.hash = sectionId;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const goToNextSection = useCallback(() => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIndex < SECTIONS.length - 1) {
      handleNavigateSection(SECTIONS[currentIndex + 1].id);
    }
  }, [activeSection, handleNavigateSection]);

  const goToPrevSection = useCallback(() => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      handleNavigateSection(SECTIONS[currentIndex - 1].id);
    }
  }, [activeSection, handleNavigateSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (document.body.classList.contains("modal-open")) return;

      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight + 10;
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;
      const isAtTop = window.scrollY <= 5;

      if (isThrottled.current) return;

      if (e.deltaY > 40 && (!isScrollable || isAtBottom)) {
        isThrottled.current = true;
        goToNextSection();
        setTimeout(() => {
          isThrottled.current = false;
        }, 750);
      } else if (e.deltaY < -40 && (!isScrollable || isAtTop)) {
        isThrottled.current = true;
        goToPrevSection();
        setTimeout(() => {
          isThrottled.current = false;
        }, 750);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.body.classList.contains("modal-open")) return;
      if (e.key === "PageDown") {
        goToNextSection();
      } else if (e.key === "PageUp") {
        goToPrevSection();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || document.body.classList.contains("modal-open")) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight + 10;
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;
      const isAtTop = window.scrollY <= 5;

      if (isThrottled.current) return;

      if (diffY > 60 && (!isScrollable || isAtBottom)) {
        isThrottled.current = true;
        goToNextSection();
        setTimeout(() => {
          isThrottled.current = false;
        }, 750);
      } else if (diffY < -60 && (!isScrollable || isAtTop)) {
        isThrottled.current = true;
        goToPrevSection();
        setTimeout(() => {
          isThrottled.current = false;
        }, 750);
      }

      touchStartY.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goToNextSection, goToPrevSection]);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection =
    currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  return {
    activeSection,
    handleNavigateSection,
    goToNextSection,
    goToPrevSection,
    prevSection,
    nextSection,
    sections: SECTIONS,
  };
};
