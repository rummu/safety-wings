'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export function HeroManager() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('hero_images')
            .select('*')
            .order('display_order', { ascending: true });

        if (error) {
            console.error('Error fetching hero images:', error);
        } else {
            setImages(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id, imageUrl) => {
        if (!window.confirm('Are you sure you want to delete this hero image?')) return;

        // Optionally delete image from storage if it's hosted there
        if (imageUrl && !imageUrl.startsWith('/images/')) {
            const fileName = imageUrl.split('/').pop();
            await supabase.storage.from('hero-images').remove([fileName]);
        }

        const { error } = await supabase.from('hero_images').delete().eq('id', id);

        if (error) {
            alert('Error deleting image');
            console.error(error);
        } else {
            fetchImages();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', margin: 0, color: '#374151' }}>Manage Hero Images</h2>
                <Link href="/admin/hero-new" style={{
                    padding: '8px 15px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }}>
                    + Add New Image
                </Link>
            </div>

            {loading ? (
                <p>Loading hero images...</p>
            ) : images.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
                    <p style={{ color: '#6b7280', marginBottom: '15px' }}>No hero images found.</p>
                    <Link href="/admin/hero/new" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>
                        Upload your first image
                    </Link>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                                <th style={{ padding: '12px' }}>Image</th>
                                <th style={{ padding: '12px' }}>Display Order</th>
                                <th style={{ padding: '12px' }}>Created At</th>
                                <th style={{ padding: '12px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {images.map(img => (
                                <tr key={img.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '12px' }}>
                                        <img src={img.image_url} alt="Hero image" style={{ width: '150px', height: 'auto', maxHeight: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td style={{ padding: '12px', fontWeight: '500' }}>{img.display_order}</td>
                                    <td style={{ padding: '12px', color: '#6b7280' }}>{new Date(img.created_at).toLocaleDateString()}</td>
                                    <td style={{ padding: '12px' }}>
                                        <button
                                            onClick={() => handleDelete(img.id, img.image_url)}
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
    );
}
