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
    <div className="w-full flex flex-col pt-12 pb-27.5">
      {/* Intro */}
      <p className="text-xl md:text-3xl font-light text-(--color-muted) mb-24 max-w-4xl leading-relaxed">
        {introText}
      </p>

      {/* Content Area */}
      <div className={`flex flex-col ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
