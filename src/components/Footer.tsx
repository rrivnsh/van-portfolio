import { socialLinks } from "@/config";
import { useJakartaTime } from "@/hooks";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const time = useJakartaTime();

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex flex-col md:flex-row items-center justify-between p-6 md:px-12 md:py-8 z-50 bg-(--color-bg)/80 backdrop-blur-md gap-6">
      {/* social links */}
      <div className="flex items-center gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-subtle) hover:text-(--color-fg) transition-colors scale-90 hover:scale-110"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>

      {/* availability status */}
      <div className="hidden lg:block">
        <p className="text-[0.6rem] font-black tracking-[0.3em] uppercase text-(--color-subtle)">
          {t("editorial.available", "TERBUKA UNTUK KERJA")}
        </p>
      </div>

      {/* location and time */}
      <div className="text-center md:text-right flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <div className="flex flex-col">
           <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase text-(--color-subtle)">Location</span>
           <span className="text-[0.65rem] font-black tracking-widest text-(--color-fg)">Bandung, ID</span>
        </div>
        <div className="flex flex-col">
           <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase text-(--color-subtle)">Current Time</span>
           <span className="text-[0.65rem] font-black tracking-widest text-(--color-fg)">{time}</span>
        </div>
      </div>
    </footer>
  );
};
