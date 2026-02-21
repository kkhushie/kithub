import { createClient } from '@/lib/supabaseServer'
import Link from 'next/link'
import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp,
    Package,
    PlusCircle,
    Archive,
    Clock,
    ArrowRight,
    ChevronRight
} from 'lucide-react'

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Get stats
    const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

    const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

    // Get recent products
    const { data: recentProducts } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

    // Calculate total revenue (if orders have amount)
    const { data: orders } = await supabase
        .from('orders')
        .select('amount')

    const totalRevenue = orders?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0

    const stats = [
        {
            name: 'Total Products',
            value: productCount || 0,
            icon: Package,
            change: '+12%',
            changeType: 'increase',
            href: '/admin/products',
            color: 'bg-blue-500',
            bgLight: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            name: 'Total Orders',
            value: orderCount || 0,
            icon: ShoppingBag,
            change: '+8%',
            changeType: 'increase',
            href: '/admin/orders',
            color: 'bg-green-500',
            bgLight: 'bg-green-50',
            textColor: 'text-green-600'
        },
        {
            name: 'Total Revenue',
            value: `$${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            change: '+23%',
            changeType: 'increase',
            href: '/admin/analytics',
            color: 'bg-purple-500',
            bgLight: 'bg-purple-50',
            textColor: 'text-purple-600'
        },
        {
            name: 'Active Users',
            value: '24',
            icon: Users,
            change: '+5%',
            changeType: 'increase',
            href: '/admin/users',
            color: 'bg-orange-500',
            bgLight: 'bg-orange-50',
            textColor: 'text-orange-600'
        },
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Last updated: {new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all hover:scale-[1.02] p-6 group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bgLight} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition`}>
                                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.changeType === 'increase'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">{stat.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </Link>
                ))}
            </div>

            {/* Recent Products & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Products */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-gray-600" />
                                <h3 className="font-semibold text-gray-900">Recent Products</h3>
                            </div>
                            <Link
                                href="/admin/products"
                                className="text-sm text-indigo-600 hover:text-indigo-900 font-medium flex items-center gap-1"
                            >
                                View all
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {recentProducts && recentProducts.length > 0 ? (
                            <div className="divide-y">
                                {recentProducts.map((product) => (
                                    <div key={product.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                                        <div className="flex items-center gap-4">
                                            {product.preview_image ? (
                                                <img
                                                    src={product.preview_image}
                                                    alt={product.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-900">{product.title}</p>
                                                <p className="text-sm text-gray-500">${product.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500">
                                                {new Date(product.created_at).toLocaleDateString()}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 mb-4">No products yet</p>
                                <Link
                                    href="/admin/products/new"
                                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Add Your First Product
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-600" />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Link
                                href="/admin/products/new"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
                            >
                                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                                    <PlusCircle className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Add New Product</p>
                                    <p className="text-xs text-gray-500">Upload PSD and create listing</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition" />
                            </Link>

                            <Link
                                href="/admin/storage"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
                            >
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                                    <Archive className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Manage Storage</p>
                                    <p className="text-xs text-gray-500">View uploaded PSD files</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition" />
                            </Link>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="bg-gradient-to-br from-black to-gray-500 rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-6 -mt-6"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-6 -mb-6"></div>

                        <div className="relative">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
                                    <span className="text-xl">💡</span>
                                </div>
                                <h3 className="font-semibold">Pro Tip</h3>
                            </div>
                            <p className="text-sm text-white/90 mb-4">
                                Upload your PSD files first, then create the product. The file path will be automatically used in your product listing.
                            </p>
                            <Link
                                href="/admin/products/new"
                                className="inline-flex items-center gap-2 bg-white text-black-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition shadow-lg"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Create New Product
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Storage Used</span>
                                    <span className="font-medium">245 MB / 1 GB</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-black h-2 rounded-full" style={{ width: '24%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">This Month Sales</span>
                                    <span className="font-medium">$1,245</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}