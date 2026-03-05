'use client';
import { useEffect, useRef } from 'react';

export default function ScrollReveal({
    children,
    className = '',
    animation = 'fadeUp',
    delay = 0,
    duration = 700,
    threshold = 0.15,
    once = true,
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.transitionDelay = `${delay}ms`;
                    el.classList.add('sr-visible');
                    if (once) observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [delay, threshold, once]);

    return (
        <div
            ref={ref}
            className={`sr sr-${animation} ${className}`}
            style={{ transitionDuration: `${duration}ms` }}
        >
            {children}
        </div>
    );
}
