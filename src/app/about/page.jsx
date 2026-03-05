'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './about.module.css';

const brands = ['3M', 'MSA', 'Honeywell', 'JSP', 'Salisbury', 'Vaultex', 'Karam', 'DuPont'];

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className={styles.aboutPage}>
            {/* Banner */}
            <div className="page-banner">
                <div className="container">
                    <h1>{t.aboutPage.title}</h1>
                    <div className="breadcrumb">
                        <Link href="/">{t.aboutPage.home}</Link>
                        <span>›</span>
                        <span>{t.aboutPage.title}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="section">
                <div className="container">
                    <div className={styles.aboutContent}>
                        <h2>{t.aboutPage.ourStory}</h2>
                        <p>{t.aboutPage.story1}</p>
                        <p>{t.aboutPage.story2}</p>
                        <p>{t.aboutPage.story3}</p>

                        {/* Mission & Vision */}
                        <div className={styles.missionVision}>
                            <div className={styles.mvCard}>
                                <div className={styles.mvIcon}>🎯</div>
                                <h3>{t.aboutPage.ourMission}</h3>
                                <p>{t.aboutPage.missionDesc}</p>
                            </div>
                            <div className={styles.mvCard}>
                                <div className={styles.mvIcon}>👁️</div>
                                <h3>{t.aboutPage.ourVision}</h3>
                                <p>{t.aboutPage.visionDesc}</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className={styles.stats}>
                            {t.aboutPage.stats.map((stat, i) => (
                                <div key={i} className={styles.statItem}>
                                    <div className={styles.statNumber}>{stat.number}</div>
                                    <div className={styles.statLabel}>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Brands */}
                        <div className={styles.brands}>
                            <h2>{t.aboutPage.trustedBrands}</h2>
                            <div className={styles.brandGrid}>
                                {brands.map((brand) => (
                                    <div key={brand} className={styles.brandItem}>
                                        {brand}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
