/**
 * عنوان القسم — مكون عنوان مركزي قابل لإعادة الاستخدام مع خط ذهبي زخرفي
 * @param {string} title — نص العنوان الرئيسي
 * @param {string} [subtitle] — عنوان فرعي اختياري
 */
export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
  <h2 className="text-3xl sm:text-4xl font-bold text-(--navy) gold-underline">
        {title}
      </h2>
      {subtitle && (
  <p className="mt-4 text-base text-(--text-secondary) max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
