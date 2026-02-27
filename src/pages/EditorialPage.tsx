import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme, useLanguage } from "@/hooks";
import {
  ProjectsOverlay,
  ExperienceOverlay,
  EducationOverlay,
} from "@/overlays";
import {
  containerVariants,
  fadeUpVariants,
  fadeVariants,
  EASE_CURVE,
  overlayNavItems,
  type OverlayType,
} from "@/config";

// Custom hook to display current time in Jakarta timezone
function useJakartaTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

const EditorialPage = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const time = useJakartaTime();

  const isOverlayOpen = activeOverlay !== null;

  return (
    <>
      {/* Main Canvas */}
      <div
        className={`fixed inset-0 bg-(--color-bg) text-(--color-fg) overflow-hidden transition-all duration-500 ${
          isOverlayOpen ? "scale-[0.98] opacity-30 blur-sm" : ""
        }`}
      >
        {/* Decorative vertical line */}
        <motion.div
          className="absolute left-[23%] top-[12%] w-px bg-(--color-border) opacity-[0.15]"
          style={{ height: "38%" }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2.5, ease: EASE_CURVE, delay: 0.8 }}
        />

        {/* Subtle breathing animation element */}
        <motion.div
          className="absolute right-[15%] bottom-[25%] w-px h-12 bg-(--color-border)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: shouldReduceMotion ? 0.1 : [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="h-full w-full relative z-10 px-6 py-6 md:px-12 md:py-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.header
            className="flex items-center justify-between"
            variants={fadeVariants}
          >
            <span className="text-caption text-(--color-muted)">RIVAN.ME</span>

            <div className="flex items-center gap-6">
              <button
                onClick={toggleLanguage}
                className="text-caption text-(--color-subtle) hover:text-(--color-fg) transition-colors cursor-pointer"
                aria-label={`Switch to ${
                  i18n.language === "en" ? "Indonesian" : "English"
                }`}
              >
                {i18n.language === "en" ? "ID" : "EN"}
              </button>
              <button
                onClick={toggleTheme}
                className="text-caption text-(--color-subtle) hover:text-(--color-fg) transition-colors cursor-pointer"
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
              >
                {theme === "light" ? "DARK" : "LIGHT"}
              </button>
            </div>
          </motion.header>

          {/* Main Content */}
          <div className="absolute left-6 md:left-[8%] top-[32%] md:top-[34%]">
            {/* Name */}
            <motion.div className="overflow-hidden" variants={fadeUpVariants}>
              <h1 className="text-display font-extrabold tracking-tight">
                RIVAN
              </h1>
            </motion.div>

            {/* Full Name */}
            <motion.p
              className="text-label text-(--color-muted) mt-5 ml-0.5"
              variants={fadeVariants}
            >
              Muhamad Rivan Sahronie
            </motion.p>

            {/* Statement */}
            <motion.p
              className="text-body text-(--color-muted) max-w-68 mt-7 leading-relaxed"
              variants={fadeVariants}
            >
              {t("editorial.statement")}
            </motion.p>

            {/* Contact CTA */}
            <motion.a
              href="mailto:rivansahronie@gmail.com"
              className="inline-flex items-center gap-2 mt-9 text-label text-(--color-fg) hover:text-(--color-muted) transition-colors group"
              variants={fadeVariants}
              whileHover={{ x: 4 }}
            >
              <span>{t("editorial.contact")}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </div>

          {/* Navigation */}
          <motion.nav
            className="absolute right-6 md:right-12 top-[55%] -translate-y-1/2 flex flex-col items-end gap-5"
            variants={fadeVariants}
          >
            {overlayNavItems.map((item, idx) => (
              <motion.button
                key={item.key}
                onClick={() => setActiveOverlay(item.key)}
                className="text-label text-(--color-subtle) hover:text-(--color-fg) transition-colors cursor-pointer text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.6 + idx * 0.1,
                  duration: 0.5,
                }}
                whileHover={{ x: -4 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.nav>

          {/* Footer */}
          <motion.footer
            className="absolute bottom-6 md:bottom-10 left-6 md:left-12 right-6 md:right-12 flex items-end justify-between"
            variants={fadeVariants}
          >
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/rrivnsh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-subtle) hover:text-(--color-fg) transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com/in/muhamadrivansahronie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-subtle) hover:text-(--color-fg) transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>

            {/* Availability Status */}
            <span className="text-caption text-(--color-subtle) hidden md:block">
              {t("editorial.available")}
            </span>

            {/* Location & Time */}
            <div className="text-right">
              <span className="text-caption text-(--color-subtle) block">
                Bandung, Indonesia
              </span>
              <span className="text-label tabular-nums text-(--color-muted)">
                {time}
              </span>
            </div>
          </motion.footer>
        </motion.div>
      </div>

      {/* Overlays */}
      <ProjectsOverlay
        isOpen={activeOverlay === "projects"}
        onClose={() => setActiveOverlay(null)}
      />
      <ExperienceOverlay
        isOpen={activeOverlay === "experience"}
        onClose={() => setActiveOverlay(null)}
      />
      <EducationOverlay
        isOpen={activeOverlay === "education"}
        onClose={() => setActiveOverlay(null)}
      />
    </>
  );
};

export default EditorialPage;
