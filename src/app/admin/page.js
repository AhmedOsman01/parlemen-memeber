import Link from 'next/link';

export default function AdminDashboard() {
    const cards = [
        {
            title: 'إدارة الأخبار',
            description: 'أضف، عدل أو احذف مقالات الأخبار والمقالات.',
            href: '/admin/news',
            icon: '📰',
            color: 'bg-blue-500',
        },
        {
            title: 'إدارة الصور المتحركة',
            description: 'إدارة صور السلايدر في الصفحة الرئيسية.',
            href: '/admin/slides',
            icon: '🖼️',
            color: 'bg-gold-600',
        },
        {
            title: 'إدارة الجدول الزمني',
            description: 'تحديث مسيرة النائب والجدول الزمني المهني.',
            href: '/admin/timeline',
            icon: '⏳',
            color: 'bg-navy-600',
        },
        {
            title: 'رسائل التواصل',
            description: 'عرض وإدارة رسائل المواطنين.',
            href: '/admin/contacts',
            icon: '✉️',
            color: 'bg-green-600',
        },
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
                <p className="text-gray-600">أهلاً بك في لوحة تحكم الموقع الرسمي للنائب أحمد المصري.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <Link key={card.href} href={card.href} className="block group">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className={`w-12 h-12 rounded-xl ${card.color} text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                            <div className="mt-6 flex items-center text-gray-900 font-semibold text-sm">
                                <span>انتقل الآن</span>
                                <span className="mr-auto">←</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
