import { createClient } from '@/lib/supabaseServer'
import Link from 'next/link'
import { Product } from '@/lib/products'
import { 
  Package, 
  PlusCircle, 
  Edit, 
  Trash2, 
  FileText,
  Calendar,
  DollarSign,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  ArrowUpDown,
  Download
} from 'lucide-react'

export default async function ProductsPage() {
    const supabase = await createClient()

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching products:', error)
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Products</h3>
                    <p className="text-red-600 mb-4">Something went wrong. Please try again.</p>
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        <Package className="w-4 h-4" />
                        Retry
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                            <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                                {products?.length || 0} total
                            </span>
                        </div>
                        <p className="text-gray-600 ml-13">
                            Manage your PSD products, upload files, and track sales
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/products/export"
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Export</span>
                        </Link>
                        <Link
                            href="/admin/products/new"
                            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm hover:shadow"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>New Product</span>
                        </Link>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                            <Filter className="w-4 h-4" />
                            <span className="hidden sm:inline">Filter</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                            <ArrowUpDown className="w-4 h-4" />
                            <span className="hidden sm:inline">Sort</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {products && products.length > 0 ? (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4" />
                                                Product
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4" />
                                                Price
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                File Path
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Created
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product: Product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {product.preview_image ? (
                                                        <img 
                                                            src={product.preview_image} 
                                                            alt={product.title}
                                                            className="w-10 h-10 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <Package className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                        <div className="text-sm text-gray-500">{product.description.substring(0, 60)}...</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900">${product.price}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                                                    {product.file_path}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/products/${product.id}`}
                                                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/products/${product.id}/edit`}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete"
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to delete this product?')) {
                                                                // Handle delete
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                                                        title="More options"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden divide-y">
                            {products.map((product: Product) => (
                                <div key={product.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-start gap-3 mb-3">
                                        {product.preview_image ? (
                                            <img 
                                                src={product.preview_image} 
                                                alt={product.title}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <Package className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{product.title}</h3>
                                            <p className="text-sm text-gray-500 mb-2">{product.description.substring(0, 80)}...</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-indigo-600">${product.price}</span>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span className="text-xs text-gray-500">
                                                    {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 truncate max-w-[150px]">
                                            {product.file_path}
                                        </code>
                                        <div className="flex gap-1">
                                            <button className="p-2 text-gray-600 hover:text-indigo-600">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:text-blue-600">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-600 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{products.length}</span> of{' '}
                                <span className="font-medium">{products.length}</span> products
                            </p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled>
                                    Previous
                                </button>
                                <button className="px-3 py-1 border rounded-md text-sm text-gray-600 hover:bg-gray-100" disabled>
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    // Empty State
                    <div className="py-16 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Get started by creating your first PSD product. Upload your file and add details.
                        </p>
                        <Link
                            href="/admin/products/new"
                            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition shadow-sm"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Create Your First Product
                        </Link>
                    </div>
                )}
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">💡</span>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-blue-800 mb-1">Pro Tip</h4>
                        <p className="text-sm text-blue-700">
                            Make sure to upload your PSD files to the 'products' bucket in Storage before creating a product. 
                            The file path should match exactly (e.g., <code className="bg-blue-100 px-1 rounded">products/your-file.psd</code>).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}