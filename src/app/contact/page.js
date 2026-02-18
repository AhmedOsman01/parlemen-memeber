import ContactForm from "@/components/ContactForm";

/**
 * بيانات SEO لصفحة التواصل
 */
export const metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع النائب أحمد المصري، عضو مجلس النواب المصري. أرسل رسالة أو قم بزيارة المكتب أو تواصل عبر وسائل التواصل الاجتماعي.",
};

/**
 * صفحة التواصل — النموذج، تفاصيل المكتب، الروابط الاجتماعية، والخريطة
 */
export default function ContactPage() {
  return (
    <>
      {/* رأس الصفحة */}
      <section className="relative pt-32 pb-16 bg-[var(--navy)]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1920&q=40')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            تواصل معنا
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            صوتك مهم. تواصل معنا لطرح أسئلتك أو اقتراحاتك أو لحجز موعد.
          </p>
        </div>
      </section>

      {/* النموذج والتفاصيل */}
      <section className="py-20 lg:py-28 bg-[var(--cream-light)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* النموذج — ٣ أعمدة */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-[var(--navy)] mb-2">
                  أرسل رسالة
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* الشريط الجانبي — عمودان */}
            <div className="lg:col-span-2 space-y-8">
              {/* تفاصيل المكتب */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-[var(--navy)] mb-6 gold-underline-right">
                  معلومات المكتب
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/15 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--gold-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--navy)] text-sm">العنوان</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        ١٢٣ شارع البرلمان<br />
                        القاهرة، مصر ١١٥١١
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/15 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--gold-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--navy)] text-sm">الهاتف</p>
                      <p className="text-sm text-[var(--text-secondary)]" dir="ltr">+20 2 1234 5678</p>
                      <p className="text-sm text-[var(--text-secondary)]" dir="ltr">+20 100 123 4567</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/15 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--gold-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--navy)] text-sm">البريد الإلكتروني</p>
                      <p className="text-sm text-[var(--text-secondary)]" dir="ltr">contact@ahmedmasry.eg</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/15 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[var(--gold-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--navy)] text-sm">ساعات العمل</p>
                      <p className="text-sm text-[var(--text-secondary)]">الأحد – الخميس: ٩:٠٠ ص – ٥:٠٠ م</p>
                      <p className="text-sm text-[var(--text-secondary)]">الجمعة – السبت: مغلق</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* وسائل التواصل الاجتماعي */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-[var(--navy)] mb-6 gold-underline-right">
                  تابعنا
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "فيسبوك", icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
                    { name: "تويتر", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                    { name: "انستغرام", icon: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" },
                    { name: "يوتيوب", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--cream)] hover:bg-[var(--gold)]/15 transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      <svg className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--gold-dark)] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d={social.icon} />
                      </svg>
                      <span className="text-sm font-medium text-[var(--navy)]">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* خريطة جوجل */}
      <section className="h-[400px] relative">
        <iframe
          title="موقع المكتب — القاهرة، مصر"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjgiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sar!2seg!4v1234567890"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cream-light)] to-transparent h-8 bottom-0 top-auto" />
      </section>
    </>
  );
}
