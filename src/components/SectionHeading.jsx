/**
 * عنوان القسم — مكون عنوان مركزي قابل لإعادة الاستخدام مع خط ذهبي زخرفي
 * @param {string} title — نص العنوان الرئيسي
 * @param {string} [subtitle] — عنوان فرعي اختياري
 * @param {string} [tag] — شارة اختيارية فوق العنوان
 * @param {string} [id] — معرف للربط الداخلي
 * @param {'center'|'right'} [align='center'] — محاذاة
 */
export default function SectionHeading({ title, subtitle, tag, id, align = 'center' }) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-14 ${isCenter ? 'text-center' : ''}`} id={id}>
      {tag && (
        <span className="inline-block px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--gold-dark)] text-xs font-semibold tracking-wider rounded-full mb-4">
          {tag}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold text-[var(--navy)] ${isCenter ? 'gold-underline' : 'gold-underline-right'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base text-[var(--text-secondary)] leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
