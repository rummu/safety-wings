'use client';
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ProductForm({ initialData }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(initialData?.image_url || null);

    const [formData, setFormData] = useState({
        title_en: initialData?.title_en || '',
        title_ar: initialData?.title_ar || '',
        desc_en: initialData?.desc_en || '',
        desc_ar: initialData?.desc_ar || '',
        category_key: initialData?.category_key || 'Personal Protective Equipment',
    });

    const [translating, setTranslating] = useState(false);

    const translateText = async (text, targetField) => {
        if (!text.trim()) return;

        setTranslating(true);
        try {
            // Using a free, no-key translation API (MyMemory)
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`);
            const data = await response.json();

            if (data.responseData?.translatedText) {
                setFormData(prev => ({
                    ...prev,
                    [targetField]: data.responseData.translatedText
                }));
            }
        } catch (error) {
            console.error('Translation error:', error);
        } finally {
            setTranslating(false);
        }
    };


    const categories = [
        'Personal Protective Equipment',
        'Safety Gloves',
        'Respiratory Protection',
        'Protective Coveralls',
        'Safety Sign Systems',
        'Fire Safety Equipment',
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let image_url = initialData?.image_url;

            if (imageFile) {
                // Upload new image
                image_url = await uploadImage(imageFile);

                // If editing and had an old image, maybe delete the old one here
                if (initialData?.image_url) {
                    const oldFileName = initialData.image_url.split('/').pop();
                    await supabase.storage.from('product-images').remove([oldFileName]);
                }
            }

            const productData = {
                ...formData,
                image_url
            };

            if (initialData?.id) {
                // Update
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', initialData.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase
                    .from('products')
                    .insert([productData]);
                if (error) throw error;
            }

            router.push('/admin/dashboard');
            router.refresh();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error saving product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <label style={labelStyle}>Title (English)</label>
                    <input
                        required
                        style={inputStyle}
                        value={formData.title_en}
                        onChange={e => setFormData({ ...formData, title_en: e.target.value })}
                        onBlur={(e) => {
                            if (!formData.title_ar) {
                                translateText(e.target.value, 'title_ar');
                            }
                        }}
                    />
                </div>
                <div>
                    <label style={labelStyle}>
                        Title (Arabic) {translating && <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'normal' }}>(Translating...)</span>}
                    </label>
                    <input required style={inputStyle} value={formData.title_ar} onChange={e => setFormData({ ...formData, title_ar: e.target.value })} dir="rtl" />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <label style={labelStyle}>Description (English)</label>
                    <textarea
                        required
                        style={{ ...inputStyle, height: '100px' }}
                        value={formData.desc_en}
                        onChange={e => setFormData({ ...formData, desc_en: e.target.value })}
                        onBlur={(e) => {
                            if (!formData.desc_ar) {
                                translateText(e.target.value, 'desc_ar');
                            }
                        }}
                    />
                </div>
                <div>
                    <label style={labelStyle}>
                        Description (Arabic) {translating && <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'normal' }}>(Translating...)</span>}
                    </label>
                    <textarea required style={{ ...inputStyle, height: '100px' }} value={formData.desc_ar} onChange={e => setFormData({ ...formData, desc_ar: e.target.value })} dir="rtl" />
                </div>
            </div>

            <div>
                <label style={labelStyle}>Category</label>
                <select style={inputStyle} value={formData.category_key} onChange={e => setFormData({ ...formData, category_key: e.target.value })}>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div>
                <label style={labelStyle}>Product Image</label>
                {imagePreview && (
                    <div style={{ marginBottom: '10px' }}>
                        <img src={imagePreview} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!initialData?.image_url} // Required if no existing image
                />
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px', marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => router.push('/admin/dashboard')} style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Cancel
                </button>
                <button type="submit" disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                    {loading ? 'Saving...' : 'Save Product'}
                </button>
            </div>
        </form>
    );
}

const labelStyle = { display: 'block', marginBottom: '8px', color: '#374151', fontWeight: '500' };
const inputStyle = { width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px' };
