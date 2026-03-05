'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import styles from './CTABanner.module.css';

export default function CTABanner() {
    const { t } = useLanguage();

    return (
        <section className={styles.cta}>
            <div className={`container ${styles.wrapper}`}>
                <ScrollReveal animation="fadeLeft">
                    <div className={styles.text}>
                        <h2>{t.cta.title}</h2>
                        <p>{t.cta.desc}</p>
                    </div>
                </ScrollReveal>
                <ScrollReveal animation="fadeRight" delay={200}>
                    <div className={styles.btnGroup}>
                        <Link href="/contact" className="btn btn-white">
                            {t.cta.contactUs}
                        </Link>
                        <Link href="/products" className="btn btn-outline">
                            {t.cta.viewProducts}
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
