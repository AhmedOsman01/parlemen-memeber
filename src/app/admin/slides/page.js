import { listSlides } from "@/models/slideModel";
import Link from "next/link";
import AdminRowActions from "@/components/admin/AdminRowActions";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default async function AdminSlidesList() {
    const slides = await listSlides();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <AdminBreadcrumb items={[{ label: 'إدارة السلايدر' }]} />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">إدارة السلايدر</h1>
                    <p className="text-gray-600">إدارة الصور المعروضة في خلفية الصفحة الرئيسية.</p>
                </div>
                <Link
                    href="/admin/slides/new"
                    className="bg-gold text-navy px-6 py-3 rounded-xl font-bold hover:bg-gold-light transition-all"
                >
                    + إضافة صورة جديدة
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((slide) => (
                    <div key={slide.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                ترتيب: {slide.order}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg mb-1">{slide.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-1">{slide.subtitle}</p>
                            <div className="flex gap-4 pt-4 border-t border-gray-50">
                                <AdminRowActions
                                    id={slide.id}
                                    editUrl={`/admin/slides/edit/${slide.id}`}
                                    deleteApiUrl="/api/admin/slides"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {slides.length === 0 && (
                    <div className="col-span-full p-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed">
                        لا توجد صور في السلايدر حالياً.
                    </div>
                )}
            </div>
        </div>
    );
}
