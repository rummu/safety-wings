'use client';
import { useLanguage } from '@/context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import styles from './ClientsSection.module.css';

import Image from 'next/image';

const clients = [
    { name: 'Saudi Aramco', logo: '/clients logo/saudi aramco.jpeg', initial: 'SA', color: '#006B3F' },
    { name: 'Tamimi Global Co', logo: '/clients logo/Tamimi Global.jpeg', initial: 'TG', color: '#1A237E' },
    { name: 'Zamil', logo: '/clients logo/zamil steel.jpeg', initial: 'Z', color: '#B71C1C' },
    { name: 'Nesma', logo: '/clients logo/nesma.jpeg', initial: 'N', color: '#E65100' },
    { name: 'Nucera Arabia', logo: '/clients logo/nucera.jpeg', initial: 'NA', color: '#0D47A1' },
    { name: 'ETS Co', logo: '/clients logo/ETS.jpeg', initial: 'ET', color: '#4A148C' },
];

export default function ClientsSection() {
    const { t } = useLanguage();

    // Duplicate clients array for seamless infinite scroll
    const doubledClients = [...clients, ...clients];

    return (
        <section className={styles.clients} id="clients">
            <div className="container">
                <ScrollReveal animation="fadeUp">
                    <h2 className="section-title">{t.clients.sectionTitle}</h2>
                </ScrollReveal>
                <ScrollReveal animation="fadeUp" delay={100}>
                    <p className="section-subtitle">
                        {t.clients.sectionSubtitle}
                    </p>
                </ScrollReveal>
            </div>
            <div className={styles.marqueeWrapper}>
                <div className={styles.marqueeTrack}>
                    {doubledClients.map((client, i) => (
                        <div key={i} className={styles.card}>
                            <div
                                className={styles.icon}
                                style={!client.logo ? { background: `${client.color}15`, color: client.color } : { background: 'transparent' }}
                            >
                                {client.logo ? (
                                    <div className={styles.logoWrapper}>
                                        <Image src={client.logo} alt={client.name} width={80} height={80} className={styles.clientImage} />
                                    </div>
                                ) : (
                                    <span className={styles.initial}>{client.initial}</span>
                                )}
                            </div>
                            <span className={styles.name}>{client.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
