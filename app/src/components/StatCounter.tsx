import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: LucideIcon;
}

export default function StatCounter({ value, suffix = '', label, icon: Icon }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const proxy = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(proxy, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setDisplayValue(Math.round(proxy.val)),
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => { if (t.trigger === el) t.kill(); });
    };
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      {Icon && (
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-bg flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      <span className="font-poppins font-extrabold text-[clamp(2rem,4vw,3rem)] gradient-text leading-none">
        {displayValue.toLocaleString()}{suffix}
      </span>
      <p className="mt-2 text-xs text-white/40 font-medium tracking-wider uppercase">{label}</p>
    </div>
  );
}
