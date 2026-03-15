import Link from 'next/link';

export default function AdminLayout({ children }) {
    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '40px 20px' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '20px' }}>
                <header style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, color: '#10b981' }}>Safety Wings Admin</h2>
                    <nav>
                        <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Back to Site</a>
                    </nav>
                </header>
                {children}
            </div>
        </div>
    );
}
