import { createClient } from '@/lib/supabaseServer'
import Link from 'next/link'
import { Product } from '@/lib/products'

export default async function ProductsPage() {
    const supabase = await createClient()

    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching products:', error)
        return <div>Error loading products</div>
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Products</h2>
                <Link
                    href="/admin/products/new"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    + New Product
                </Link>
            </div>

            <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                File Path
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products?.map((product: Product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                    <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    ${product.price}
                                </td>
                                <td className="px-6 py-4">
                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {product.file_path}
                                    </code>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                        Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}