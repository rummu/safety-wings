import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
    title: 'Safety Wings Trading Est. | Industrial Safety Equipment in KSA',
    description:
        'Safety Wings Trading Est. is a leading supplier of Personal Protective Equipment, safety gloves, respiratory protection, coveralls, and fire safety equipment in Al Khobar, Saudi Arabia.',
    keywords:
        'safety equipment, PPE, industrial safety, Saudi Arabia, Al Khobar, safety gloves, respiratory protection, coveralls, fire safety',
    openGraph: {
        title: 'Safety Wings Trading Est.',
        description: 'Premium Industrial Safety Equipment Supplier in KSA',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <LanguageProvider>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <ScrollToTop />
                </LanguageProvider>
            </body>
        </html>
    );
}
