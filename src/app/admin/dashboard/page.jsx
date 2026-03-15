'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { HeroManager } from '../components/HeroManager';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('products');
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id, imageUrl) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        // Optionally delete image from storage if needed
        if (imageUrl) {
            const fileName = imageUrl.split('/').pop();
            await supabase.storage.from('product-images').remove([fileName]);
        }

        const { error } = await supabase.from('products').delete().eq('id', id);

        if (error) {
            alert('Error deleting product');
            console.error(error);
        } else {
            fetchProducts();
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    return (
        <div>
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', margin: 0 }}>Dashboard</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '30px' }}>
                <button
                    onClick={() => setActiveTab('products')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'products' ? '3px solid #10b981' : '3px solid transparent',
                        color: activeTab === 'products' ? '#10b981' : '#6b7280',
                        fontWeight: activeTab === 'products' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Products
                </button>
                <button
                    onClick={() => setActiveTab('hero')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'hero' ? '3px solid #10b981' : '3px solid transparent',
                        color: activeTab === 'hero' ? '#10b981' : '#6b7280',
                        fontWeight: activeTab === 'hero' ? 'bold' : 'normal',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Hero Images
                </button>
            </div>

            {/* Content Area */}
            {activeTab === 'products' ? (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '20px', margin: 0, color: '#374151' }}>Manage Products</h2>
                        <Link href="/admin/products/new" style={{
                            padding: '8px 15px',
                            backgroundColor: '#10b981',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}>
                            + Add New Product
                        </Link>
                    </div>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : products.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
                            <p style={{ color: '#6b7280', marginBottom: '15px' }}>No products found.</p>
                            <Link href="/admin/products/new" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>
                                Create your first product
                            </Link>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                                        <th style={{ padding: '12px' }}>Image</th>
                                        <th style={{ padding: '12px' }}>Title (EN)</th>
                                        <th style={{ padding: '12px' }}>Category</th>
                                        <th style={{ padding: '12px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                            <td style={{ padding: '12px' }}>
                                                {product.image_url ? (
                                                    <img src={product.image_url} alt={product.title_en} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                                ) : (
                                                    <div style={{ width: '50px', height: '50px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}></div>
                                                )}
                                            </td>
                                            <td style={{ padding: '12px', fontWeight: '500' }}>{product.title_en}</td>
                                            <td style={{ padding: '12px', color: '#6b7280' }}>{product.category_key}</td>
                                            <td style={{ padding: '12px' }}>
                                                <Link href={`/admin/products/edit/${product.id}`} style={{ marginRight: '10px', color: '#3b82f6', textDecoration: 'none' }}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.image_url)}
                                                    style={{ color: '#ef4444', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                <HeroManager />
            )}
        </div>
    );
}
