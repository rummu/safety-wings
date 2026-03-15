'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import styles from './HeroSlider.module.css';

const defaultImages = [
    '/images/hero-equipment.jpeg',
    '/images/safety-gloves.jpeg',
    '/images/respiratory-masks.jpeg',
    '/images/protective-coveralls.jpeg',
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [sliderImages, setSliderImages] = useState(defaultImages);
    const { t } = useLanguage();

    // Safety check: ensure slides exist in translations
    const translatedSlides = t?.hero?.slides || [];

    useEffect(() => {
        const fetchImages = async () => {
            const { data, error } = await supabase
                .from('hero_images')
                .select('image_url')
                .order('display_order', { ascending: true });

            if (!error && data && data.length > 0) {
                setSliderImages(data.map(img => img.image_url));
            }
        };

        fetchImages();
    }, []);

    const next = useCallback(() => {
        // Use sliderImages length instead of translated slides to determine rotation
        setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, [sliderImages.length]);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className={styles.hero} id="hero">
            {sliderImages.map((imageUrl, i) => {
                // Determine text to show based on translation data, falling back to empty strings 
                // if we have more images than translated slides
                const slideText = translatedSlides[i] || {
                    title: 'Safety First',
                    titleAccent: 'Solutions',
                    tagline: 'Premium Equipment',
                    desc: 'Quality safety gear for all conditions'
                };

                return (
                    <div key={i} className={`${styles.slide} ${i === current ? styles.active : ''}`}>
                        <img src={imageUrl} alt={slideText.titleAccent} className={styles.slideImage} />
                        <div className={styles.slideOverlay} />
                        <div className={styles.slideContent}>
                            <span className={styles.heroTagline}>{slideText.tagline}</span>
                            <h1 className={styles.heroTitle}>
                                {slideText.title}{' '}
                                <span className={styles.heroTitleAccent}>{slideText.titleAccent}</span>
                            </h1>
                            <p className={styles.heroDesc}>{slideText.desc}</p>
                            <div className={styles.heroBtns}>
                                <Link href="/products" className="btn btn-primary">
                                    {t?.hero?.exploreProducts || 'Explore Products'}
                                </Link>
                                <Link href="/contact" className="btn btn-outline">
                                    {t?.hero?.getQuote || 'Get Quote'}
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}

            <div className={styles.dots}>
                {sliderImages.map((_, i) => (
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
