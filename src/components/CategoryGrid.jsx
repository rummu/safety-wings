'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import styles from './CategoryGrid.module.css';

const categoryImages = [
    '/images/hero-equipment.jpeg',
    '/images/safety-gloves.jpeg',
    '/images/respiratory-masks.jpeg',
    '/images/protective-coveralls.jpeg',
    '/images/hero-equipment.jpeg',
    '/images/respiratory-masks.jpeg',
];

const categoryIcons = ['🛡️', '🧤', '😷', '👔', '⚠️', '🔥'];

export default function CategoryGrid() {
    const { t } = useLanguage();
    const items = t.categories.items;

    return (
        <section className={`section ${styles.categories}`} id="categories">
            <div className="container">
                <ScrollReveal animation="fadeUp">
                    <h2 className="section-title">{t.categories.sectionTitle}</h2>
                </ScrollReveal>
                <ScrollReveal animation="fadeUp" delay={100}>
                    <p className="section-subtitle">
                        {t.categories.sectionSubtitle}
                    </p>
                </ScrollReveal>
                <div className={styles.grid}>
                    {items.map((cat, i) => (
                        <ScrollReveal key={i} animation="scaleUp" delay={i * 120}>
                            <Link href="/products" style={{ textDecoration: 'none' }}>
                                <div className={styles.card}>
                                    <div className={styles.cardImage}>
                                        <img src={categoryImages[i]} alt={cat.title} />
                                        <div className={styles.cardOverlay}>
                                            <span className={styles.cardOverlayText}>{cat.overlay}</span>
                                        </div>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div className={styles.cardIcon}>{categoryIcons[i]}</div>
                                        <h3 className={styles.cardTitle}>{cat.title}</h3>
                                        <p className={styles.cardDesc}>{cat.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
