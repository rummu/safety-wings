'use client';
import { useEffect, useState } from 'react';
import ProductForm from '../../../components/ProductForm';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProductPage() {
    const params = useParams();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchProduct(params.id);
        }
    }, [params.id]);

    const fetchProduct = async (id) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching product:', error);
            alert('Error loading product');
        } else {
            setInitialData(data);
        }
        setLoading(false);
    };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Link href="/admin/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>
                    &larr; Back to Dashboard
                </Link>
            </div>

            <h1 style={{ marginBottom: '20px' }}>Edit Product</h1>

            {loading ? (
                <p>Loading product...</p>
            ) : initialData ? (
                <ProductForm initialData={initialData} />
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
}
