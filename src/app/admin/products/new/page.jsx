import ProductForm from '../../components/ProductForm';
import Link from 'next/link';

export default function NewProductPage() {
    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Link href="/admin/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>
                    &larr; Back to Dashboard
                </Link>
            </div>
            <h1 style={{ marginBottom: '20px' }}>Add New Product</h1>
            <ProductForm />
        </div>
    );
}
