'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Package, ShoppingBag, Upload, 
  BarChart3, Settings, LogOut, Menu, X, Users 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protect route - redirect if not admin
  if (status === 'loading') return <div>Loading...</div>;
  if (!session || session.user?.email !== 'khushipal1470@gmail.com') {
    router.push('/auth/login');
    return null;
  }

  const navItems = [
    { href: '/admin', icon: <LayoutDashboard />, label: 'Dashboard' },
    { href: '/admin/products', icon: <Package />, label: 'Products' },
    { href: '/admin/orders', icon: <ShoppingBag />, label: 'Orders' },
    { href: '/admin/uploads', icon: <Upload />, label: 'Uploads' },
    { href: '/admin/analytics', icon: <BarChart3 />, label: 'Analytics' },
    { href: '/admin/settings', icon: <Settings />, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900 text-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform z-40
      `}>
        {/* Logo */}
        <div className="p-6 border-b">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-gray-900 rounded-lg flex items-center justify-center bg-purple-300">
              <span className="font-bold">K</span>
            </div>
            <div>
              <div className="font-bold text-xl">Kithub Admin</div>
              <div className="text-xs text-gray-500">Dashboard</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <div className="font-medium">{session.user?.name || 'Admin'}</div>
              <div className="text-sm text-gray-500">Admin</div>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <LogOut size={20} />
            <span>Back to Store</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}