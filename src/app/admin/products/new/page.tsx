'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
    const router = useRouter()

    // Form state
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [filePath, setFilePath] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    // UI state
    const [uploading, setUploading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    // STEP 1: Upload PSD to Supabase Storage
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Only allow PSD files
        if (!file.name.endsWith('.psd')) {
            alert('Please upload a PSD file')
            return
        }

        setSelectedFile(file)
        setUploading(true)

        try {
            // Create filename: products/your-file-name.psd
            const fileName = `products/${file.name}`

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('products')  // Your products bucket
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) throw error

            // Set the file path (this goes into database)
            setFilePath(fileName)
            alert('✅ File uploaded successfully!')

        } catch (error) {
            console.error('Upload error:', error)
            alert('❌ Upload failed')
        } finally {
            setUploading(false)
        }
    }

    // STEP 2: Create product entry in database
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!filePath) {
            alert('Please upload PSD file first')
            return
        }

        setSubmitting(true)

        try {
            // Insert into products table
            const { data, error } = await supabase
                .from('products')
                .insert([
                    {
                        title,
                        description,
                        price: parseFloat(price),
                        file_path: filePath,  // From upload step
                        preview_image: previewImage,
                        created_at: new Date().toISOString()
                    }
                ])
                .select()

            if (error) throw error

            alert('✅ Product created successfully!')

            // Reset form or redirect
            router.push('/admin/products')
            router.refresh()

        } catch (error) {
            console.error('Insert error:', error)
            alert('❌ Failed to create product')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-6">Create New Product</h2>

                {/* Workflow Steps Indicator */}
                <div className="mb-8 flex items-center gap-4">
                    <div className={`flex-1 text-center p-2 rounded ${filePath ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                        Step 1: Upload PSD
                    </div>
                    <div className={`flex-1 text-center p-2 rounded ${filePath && !submitting ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        Step 2: Create Entry
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* STEP 1: File Upload */}
                    <div className="border-b pb-6">
                        <h3 className="font-medium text-gray-900 mb-4">📁 Step 1: Upload PSD File</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select PSD File
                                </label>
                                <input
                                    type="file"
                                    accept=".psd"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                                />
                            </div>

                            {uploading && (
                                <div className="text-sm text-gray-600">Uploading...</div>
                            )}

                            {filePath && (
                                <div className="bg-green-50 border border-green-200 rounded p-3">
                                    <p className="text-sm text-green-700">
                                        ✅ File uploaded: <span className="font-mono">{filePath}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* STEP 2: Product Details */}
                    <div>
                        <h3 className="font-medium text-gray-900 mb-4">📝 Step 2: Product Details</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="YouTube Thumbnail Pack"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="10 Premium thumbnails..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="199"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Preview Image URL
                                </label>
                                <input
                                    type="url"
                                    value={previewImage}
                                    onChange={(e) => setPreviewImage(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="https://your-image-url.com/preview.jpg"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Upload preview image to any image hosting (or Supabase Storage)
                                </p>
                            </div>

                            {/* File Path (auto-filled) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    File Path (auto-filled)
                                </label>
                                <input
                                    type="text"
                                    value={filePath}
                                    readOnly
                                    className="w-full px-3 py-2 bg-gray-50 border rounded-md text-gray-600"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Path to PSD file in storage
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={!filePath || submitting}
                            className={`w-full py-3 px-4 rounded-md text-white font-medium
                ${!filePath || submitting
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {submitting ? 'Creating...' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}