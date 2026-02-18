/**
 * بيانات شرائح العرض الرئيسية — كل شريحة تحتوي على صورة خلفية وعنوان ووصف وزر
 * استبدل روابط Unsplash بصور حقيقية في الإنتاج
 */
export const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=1920&q=80",
    title: "خدمة مصر بشرف وأمانة",
    subtitle:
      "ملتزمون ببناء مستقبل أقوى وأكثر ازدهاراً لكل مواطن مصري.",
    cta: { label: "اعرف المزيد", href: "/about" },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1920&q=80",
    title: "التميز التشريعي",
    subtitle:
      "نتبنى تشريعات تحويلية تدفع عجلة التقدم الوطني والإصلاح.",
    cta: { label: "آخر الأخبار", href: "/news" },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1920&q=80",
    title: "المجتمع أولاً",
    subtitle:
      "التواصل مع المجتمعات في جميع أنحاء الدائرة للاستماع والعمل وتحقيق التغيير الحقيقي.",
    cta: { label: "تواصل معنا", href: "/contact" },
  },
];
