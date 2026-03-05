'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
    const { t } = useLanguage();

    const quickLinks = [
        { label: t.nav.home, href: '/' },
        { label: t.nav.products, href: '/products' },
        { label: t.nav.aboutUs, href: '/about' },
        { label: t.nav.services, href: '/services' },
        { label: t.nav.contactUs, href: '/contact' },
    ];

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerGrid}>
                    {/* Brand */}
                    <div className={styles.footerBrand}>
                        <Link href="/" className={styles.footerLogo}>
                            <img src="/images/logo.png" alt="Safety Wings Logo" className={styles.logoIconSmall} />
                            <div className={styles.footerLogoText}>
                                <span className={styles.footerLogoName}>
                                    SAFETY <span className={styles.footerLogoNameGreen}>WINGS</span>
                                </span>
                                <span className={styles.footerLogoSub}>{t.nav.tradingEst}</span>
                            </div>
                        </Link>
                        <p className={styles.footerDesc}>
                            {t.footer.desc}
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.socialLink} aria-label="Facebook">f</a>
                            <a href="#" className={styles.socialLink} aria-label="LinkedIn">in</a>
                            <a href="#" className={styles.socialLink} aria-label="Instagram">ig</a>
                            <a href="#" className={styles.socialLink} aria-label="Twitter">𝕏</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.footerColumn}>
                        <h4>{t.footer.quickLinks}</h4>
                        <div className={styles.footerLinks}>
                            {quickLinks.map((link) => (
                                <Link key={link.label} href={link.href} className={styles.footerLink}>
                                    <span className={styles.footerLinkIcon}>›</span>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Products */}
                    <div className={styles.footerColumn}>
                        <h4>{t.footer.products}</h4>
                        <div className={styles.footerLinks}>
                            {t.footer.productLinks.map((label) => (
                                <Link key={label} href="/products" className={styles.footerLink}>
                                    <span className={styles.footerLinkIcon}>›</span>
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.footerColumn}>
                        <h4>{t.footer.contactUs}</h4>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>📍</div>
                            <div className={styles.contactText}>
                                <span className={styles.contactLabel}>{t.footer.address}</span>
                                <span className={styles.contactValue}>
                                    {t.footer.addressValue}
                                </span>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>📞</div>
                            <div className={styles.contactText}>
                                <span className={styles.contactLabel}>{t.footer.phone}</span>
                                <span className={styles.contactValue}>+966 59 253 1799</span>
                            </div>
                        </div>
                        <div className={styles.contactItem}>
                            <div className={styles.contactIcon}>✉️</div>
                            <div className={styles.contactText}>
                                <span className={styles.contactLabel}>{t.footer.email}</span>
                                <span className={styles.contactValue}>info@safetywingsksa.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.footerBottom}>
                    <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
                    <span>
                        {t.footer.designedWith} <a href="#">{t.footer.location}</a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
