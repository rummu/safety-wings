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
                            <div className={styles.actionButtons}>
                                <Link href="/about" className="btn btn-primary">
                                    {t.aboutPreview.readMore}
                                </Link>
                                <a
                                    href="/Safety-Wings-Brochure.pdf"
                                    download="Safety_Wings_Brochure.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    {t.aboutPreview.downloadBrochure}
                                </a>
                            </div>
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
