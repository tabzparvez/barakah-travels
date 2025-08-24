import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get ? cookieStore.get('admin') : undefined;
  const isAdmin = adminCookie?.value === '1';
  if (!isAdmin) {
    redirect('/admin/login');
  }
  return (
    <main className="section">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="mb-4">
        <li><a href="/admin/packages" className="btn mb-2">Manage Packages</a></li>
  <li><a href="/admin/inquiries" className="btn mb-2">View Inquiries</a></li>
  <li><a href="/admin/testimonials" className="btn mb-2">Manage Testimonials</a></li>
  <li><a href="/admin/gallery" className="btn mb-2">Manage Gallery</a></li>
  <li><a href="/admin/blog" className="btn mb-2">Manage Blog</a></li>
  <li><a href="/admin/faq" className="btn mb-2">Manage FAQ</a></li>
  {/* Add more admin links here */}
      </ul>
      <form method="POST" action="/admin/logout">
        <button className="btn mt-4" type="submit">Logout</button>
      </form>
      <p>Backend integration required for full functionality.</p>
    </main>
  );
}
