'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import styles from './AboutPreview.module.css';

export default function AboutPreview() {
    const { t } = useLanguage();

    return (
        <section className={`section ${styles.about}`} id="about-preview">
            <div className="container">
                <div className={styles.wrapper}>
                    <ScrollReveal animation="fadeLeft">
                        <div className={styles.textSide}>
                            <div className={styles.label}>
                                <span className={styles.labelDot} />
                                {t.aboutPreview.label}
                            </div>
                            <h2 className={styles.title}>
                                {t.aboutPreview.title}{' '}
                                <span className={styles.titleAccent}>{t.aboutPreview.titleAccent}</span> {t.aboutPreview.titleSuffix}
                            </h2>
                            <p className={styles.description}>
                                {t.aboutPreview.desc1}
                            </p>
                            <p className={styles.description}>
                                {t.aboutPreview.desc2}
                            </p>
                            <div className={styles.features}>
                                {t.aboutPreview.features.map((text, i) => (
                                    <div key={i} className={styles.feature}>
                                        <span className={styles.featureIcon}>✓</span>
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/about" className="btn btn-primary">
                                {t.aboutPreview.readMore}
                            </Link>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal animation="fadeRight" delay={200}>
                        <div className={styles.imageSide}>
                            <div className={styles.imageMain}>
                                <img src="/images/hero-equipment.jpeg" alt="Safety Wings Equipment" />
                            </div>
                            <div className={styles.imageAccent}>
                                <span className={styles.accentNumber}>10+</span>
                                <span className={styles.accentLabel}>{t.aboutPreview.yearsExp}</span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
