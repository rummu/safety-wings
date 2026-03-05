'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.products, href: '/products' },
    { label: t.nav.aboutUs, href: '/about' },
    { label: t.nav.services, href: '/services' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            <img src="/images/logo.png" alt="Safety Wings Logo" className={styles.logoIcon} />
            <div className={styles.logoText}>
              <span className={styles.logoName}>
                SAFETY <span className={styles.logoNameGreen}>WINGS</span>
              </span>
              <span className={styles.logoSub}>{t.nav.tradingEst}</span>
            </div>
          </Link>

          <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`${styles.navLink} ${styles.navCta} ${pathname === '/contact' ? styles.active : ''}`}
            >
              {t.nav.contactUs}
            </Link>
            <button
              className={styles.langToggle}
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
          </div>

          <div className={styles.navActions}>
            <button
              className={styles.langToggleMobile}
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <button
              className={`${styles.mobileToggle} ${isOpen ? styles.open : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span className={styles.toggleBar}></span>
              <span className={styles.toggleBar}></span>
              <span className={styles.toggleBar}></span>
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}
