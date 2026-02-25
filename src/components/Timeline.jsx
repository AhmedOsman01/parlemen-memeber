/**
 * الجدول الزمني — جدول زمني عمودي رسمي للإنجازات والمحطات
 * يتراص عمودياً على الهاتف ويتناوب يميناً ويساراً على سطح المكتب
 */
export default function Timeline({ items }) {
  return (
    <div className="relative max-w-4xl mx-auto" role="list" aria-label="المسيرة المهنية">
      {/* خط المنتصف */}
      <div className="absolute right-4 md:right-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/30 to-transparent transform md:translate-x-1/2" />

      {items.map((item, index) => {
        const isRight = index % 2 === 0;
        return (
          <div
            key={index}
            className={`relative flex items-start mb-10 ${
              isRight ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            role="listitem"
          >
            {/* نقطة على الخط */}
            <div className="absolute right-4 md:right-1/2 w-3.5 h-3.5 rounded-full bg-[var(--gold)] border-[3px] border-[var(--cream-light)] shadow transform translate-x-1/2 mt-7 z-10">
              <span className="absolute inset-0 rounded-full bg-[var(--gold)]/30 animate-ping" style={{ animationDuration: '3s' }} />
            </div>

            {/* البطاقة */}
            <div
              className={`mr-12 md:mr-0 md:w-[calc(50%-2rem)] ${
                isRight ? "md:pl-8 md:text-right" : "md:pr-8 md:text-left"
              }`}
            >
              <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[var(--gray-100)]">
                {/* سنة */}
                <span className="inline-block px-3 py-1 text-xs font-bold text-[var(--gold-dark)] bg-[var(--gold)]/10 rounded-md mb-3">
                  {item.year}
                </span>
                <h3 className="text-base font-semibold text-[var(--navy)] mb-2 leading-relaxed">
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
