// app/admin/orders/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, ShoppingBag, User, CreditCard, 
  CheckCircle, XCircle, Download, Mail, Package
} from 'lucide-react'
import { prisma } from '@/lib/db'
import { formatPrice } from '@/utils/format'

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      },
      downloads: true,
    }
  })

  if (!order) notFound()

  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PAID: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    REFUNDED: 'bg-gray-100 text-gray-800',
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.id.slice(-8)}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                {order.status === 'PAID' && <CheckCircle className="mr-1" size={14} />}
                {order.status === 'FAILED' && <XCircle className="mr-1" size={14} />}
                {order.status}
              </span>
              <span className="text-sm text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()} at{' '}
                {new Date(order.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2">
              <Mail size={18} />
              Contact Customer
            </button>
            {order.status === 'PAID' && (
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2">
                <Download size={18} />
                Resend Download
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User size={20} />
              Customer Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Customer</h3>
                <div className="text-lg font-medium text-gray-900">
                  {order.user?.name || 'Guest Customer'}
                </div>
                <div className="text-gray-600">{order.user?.email}</div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Order ID</h3>
                <div className="font-mono text-gray-900">{order.id}</div>
                {order.razorpayOrderId && (
                  <div className="text-sm text-gray-600 mt-1">
                    Razorpay: {order.razorpayOrderId}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag size={20} />
              Order Items ({order.items.length})
            </h2>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="text-gray-400" size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.product.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        Product ID: {item.productId.slice(-6)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {formatPrice(item.price)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Payment Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Amount</h3>
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(order.amount)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {order.currency}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Status</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  {order.paidAt && (
                    <div className="text-sm text-gray-600">
                      Paid on {new Date(order.paidAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                {order.razorpayPaymentId && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Razorpay Details</h4>
                    <div className="text-sm space-y-1">
                      <div>Payment ID: {order.razorpayPaymentId}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Actions & Info */}
        <div className="space-y-6">
          {/* Order Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Actions</h2>
            
            <div className="space-y-3">
              {order.status === 'PENDING' && (
                <>
                  <button className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                    Mark as Paid
                  </button>
                  <button className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
                    Mark as Failed
                  </button>
                </>
              )}
              
              {order.status === 'PAID' && (
                <>
                  <button className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center gap-2">
                    <Download size={18} />
                    Send Download Link
                  </button>
                  <button className="block w-full text-center px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50">
                    Issue Refund
                  </button>
                </>
              )}
              
              <button className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                Contact Customer
              </button>
            </div>
          </div>

          {/* Download History */}
          {order.downloads.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Download History</h2>
              
              <div className="space-y-3">
                {order.downloads.map((download) => (
                  <div key={download.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">
                      {download.count} download{download.count !== 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-gray-600">
                      Last: {download.updatedAt ? new Date(download.updatedAt).toLocaleString() : 'Never'}
                    </div>
                    {download.expiresAt && (
                      <div className="text-xs text-gray-600 mt-1">
                        Expires: {new Date(download.expiresAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Timeline</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="text-green-600" size={16} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Order Created</div>
                  <div className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              
              {order.paidAt && (
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="text-green-600" size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Payment Completed</div>
                    <div className="text-sm text-gray-600">
                      {new Date(order.paidAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
              
              {order.updatedAt !== order.createdAt && (
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Last Updated</div>
                    <div className="text-sm text-gray-600">
                      {new Date(order.updatedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}