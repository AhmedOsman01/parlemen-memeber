import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

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
            // If the token is invalid/expired, we let the user stay on the page 
            // OR redirect them, but since proxy.js handles /admin routes, 
            // this catch block will primarily hit if they have a BAD token.
            redirect('/admin/login?error=session_expired');
        }
    }

    return (
        <div className="admin-wrapper min-h-screen bg-gray-50">
            {children}
        </div>
    );
}
