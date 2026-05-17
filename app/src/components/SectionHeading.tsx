import type { ReactNode } from 'react';

interface SectionHeadingProps {
  label?: string;
  heading: ReactNode;
  description?: string;
  light?: boolean;
  align?: 'center' | 'left';
}

export default function SectionHeading({ label, heading, description, light = true, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} max-w-[600px] ${align === 'center' ? 'mx-auto' : ''}`}>
      {label && (
        <p className={`text-xs font-semibold uppercase tracking-[0.15em] mb-3 ${light ? 'text-[#e91e63]' : 'text-[#e91e63]'}`}>
          {label}
        </p>
      )}
      <h2 className={`font-poppins font-bold leading-tight text-white text-[clamp(1.75rem,3.5vw,3rem)]`}>
        {heading}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed text-white/40`}>
          {description}
        </p>
      )}
    </div>
  );
}
