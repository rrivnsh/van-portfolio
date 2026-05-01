import React from "react";

interface SectionLayoutProps {
  introText: string;
  children: React.ReactNode;
  contentClassName?: string;
}

export const SectionLayout: React.FC<SectionLayoutProps> = ({
  introText,
  children,
  contentClassName = "",
}) => {
  return (
    <div className="w-full flex flex-col h-full">
      {/* Intro */}
      <p className="text-body text-(--color-muted) mb-8 md:mb-12">
        {introText}
      </p>

      {/* Content Area */}
      <div className={`flex flex-col border-t border-(--color-border)/20 mt-8 min-h-[400px] ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
