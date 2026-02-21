import { createClient } from '@/lib/supabaseServer'
import Link from 'next/link'

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Get stats
    const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

    const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Card */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Total Products</h3>
                    <p className="text-3xl font-bold mt-2">{productCount || 0}</p>
                    <Link href="/admin/products" className="text-sm text-indigo-600 hover:text-indigo-900 mt-4 block">
                        View all →
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Total Orders</h3>
                    <p className="text-3xl font-bold mt-2">{orderCount || 0}</p>
                    <Link href="/admin/orders" className="text-sm text-indigo-600 hover:text-indigo-900 mt-4 block">
                        View all →
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Quick Actions</h3>
                    <div className="mt-4 space-y-2">
                        <Link href="/admin/products/new" className="text-sm text-indigo-600 hover:text-indigo-900 block">
                            + Add New Product
                        </Link>
                        <Link href="/admin/storage" className="text-sm text-indigo-600 hover:text-indigo-900 block">
                            📁 Manage Storage
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Products Preview */}
            <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Recent Products</h3>
                <div className="bg-white rounded-lg shadow-sm border p-4">
                    {/* You can add a mini list here */}
                </div>
            </div>
        </div>
    )
}