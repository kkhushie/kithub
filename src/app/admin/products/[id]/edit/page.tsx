// app/admin/products/[id]/edit/page.tsx - Simplified structure
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setIsLoading(false)
      })
  }, [params.id])

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8">
        <Link
          href={`/admin/products/${params.id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Product
        </Link>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600">Update {product?.title}</p>
        </div>
      </div>
      
      {/* Similar form to create product, but prefilled */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-gray-600">
          Form similar to Create Product page, but with existing data loaded.
          Would include fields to update title, price, description, etc.
        </p>
      </div>
    </div>
  )
}