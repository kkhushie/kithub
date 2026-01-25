// app/admin/orders/page.tsx
import Link from 'next/link'
import { ShoppingBag, Search, Filter, Download } from 'lucide-react'
import { prisma } from '@/lib/db'
import { formatPrice } from '@/utils/format'

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string }
}) {
  const { status, q } = searchParams
  
  const orders = await prisma.order.findMany({
    where: {
      ...(status && status !== 'all' && { status }),
      ...(q && {
        OR: [
          { id: { contains: q, mode: 'insensitive' } },
          { razorpayOrderId: { contains: q, mode: 'insensitive' } },
          { user: { email: { contains: q, mode: 'insensitive' } } },
          { user: { name: { contains: q, mode: 'insensitive' } } },
        ],
      }),
    },
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product: { select: { title: true } } } },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  const statuses = ['all', 'PENDING', 'PAID', 'FAILED', 'REFUNDED']
  const totalRevenue = orders
    .filter(o => o.status === 'PAID')
    .reduce((sum, order) => sum + order.amount, 0)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage customer orders and payments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold mb-2">{orders.length}</div>
          <div className="text-gray-700 font-medium">Total Orders</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold mb-2">
            {orders.filter(o => o.status === 'PAID').length}
          </div>
          <div className="text-gray-700 font-medium">Paid Orders</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold mb-2">
            {orders.filter(o => o.status === 'PENDING').length}
          </div>
          <div className="text-gray-700 font-medium">Pending</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold mb-2">
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-gray-700 font-medium">Total Revenue</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Search orders..."
              defaultValue={q}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            defaultValue={status || 'all'}
          >
            <option value="all">All Status</option>
            {statuses.slice(1).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
            <Filter size={18} />
            More Filters
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      #{order.id.slice(-6)}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      {order.razorpayOrderId?.slice(-8)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.user?.name || 'Guest'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.user?.email || 'No email'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      {order.items.map(item => item.product.title).join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatPrice(order.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'PAID'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {orders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-2 text-gray-500">
              {q ? 'Try a different search term' : 'Orders will appear here as customers make purchases'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}