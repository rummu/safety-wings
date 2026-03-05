'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './products.module.css';

const productImages = [
    '/images/hero-equipment.jpeg',
    '/images/safety-gloves.jpeg',
    '/images/respiratory-masks.jpeg',
    '/images/protective-coveralls.jpeg',
    '/images/respiratory-masks.jpeg',
    '/images/protective-coveralls.jpeg',
    '/images/hero-equipment.jpeg',
    '/images/respiratory-masks.jpeg',
    '/images/safety-gloves.jpeg',
    '/images/hero-equipment.jpeg',
    '/images/hero-equipment.jpeg',
    '/images/hero-equipment.jpeg',
];

const productCategoryKeys = [
    'Personal Protective Equipment',
    'Safety Gloves',
    'Respiratory Protection',
    'Protective Coveralls',
    'Respiratory Protection',
    'Protective Coveralls',
    'Personal Protective Equipment',
    'Respiratory Protection',
    'Safety Gloves',
    'Safety Sign Systems',
    'Personal Protective Equipment',
    'Fire Safety Equipment',
];

const categoryCounts = [
    { key: 'All', count: 12 },
    { key: 'Personal Protective Equipment', count: 3 },
    { key: 'Safety Gloves', count: 2 },
    { key: 'Respiratory Protection', count: 3 },
    { key: 'Protective Coveralls', count: 2 },
    { key: 'Safety Sign Systems', count: 1 },
    { key: 'Fire Safety Equipment', count: 1 },
];

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const { t } = useLanguage();

    const products = t.productsPage.items.map((item, i) => ({
        ...item,
        image: productImages[i],
        categoryKey: productCategoryKeys[i],
    }));

    const filtered =
        activeCategory === 'All'
            ? products
            : products.filter((p) => p.categoryKey === activeCategory);

    return (
        <div className={styles.productsPage}>
            {/* Banner */}
            <div className="page-banner">
                <div className="container">
                    <h1>{t.productsPage.title}</h1>
                    <div className="breadcrumb">
                        <Link href="/">{t.productsPage.home}</Link>
                        <span>›</span>
                        <span>{t.productsPage.title}</span>
                    </div>
                </div>
            </div>

            {/* Products Content */}
            <section className="section">
                <div className="container">
                    <div className={styles.productsLayout}>
                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <h3 className={styles.sidebarTitle}>{t.productsPage.sidebarTitle}</h3>
                            <div className={styles.categoryList}>
                                {categoryCounts.map((cat) => (
                                    <button
                                        key={cat.key}
                                        className={`${styles.categoryItem} ${activeCategory === cat.key ? styles.active : ''}`}
                                        onClick={() => setActiveCategory(cat.key)}
                                    >
                                        <span>{cat.key === 'All' ? t.productsPage.all : (t.productsPage.categoryNames[cat.key] || cat.key)}</span>
                                        <span className={styles.categoryCount}>({cat.count})</span>
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* Grid */}
                        <div className={styles.productGrid}>
                            {filtered.map((product, i) => (
                                <div key={i} className={styles.productCard}>
                                    <div className={styles.productImage}>
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                    <div className={styles.productBody}>
                                        <span className={styles.productCategory}>
                                            {t.productsPage.categoryNames[product.categoryKey] || product.categoryKey}
                                        </span>
                                        <h3 className={styles.productTitle}>{product.title}</h3>
                                        <p className={styles.productDesc}>{product.desc}</p>
                                        <Link href="/contact" className={styles.enquiryBtn}>
                                            {t.productsPage.enquireNow}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
