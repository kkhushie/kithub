// app/admin/products/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  Package, ArrowLeft, Eye, Edit, Tag, 
  DollarSign, HardDrive, Layers, Globe
} from 'lucide-react'
import { prisma } from '@/lib/db'
import { formatPrice, formatFileSize } from '@/utils/format'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: {
          order: { select: { status: true, createdAt: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }
    }
  })

  if (!product) notFound()

  const stats = {
    totalSales: product.orderItems.filter(item => item.order.status === 'PAID').length,
    totalRevenue: product.orderItems
      .filter(item => item.order.status === 'PAID')
      .reduce((sum, item) => sum + item.price, 0),
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                product.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className="text-sm text-gray-600">
                Created {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Eye size={18} />
              View Public Page
            </Link>
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Edit size={18} />
              Edit Product
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Product Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Details Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                <p className="text-gray-900">{product.description || 'No description provided'}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <DollarSign size={16} />
                    Pricing
                  </h3>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <HardDrive size={16} />
                    File Info
                  </h3>
                  <div className="text-lg font-medium text-gray-900">
                    {formatFileSize(product.fileSizeBytes)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Key: <code className="bg-gray-100 px-2 py-1 rounded">{product.fileKey}</code>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Tag size={16} />
                    Category & Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {product.category}
                    </span>
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                    <Globe size={16} />
                    Preview
                  </h3>
                  {product.previewUrl ? (
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {/* You can add an Image component here */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Preview image
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No preview image</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sales History */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sales History</h2>
            
            {product.orderItems.length > 0 ? (
              <div className="space-y-4">
                {product.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">
                        Order #{item.orderId.slice(-6)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.order.status === 'PAID' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No sales yet</h3>
                <p className="mt-2 text-gray-500">This product hasn't been purchased yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Stats & Actions */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Stats</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Total Sales</div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalSales}</div>
                </div>
                <div className="p-3 rounded-lg bg-green-100 text-green-600">
                  <DollarSign size={24} />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Total Revenue</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(stats.totalRevenue)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                  <TrendingUp size={24} />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">File Size</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatFileSize(product.fileSizeBytes)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  <HardDrive size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
              >
                Edit Product
              </Link>
              
              <button className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                {product.isActive ? 'Deactivate' : 'Activate'} Product
              </button>
              
              <button className="block w-full text-center px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50">
                Delete Product
              </button>
            </div>
          </div>

          {/* Product ID */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Info</h2>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Product ID</div>
                <div className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                  {product.id}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Slug</div>
                <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                  {product.slug}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Created</div>
                <div className="text-gray-900">
                  {new Date(product.createdAt).toLocaleString()}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="text-gray-900">
                  {new Date(product.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}