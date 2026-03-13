'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminGuard({ children }) {
    const [loading, setLoading] = useState(true);
    const [hasSession, setHasSession] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let mounted = true;

        async function getSession() {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (mounted) {
                if (!session) {
                    router.push('/admin/login');
                } else {
                    setHasSession(true);
                }
                setLoading(false);
            }
        }

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    router.push('/admin/login');
                } else if (session) {
                    setHasSession(true);
                    setLoading(false);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [router]);

    if (loading) {
        return (
            <div style={{ padding: '100px', textAlign: 'center' }}>
                Loading admin dashboard...
            </div>
        );
    }

    if (!hasSession) {
        return null;
    }

    return children;
}
