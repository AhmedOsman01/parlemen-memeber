import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Noto_Kufi_Arabic, Noto_Naskh_Arabic } from 'next/font/google';

const notoKufi = Noto_Kufi_Arabic({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
});

const notoNaskh = Noto_Naskh_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
});

/**
 * التخطيط الرئيسي — يغلف كل صفحة بشريط التنقل والتذييل والخطوط وبيانات SEO
 */
export const metadata = {
  title: {
    default: "أحمد المصري — عضو مجلس النواب المصري",
    template: "%s | النائب أحمد المصري",
  },
  description:
    "الموقع الرسمي للنائب أحمد المصري، عضو مجلس النواب المصري. ملتزم بخدمة الوطن والتميز التشريعي والتنمية المجتمعية.",
  keywords: [
    "مجلس النواب المصري",
    "عضو مجلس النواب",
    "أحمد المصري",
    "مصر",
    "سياسة",
    "تشريعات",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "النائب أحمد المصري",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`scroll-smooth ${notoNaskh.className}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
