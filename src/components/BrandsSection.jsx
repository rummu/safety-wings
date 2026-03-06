'use client';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import styles from './BrandsSection.module.css';

import Image from 'next/image';

const brands = [
    { name: '3M', logo: '/company logo/3M.jpeg', initial: '3M', color: '#E4002B' },
    { name: 'Honeywell', logo: '/company logo/Honeywell.jpeg', initial: 'H', color: '#E1251B' },
    { name: 'Road-Mate', logo: null, initial: 'RM', color: '#FF6F00' },
    { name: 'Vaultex', logo: '/company logo/Vaultex.jpeg', initial: 'V', color: '#1565C0' },
    { name: 'Pro-Guard', logo: '/company logo/PROGUARD.jpeg', initial: 'PG', color: '#6A1B9A' },
    { name: 'Pak Safety', logo: '/company logo/PAK SAFETY.jpeg', initial: 'PS', color: '#00897B' },
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
                                style={!brand.logo ? { background: `${brand.color}18`, color: brand.color } : { background: 'transparent' }}
                            >
                                {brand.logo ? (
                                    <div className={styles.logoWrapper}>
                                        <Image src={brand.logo} alt={brand.name} width={80} height={80} className={styles.brandImage} />
                                    </div>
                                ) : (
                                    <span className={styles.initial}>{brand.initial}</span>
                                )}
                            </div>
                            <span className={styles.name}>{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
