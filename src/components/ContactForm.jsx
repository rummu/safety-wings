'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ContactForm.module.css';

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
    const { t } = useLanguage();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: form.name,
                    phone: form.phone,
                    email: form.email,
                    message: form.message,
                    subject: `New Contact from ${form.name} — Safety Wings Website`,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                setForm({ name: '', phone: '', email: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError(t.contactForm.errorGeneric);
            }
        } catch (err) {
            setError(t.contactForm.errorNetwork);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.contactForm}>
            <h3 className={styles.formTitle}>{t.contactForm.title}</h3>
            <p className={styles.formSubtitle}>{t.contactForm.subtitle}</p>
            <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>{t.contactForm.name}</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t.contactForm.namePlaceholder}
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>{t.contactForm.phone}</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+966 XXXXXXXXX"
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>{t.contactForm.email}</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t.contactForm.emailPlaceholder}
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>{t.contactForm.message}</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder={t.contactForm.messagePlaceholder}
                        className={styles.formInput}
                        required
                    />
                </div>
                {submitted && (
                    <div className={styles.successMessage}>
                        {t.contactForm.success}
                    </div>
                )}
                {error && (
                    <div className={styles.errorMessage}>
                        ❌ {error}
                    </div>
                )}
                <div className={styles.formSubmit}>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? t.contactForm.sending : t.contactForm.send}
                    </button>
                </div>
            </form>
        </div>
    );
}
