'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './services.module.css';

const serviceIcons = ['🛡️', '📋', '🎓', '🔧', '📦', '🚚'];
const serviceLinks = ['/products', '/contact', '/contact', '/contact', '/contact', '/contact'];
const whyUsIcons = ['⭐', '⚡', '💎', '🤝'];

export default function ServicesPage() {
    const { t } = useLanguage();

    return (
        <div className={styles.servicesPage}>
            {/* Banner */}
            <div className="page-banner">
                <div className="container">
                    <h1>{t.servicesPage.title}</h1>
                    <div className="breadcrumb">
                        <Link href="/">{t.servicesPage.home}</Link>
                        <span>›</span>
                        <span>{t.servicesPage.breadcrumb}</span>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">{t.servicesPage.whatWeOffer}</h2>
                    <p className="section-subtitle">
                        {t.servicesPage.whatWeOfferSubtitle}
                    </p>
                    <div className={styles.servicesGrid}>
                        {t.servicesPage.services.map((service, i) => (
                            <div key={i} className={styles.serviceCard}>
                                <div className={styles.serviceIcon}>{serviceIcons[i]}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                                <Link href={serviceLinks[i]} className={styles.serviceLink}>
                                    {t.servicesPage.learnMore}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className={`section ${styles.whyUs}`}>
                <div className="container">
                    <h2 className="section-title">{t.servicesPage.whyChoose}</h2>
                    <p className="section-subtitle">
                        {t.servicesPage.whyChooseSubtitle}
                    </p>
                    <div className={styles.whyUsGrid}>
                        {t.servicesPage.whyUsItems.map((item, i) => (
                            <div key={i} className={styles.whyUsItem}>
                                <div className={styles.whyUsIcon}>{whyUsIcons[i]}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
