/**
 * عنوان القسم — مكون عنوان مركزي قابل لإعادة الاستخدام مع خط ذهبي زخرفي
 * @param {string} title — نص العنوان الرئيسي
 * @param {string} [subtitle] — عنوان فرعي اختياري
 * @param {string} [tag] — شارة اختيارية فوق العنوان
 * @param {string} [id] — معرف للربط الداخلي
 * @param {'center'|'right'} [align='center'] — محاذاة
 * @param {boolean} [light=false] — Light mode for dark backgrounds
 */
export default function SectionHeading({ title, subtitle, tag, id, align = 'center', light = false }) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-14 ${isCenter ? 'text-center' : ''}`} id={id}>
      {tag && (
        <span className={`inline-block px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full mb-4 ${
          light ? 'bg-[var(--gold)]/15 text-[var(--gold)]' : 'bg-[var(--gold)]/10 text-[var(--gold-dark)]'
        }`}>
          {tag}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold ${
        light ? 'text-white' : 'text-[var(--navy)]'
      } ${isCenter ? 'gold-underline' : 'gold-underline-right'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-xl'} ${
          light ? 'text-white/50' : 'text-[var(--text-secondary)]'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
