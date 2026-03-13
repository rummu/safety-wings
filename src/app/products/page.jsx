'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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



function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [activeCategory, setActiveCategory] = useState('All');
    const { t, language } = useLanguage();
    const [rawProducts, setRawProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryParam && categoryCounts.some(c => c.key === categoryParam)) {
            setActiveCategory(categoryParam);
        }
    }, [categoryParam]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { supabase } = await import('@/lib/supabase');
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setRawProducts(data);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const products = rawProducts.map((p) => ({
        ...p,
        title: language === 'ar' ? p.title_ar : p.title_en,
        desc: language === 'ar' ? p.desc_ar : p.desc_en,
        image: p.image_url || '/images/hero-equipment.jpeg',
        categoryKey: p.category_key || 'Personal Protective Equipment',
    }));

    const filtered =
        activeCategory === 'All'
            ? products
            : products.filter((p) => p.categoryKey === activeCategory);

    const categoriesFromProducts = rawProducts.reduce((acc, p) => {
        const cat = p.category_key || 'Personal Protective Equipment';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});

    const dynamicCategoryCounts = [
        { key: 'All', count: rawProducts.length },
        ...Object.keys(categoriesFromProducts).map(key => ({
            key,
            count: categoriesFromProducts[key]
        }))
    ];

    return (
        <div className={styles.productsPage}>
            {/* ... Existing Banner code ... */}
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
                                {dynamicCategoryCounts.map((cat) => (
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

export default function ProductsPage() {
    return (
        <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading products...</div>}>
            <ProductsContent />
        </Suspense>
    );
}
