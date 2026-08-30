import {
  ExternalLink,
  Github,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import type { ProjectData } from "@/config/projectsData";

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}

function getSafeScales(
  naturalW: number,
  naturalH: number,
  viewW: number,
  viewH: number
) {
  const fitScale = Math.min(viewW / naturalW, viewH / naturalH) * 0.92;
  const maxScale = Math.max(fitScale, 1);
  return { fitScale, maxScale };
}

const ProjectDetailModal = ({
  isOpen,
  onClose,
  project,
}: ProjectDetailModalProps) => {
  const { t } = useTranslation();

  const [zoomState, setZoomState] = useState<{
    isOpen: boolean;
    scale: number;
    x: number;
    y: number;
  }>({ isOpen: false, scale: 1, x: 0, y: 0 });

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });

  // Scroll lock, Escape listener, Focus Management
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      closeButtonRef.current?.focus();

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (zoomState.isOpen) {
            setZoomState((prev) => ({ ...prev, isOpen: false }));
          } else {
            onClose();
          }
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.classList.remove("modal-open");
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, zoomState.isOpen, onClose]);

  const handleOpenZoom = () => {
    if (!project) return;
    const { fitScale } = getSafeScales(
      project.imageWidth,
      project.imageHeight,
      window.innerWidth,
      window.innerHeight
    );
    setZoomState({ isOpen: true, scale: fitScale, x: 0, y: 0 });
  };

  const handleCloseZoom = () =>
    setZoomState((prev) => ({ ...prev, isOpen: false }));

  // Wheel zoom
  useEffect(() => {
    if (!zoomState.isOpen || !containerRef.current || !project) return;
    const container = containerRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoomState((prev) => {
        const delta = e.deltaY < 0 ? 0.25 : -0.25;
        const { fitScale, maxScale } = getSafeScales(
          project.imageWidth,
          project.imageHeight,
          window.innerWidth,
          window.innerHeight
        );

        const MAX = Math.min(maxScale, fitScale * 3);
        const MIN = fitScale * 0.5;

        let newScale = prev.scale + delta;
        if (newScale < MIN) newScale = MIN;
        if (newScale > MAX) newScale = MAX;

        const rect = container.getBoundingClientRect();
        const cursorX = e.clientX - rect.left - rect.width / 2;
        const cursorY = e.clientY - rect.top - rect.height / 2;

        const newX =
          cursorX - (cursorX - prev.x) * (newScale / prev.scale);
        const newY =
          cursorY - (cursorY - prev.y) * (newScale / prev.scale);

        return { ...prev, scale: newScale, x: newX, y: newY };
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [zoomState.isOpen, project]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!project) return;
    const { fitScale } = getSafeScales(
      project.imageWidth,
      project.imageHeight,
      window.innerWidth,
      window.innerHeight
    );
    if (zoomState.scale <= fitScale) return;

    isPanning.current = true;
    panStart.current = {
      x: e.clientX - zoomState.x,
      y: e.clientY - zoomState.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (isPanning.current) {
      setZoomState((prev) => ({
        ...prev,
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isPanning.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const handleZoomChange = (delta: number) => {
    if (!project) return;
    setZoomState((prev) => {
      const { fitScale, maxScale } = getSafeScales(
        project.imageWidth,
        project.imageHeight,
        window.innerWidth,
        window.innerHeight
      );
      const MAX = Math.min(maxScale, fitScale * 3);
      const MIN = fitScale * 0.5;

      let newScale = prev.scale + delta;
      if (newScale < MIN) newScale = MIN;
      if (newScale > MAX) newScale = MAX;

      const newX = prev.x * (newScale / prev.scale);
      const newY = prev.y * (newScale / prev.scale);
      return { ...prev, scale: newScale, x: newX, y: newY };
    });
  };

  const handleZoomReset = () => {
    if (!project) return;
    const { fitScale } = getSafeScales(
      project.imageWidth,
      project.imageHeight,
      window.innerWidth,
      window.innerHeight
    );
    setZoomState((prev) => ({ ...prev, scale: fitScale, x: 0, y: 0 }));
  };

  if (!isOpen || !project) return null;

  const contributionText = project.contribution
    ? t(project.contribution)
    : "";

  return createPortal(
    <div className="relative z-[9999]">
      {/* Fullscreen Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999]"
        onClick={onClose}
      />

      {/* Modal Viewport Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-none"
      >
        <div
          className="relative bg-(--color-surface) text-(--color-fg) w-full max-w-3xl max-h-[88vh] overflow-y-auto pointer-events-auto rounded-3xl shadow-2xl border border-(--color-border)"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-(--color-border) bg-(--color-surface)/95 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-xs font-mono text-(--color-muted)">
              <span className="text-(--color-fg) font-semibold uppercase">{project.category}</span>
              <span className="opacity-40">/</span>
              <span>{project.year || "2024"}</span>
            </div>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 rounded-xl border border-(--color-border) bg-(--color-surface-raised) hover:bg-(--color-surface) text-(--color-fg) transition-colors cursor-pointer focus-visible:outline-2 min-h-[38px] min-w-[38px] flex items-center justify-center"
              aria-label={t("project_detail.close")}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Title & Role Info */}
            <div className="space-y-1.5">
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-(--color-fg)"
              >
                {project.title}
              </h2>
              {project.role && (
                <p className="text-xs font-mono text-(--color-muted)">
                  <span>Role: </span>
                  <strong className="text-(--color-fg) font-semibold">{project.role}</strong>
                </p>
              )}
            </div>

            {/* Static Clean Image Preview Frame */}
            <div className="w-full rounded-2xl border border-(--color-border) bg-(--color-surface-raised) overflow-hidden relative flex items-center justify-center p-4 sm:p-6 min-h-[200px] max-h-[45vh]">
              <img
                src={project.image}
                alt={project.title}
                width={project.imageWidth}
                height={project.imageHeight}
                className="w-full h-auto max-h-[45vh] object-contain"
              />
              <button
                onClick={handleOpenZoom}
                className="absolute bottom-3 right-3 bg-black/80 hover:bg-black text-white text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom</span>
              </button>
            </div>

            {/* Case Study Content */}
            <div className="space-y-6">
              {/* Overview */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-(--color-muted) block">
                  {t("project_detail.overview", "Overview")}
                </span>
                <p className="text-body text-sm sm:text-base leading-relaxed text-(--color-muted)">
                  {t(project.fullDesc)}
                </p>
              </div>

              {/* Key Contributions */}
              {contributionText && contributionText.trim() !== "" && (
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-(--color-muted) block">
                    {t("project_detail.contribution", "Key Contributions")}
                  </span>
                  <p className="text-body text-sm sm:text-base leading-relaxed text-(--color-muted)">
                    {contributionText}
                  </p>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-(--color-muted) block">
                  {t("project_detail.technologies", "Technologies")}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-(--color-fg) bg-(--color-surface-raised) px-2.5 py-1 rounded-lg border border-(--color-border)"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-(--color-border) flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-(--color-fg) text-(--color-bg) text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity min-h-[44px]"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-(--color-surface-raised) text-(--color-fg) border border-(--color-border) text-xs font-semibold rounded-xl hover:bg-(--color-surface) transition-colors min-h-[44px]"
                  >
                    <span>Source Code</span>
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-(--color-border) text-xs font-medium text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-surface-raised) transition-colors cursor-pointer min-h-[44px]"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Overlay */}
      {zoomState.isOpen && (
        <div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("project_detail.zoom", "Zoom Image")}
          className="fixed inset-0 bg-black/95 z-[10010] flex items-center justify-center overflow-hidden touch-none"
          onClick={(e) => {
            if (e.target === containerRef.current) {
              handleCloseZoom();
            }
          }}
        >
          {/* Close Zoom */}
          <button
            onClick={handleCloseZoom}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-[10020] cursor-pointer transition-colors focus-visible:outline-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={t("project_detail.close_zoom", "Close zoom")}
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Zoomable Image */}
          <div className="relative flex items-center justify-center w-full h-full">
            <img
              src={project.image}
              alt={project.title}
              width={project.imageWidth}
              height={project.imageHeight}
              className="max-w-none origin-center cursor-grab active:cursor-grabbing select-none pointer-events-auto"
              style={{
                transform: `translate(${zoomState.x}px, ${zoomState.y}px) scale(${zoomState.scale})`,
              }}
              draggable={false}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          </div>

          {/* Zoom Controls Toolbar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 text-white px-4 py-2 rounded-lg z-[10020] pointer-events-auto shadow-xl backdrop-blur-sm">
            <button
              onClick={() => handleZoomChange(-0.25)}
              className="p-1.5 hover:bg-white/20 rounded transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label={t("project_detail.zoom_out", "Zoom out")}
            >
              <Minus className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="text-xs font-mono w-16 text-center font-medium">
              {Math.round(zoomState.scale * 100)}%
            </span>
            <button
              onClick={() => handleZoomChange(0.25)}
              className="p-1.5 hover:bg-white/20 rounded transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label={t("project_detail.zoom_in", "Zoom in")}
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="w-px h-4 bg-white/30 mx-1" aria-hidden="true" />
            <button
              onClick={handleZoomReset}
              className="p-1.5 hover:bg-white/20 rounded transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label={t("project_detail.reset", "Reset")}
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export { ProjectDetailModal };
