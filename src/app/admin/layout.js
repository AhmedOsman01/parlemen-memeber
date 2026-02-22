import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import AdminNav from '@/components/admin/AdminNav';

export default async function AdminLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_jwt')?.value;

    // We only perform deep verification if a token exists.
    // Redirection to /admin/login is now handled by src/proxy.js (middleware)
    // to avoid infinite redirect loops on the login page itself.
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
            if (!decoded || decoded.role !== 'admin') {
                redirect('/admin/login?error=invalid_role');
            }
        } catch (err) {
            console.error('AdminLayout auth error:', err.message);
            redirect('/admin/login?error=session_expired');
        }
    }

    return (
        <div className="admin-wrapper min-h-screen bg-gray-50 flex flex-col pt-[72px]">
            <AdminNav />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
