import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
