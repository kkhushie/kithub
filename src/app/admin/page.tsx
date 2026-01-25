'use client';
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Products', value: '24', icon: <Package />, change: '+3 this month', href: '/admin/products' },
    { title: 'Total Orders', value: '156', icon: <ShoppingBag />, change: '+12% from last month', href: '/admin/orders' },
    { title: 'Total Revenue', value: '₹46,845', icon: <TrendingUp />, change: '+18% from last month', href: '/admin/analytics' },
    { title: 'Active Users', value: '89', icon: <Users />, change: '+5 this week', href: '/admin/users' },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', product: 'YouTube Pack Vol.1', amount: '₹299', status: 'Completed' },
    { id: 'ORD-002', customer: 'Jane Smith', product: 'Instagram Bundle', amount: '₹499', status: 'Processing' },
    { id: 'ORD-003', customer: 'Alex Johnson', product: 'Certificate Templates', amount: '₹349', status: 'Completed' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="bg-white border-2 border-gray-900 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                {stat.icon}
              </div>
              <div className="text-sm text-gray-500">{stat.change}</div>
            </div>
            <div className="text-2xl font-bold mb-2">{stat.value}</div>
            <div className="text-gray-700 font-medium">{stat.title}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white border-2 border-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-purple-600 hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{order.id}</div>
                  <div className="text-sm text-gray-600">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{order.amount}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border-2 border-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="border-2 border-gray-900 bg-purple-300 p-4 rounded-lg text-center hover:bg-purple-400 transition-colors"
            >
              <Package className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Add Product</div>
            </Link>
            <Link
              href="/admin/uploads"
              className="border-2 border-gray-900 bg-blue-100 p-4 rounded-lg text-center hover:bg-blue-200 transition-colors"
            >
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Upload Files</div>
            </Link>
            <Link
              href="/admin/analytics"
              className="border-2 border-gray-900 bg-green-100 p-4 rounded-lg text-center hover:bg-green-200 transition-colors"
            >
              <BarChart3 className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">View Analytics</div>
            </Link>
            <Link
              href="/admin/settings"
              className="border-2 border-gray-900 bg-yellow-100 p-4 rounded-lg text-center hover:bg-yellow-200 transition-colors"
            >
              <Settings className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Settings</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}