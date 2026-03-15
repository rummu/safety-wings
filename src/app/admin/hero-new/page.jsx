'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewHeroImage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [displayOrder, setDisplayOrder] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!imageFile) {
                throw new Error('Please select an image');
            }

            // 1. Upload Image to Supabase Storage
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('hero-images')
                .upload(filePath, imageFile);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('hero-images')
                .getPublicUrl(filePath);

            // 3. Save to database
            const { error: dbError } = await supabase
                .from('hero_images')
                .insert([
                    {
                        image_url: publicUrl,
                        display_order: parseInt(displayOrder) || 0
                    }
                ]);

            if (dbError) throw dbError;

            alert('Hero image added successfully!');
            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Error adding hero image:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Link href="/admin/dashboard" style={{ marginRight: '15px', color: '#6b7280', textDecoration: 'none' }}>
                    &larr; Back
                </Link>
                <h1 style={{ fontSize: '24px', margin: 0 }}>Add New Hero Image</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Hero Image *</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        required
                    />
                    {imageFile && (
                        <div style={{ marginTop: '10px' }}>
                            <p style={{ fontSize: '14px', color: '#6b7280' }}>Selected: {imageFile.name}</p>
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Display Order</label>
                    <input
                        type="number"
                        value={displayOrder}
                        onChange={(e) => setDisplayOrder(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                        required
                    />
                    <small style={{ color: '#6b7280' }}>Lower numbers appear first (e.g., 1, 2, 3)</small>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: loading ? '#9ca3af' : '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Uploading...' : 'Save Hero Image'}
                </button>
            </form>
        </div>
    );
}
