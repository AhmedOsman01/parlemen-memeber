/**
 * الجدول الزمني — جدول زمني عمودي متناوب للإنجازات والمحطات
 * يتراص عمودياً على الهاتف ويتناوب يميناً ويساراً على سطح المكتب
 */
export default function Timeline({ items }) {
  return (
    <div className="relative max-w-4xl mx-auto" role="list" aria-label="المسيرة المهنية">
      {/* خط المنتصف */}
      <div className="absolute right-4 md:right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/50 to-transparent transform md:translate-x-1/2" />

      {items.map((item, index) => {
        const isRight = index % 2 === 0;
        return (
          <div
            key={index}
            className={`relative flex items-start mb-12 ${
              isRight ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            role="listitem"
          >
            {/* نقطة على الخط */}
            <div className="absolute right-4 md:right-1/2 w-4 h-4 rounded-full bg-[var(--gold)] border-4 border-[var(--cream-light)] shadow-md transform translate-x-1/2 mt-6 z-10" />

            {/* البطاقة */}
            <div
              className={`mr-12 md:mr-0 md:w-[calc(50%-2rem)] ${
                isRight ? "md:pl-8 md:text-right" : "md:pr-8 md:text-left"
              }`}
            >
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <span className="inline-block px-3 py-1 text-xs font-bold text-[var(--navy)] bg-[var(--gold)]/20 rounded-full mb-3">
                  {item.year}
                </span>
                <h3 className="text-lg font-semibold text-[var(--navy)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
