'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './HeroSlider.module.css';

const slideImages = [
    '/images/hero-equipment.jpeg',
    '/images/safety-gloves.jpeg',
    '/images/respiratory-masks.jpeg',
    '/images/protective-coveralls.jpeg',
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const { t } = useLanguage();
    const slides = t.hero.slides;

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className={styles.hero} id="hero">
            {slides.map((slide, i) => (
                <div key={i} className={`${styles.slide} ${i === current ? styles.active : ''}`}>
                    <img src={slideImages[i]} alt={slide.titleAccent} className={styles.slideImage} />
                    <div className={styles.slideOverlay} />
                    <div className={styles.slideContent}>
                        <span className={styles.heroTagline}>{slide.tagline}</span>
                        <h1 className={styles.heroTitle}>
                            {slide.title}{' '}
                            <span className={styles.heroTitleAccent}>{slide.titleAccent}</span>
                        </h1>
                        <p className={styles.heroDesc}>{slide.desc}</p>
                        <div className={styles.heroBtns}>
                            <Link href="/products" className="btn btn-primary">
                                {t.hero.exploreProducts}
                            </Link>
                            <Link href="/contact" className="btn btn-outline">
                                {t.hero.getQuote}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className={styles.dots}>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.dot} ${i === current ? styles.active : ''}`}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.scrollMouse} />
                <span>{t.hero.scroll}</span>
            </div>
        </section>
    );
}
