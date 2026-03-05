'use client';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/context/LanguageContext';
import styles from './contact.module.css';

export default function ContactPage() {
    const { t } = useLanguage();

    const dayKeys = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    return (
        <div className={styles.contactPage}>
            {/* Banner */}
            <div className="page-banner">
                <div className="container">
                    <h1>{t.contactPage.title}</h1>
                    <div className="breadcrumb">
                        <Link href="/">{t.contactPage.home}</Link>
                        <span>›</span>
                        <span>{t.contactPage.title}</span>
                    </div>
                </div>
            </div>

            {/* Contact Layout */}
            <section className="section">
                <div className="container">
                    <div className={styles.contactLayout}>
                        {/* Info Side */}
                        <div className={styles.contactInfo}>
                            <div className={styles.infoCard}>
                                <h3>{t.contactPage.getInTouch}</h3>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>📍</div>
                                    <div className={styles.infoText}>
                                        <h4>{t.contactPage.companyAddress}</h4>
                                        <p>
                                            N0 6717, Cross 5, Prince Nasser Street,<br />
                                            Al Khobar, SH 34426,<br />
                                            Kingdom of Saudi Arabia
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>📞</div>
                                    <div className={styles.infoText}>
                                        <h4>{t.contactPage.phoneNumber}</h4>
                                        <p>+966 59 253 1799</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>✉️</div>
                                    <div className={styles.infoText}>
                                        <h4>{t.contactPage.emailAddress}</h4>
                                        <p>info@safetywingsksa.com</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIcon}>🌐</div>
                                    <div className={styles.infoText}>
                                        <h4>{t.contactPage.website}</h4>
                                        <p>www.safetywingsksa.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className={styles.hoursCard}>
                                <h3>{t.contactPage.officeHours}</h3>
                                <table className={styles.hoursTable}>
                                    <tbody>
                                        {dayKeys.map((dayKey) => (
                                            <tr key={dayKey}>
                                                <td className={styles.hoursDay}>{t.contactPage.days[dayKey]}</td>
                                                <td className={dayKey === 'friday' ? styles.hoursClosed : styles.hoursTime}>
                                                    {dayKey === 'friday' ? t.contactPage.closed : t.contactPage.workingHours}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Form Side */}
                        <ContactForm />
                    </div>

                    {/* Map */}
                    <div className={styles.mapSection}>
                        <h2 className="section-title">{t.contactPage.findUs}</h2>
                        <div className={styles.mapWrapper}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.9!2d50.1967!3d26.2784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDE2JzQyLjIiTiA1MMKwMTEnNDguMSJF!5e0!3m2!1sen!2ssa!4v1700000000000"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Safety Wings Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
