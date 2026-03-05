'use client';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import styles from './BrandsSection.module.css';

const brands = [
    { name: '3M', initial: '3M', color: '#E4002B' },
    { name: 'Honeywell', initial: 'H', color: '#E1251B' },
    { name: 'Safety Wings', initial: 'SW', color: '#1B5E20' },
    { name: 'Road-Mate', initial: 'RM', color: '#FF6F00' },
    { name: 'Vaultex', initial: 'V', color: '#1565C0' },
    { name: 'Pro-Guard', initial: 'PG', color: '#6A1B9A' },
    { name: 'Pak Safety', initial: 'PS', color: '#00897B' },
];

export default function BrandsSection() {
    const { t } = useLanguage();

    // Duplicate brands array for seamless infinite scroll
    const doubledBrands = [...brands, ...brands];

    return (
        <section className={styles.brands} id="brands">
            <div className="container">
                <ScrollReveal animation="fadeUp">
                    <h2 className="section-title">{t.brands.sectionTitle}</h2>
                </ScrollReveal>
                <ScrollReveal animation="fadeUp" delay={100}>
                    <p className="section-subtitle">
                        {t.brands.sectionSubtitle}
                    </p>
                </ScrollReveal>
            </div>
            <div className={styles.marqueeWrapper}>
                <div className={styles.marqueeTrack}>
                    {doubledBrands.map((brand, i) => (
                        <div key={i} className={styles.card}>
                            <div
                                className={styles.icon}
                                style={{ background: `${brand.color}18`, color: brand.color }}
                            >
                                <span className={styles.initial}>{brand.initial}</span>
                            </div>
                            <span className={styles.name}>{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
