import Link from 'next/link';
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb';

export default function AdminDashboard() {
    const cards = [
        {
            title: 'إدارة الأخبار',
            description: 'أضف، عدل أو احذف مقالات الأخبار والمقالات.',
            href: '/admin/news',
            actionHref: '/admin/news/new',
            actionLabel: 'إضافة جديد',
            actionIcon: '+',
            icon: '📰',
            color: 'bg-blue-500',
        },
        {
            title: 'إدارة السلايدر',
            description: 'إدارة صور السلايدر في الصفحة الرئيسية.',
            href: '/admin/slides',
            actionHref: '/admin/slides/new',
            actionLabel: 'إضافة جديد',
            actionIcon: '+',
            icon: '🖼️',
            color: 'bg-amber-600',
        },
        {
            title: 'إدارة الجدول الزمني',
            description: 'تحديث مسيرة النائب والجدول الزمني المهني.',
            href: '/admin/timeline',
            actionHref: '/admin/timeline/new',
            actionLabel: 'إضافة جديد',
            actionIcon: '+',
            icon: '⏳',
            color: 'bg-navy-600',
        },
        {
            title: 'رسائل التواصل',
            description: 'عرض وإدارة رسائل المواطنين وتصدير البيانات.',
            href: '/admin/contacts',
            actionHref: '/api/contact/export',
            actionLabel: 'تصدير CSV',
            actionIcon: '📥',
            icon: '✉️',
            color: 'bg-green-600',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminBreadcrumb items={[{ label: 'لوحة التحكم' }]} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
                <p className="text-gray-600">أهلاً بك في لوحة تحكم الموقع الرسمي للنائب أحمد المصري.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div key={card.href} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col transition-all duration-300 hover:shadow-xl">
                        <div className={`w-12 h-12 rounded-xl ${card.color} text-white flex items-center justify-center text-2xl mb-4`}>
                            {card.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">{card.description}</p>

                        <div className="mt-auto space-y-3">
                            <Link href={card.href} className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-gray-50 text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors">
                                <span>عرض الكل</span>
                                <span>←</span>
                            </Link>
                            {card.actionHref && (
                                <Link href={card.actionHref} className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-(--gold) text-(--navy) font-semibold text-sm hover:bg-(--gold-light) transition-colors">
                                    <span>{card.actionLabel}</span>
                                    <span>{card.actionIcon}</span>
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
