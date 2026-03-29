/**
 * بيانات شرائح العرض الرئيسية — كل شريحة تحتوي على صورة خلفية وعنوان ووصف وزر
 * استبدل روابط Unsplash بصور حقيقية في الإنتاج
 */
export const slides = [
  {
    id: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Magles_El_Nowaab.jpg",
    title: "خدمة مصر بشرف وأمانة",
    subtitle:
      "ملتزمون ببناء مستقبل أقوى وأكثر ازدهاراً لكل مواطن مصري.",
    cta: { label: "اعرف المزيد", href: "/about" },
  },
  {
    id: 2,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/The_Egyptian_parliament_building_during_9_February_%28Closed%29.jpg",
    title: "التميز التشريعي",
    subtitle:
      "نتبنى تشريعات تحويلية تدفع عجلة التقدم الوطني والإصلاح.",
    cta: { label: "آخر الأخبار", href: "/news" },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1920",
    title: "المجتمع أولاً",
    subtitle:
      "التواصل مع المجتمعات في جميع أنحاء الدائرة للاستماع والعمل وتحقيق التغيير الحقيقي.",
    cta: { label: "تواصل معنا", href: "/contact" },
  },
];
