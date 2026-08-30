import { useState } from "react";
import { contactData, socialLinks } from "@/config";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Mail, FileDown, MessageSquare, Copy, Check } from "lucide-react";

import cvEn from "@/assets/cv/CV_M Rivan Sahronie.pdf";
import cvId from "@/assets/cv/CV_Muhamad Rivan Sahronie.pdf";

export const ContactSection = () => {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);

  const cvUrl = i18n.language === "en" ? cvEn : cvId;
  const cvFileName =
    i18n.language === "en"
      ? "CV_M_Rivan_Sahronie.pdf"
      : "CV_Muhamad_Rivan_Sahronie.pdf";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center text-center py-8 sm:py-12 md:py-16 w-full">
      <div className="max-w-2xl w-full space-y-8 flex flex-col items-center">
        {/* Section Header (Centered) */}
        <div className="space-y-3 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-caption text-(--color-muted) font-mono">
            <MessageSquare className="w-3.5 h-3.5 text-(--color-fg)" aria-hidden="true" />
            <span>{t("contact.label", "KONTAK")}</span>
          </div>

          <h2 className="text-display font-bold text-(--color-fg) leading-tight">
            {t("contact.heading_line1", "Mari berdiskusi.")}
          </h2>

          <p className="text-body text-base md:text-lg text-(--color-muted) max-w-lg">
            {t("contact.available", "Terbuka untuk posisi full-time dan proyek kolaborasi.")}
          </p>
        </div>

        {/* Minimalist Email Pill Card (Centered) */}
        <div className="w-full p-6 sm:p-8 rounded-2xl border border-(--color-border) bg-(--color-surface) space-y-6 flex flex-col items-center shadow-xs">
          <span className="text-xs font-mono text-(--color-muted) uppercase tracking-wider">
            Direct Email Address
          </span>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${contactData.email}`}
              className="text-lg sm:text-2xl font-mono font-bold text-(--color-fg) hover:underline transition-all"
            >
              {contactData.email}
            </a>

            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Copy email address"
              title="Copy email"
            >
              {copied ? (
                <Check className="w-4 h-4 text-(--color-fg)" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Action CTAs Centered */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`mailto:${contactData.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-(--color-fg) text-(--color-bg) font-semibold text-xs hover:opacity-90 transition-all cursor-pointer min-h-[44px] shadow-xs"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{t("contact.email_cta", "Kirim Email")}</span>
            </a>

            <a
              href={cvUrl}
              download={cvFileName}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-(--color-surface-raised) text-(--color-fg) font-semibold text-xs border border-(--color-border) hover:bg-(--color-surface) transition-colors cursor-pointer min-h-[44px]"
            >
              <FileDown className="w-4 h-4 text-(--color-fg)" aria-hidden="true" />
              <span>{t("contact.cv_cta", "Unduh CV")} ({i18n.language.toUpperCase()})</span>
            </a>
          </div>
        </div>

        {/* Social Links Row Centered */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-(--color-muted) hover:text-(--color-fg) transition-colors py-2 px-2 cursor-pointer min-h-[44px]"
              aria-label={link.label}
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-(--color-fg)" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
