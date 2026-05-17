import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollEntrance(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll('.animate-item');
    if (children.length === 0) {
      gsap.set(el, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: el,
        start: `top ${100 - threshold * 100}%`,
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          setHasAnimated(true);
        },
      });
    } else {
      gsap.set(children, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: el,
        start: `top ${100 - threshold * 100}%`,
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
          });
          setHasAnimated(true);
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [threshold]);

  return { ref, hasAnimated };
}
