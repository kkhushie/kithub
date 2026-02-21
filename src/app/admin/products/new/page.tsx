'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Upload,
    Package,
    FileText,
    DollarSign,
    Image as ImageIcon,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Loader2,
    X,
    Save,
    HelpCircle
} from 'lucide-react'

export default function NewProductPage() {
    const router = useRouter()

    // Form state
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [filePath, setFilePath] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [category, setCategory] = useState('podcast') // Default category

    // UI state
    const [uploading, setUploading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    // Categories for dropdown
    const categories = [
        { value: 'podcast', label: '🎙️ Podcast Thumbnail' },
        { value: 'youtube', label: '📺 YouTube Thumbnail' },
        { value: 'instagram', label: '📱 Instagram Post' },
        { value: 'logo', label: '🎨 Logo Design' },
        { value: 'social', label: '📊 Social Media' },
        { value: 'other', label: '📁 Other' }
    ]

    // STEP 1: Upload PSD to Supabase Storage
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.name.endsWith('.psd')) {
            setErrors({ ...errors, file: 'Please upload a PSD file' })
            return
        }

        // Validate file size (max 100MB)
        const maxSize = 100 * 1024 * 1024 // 100MB
        if (file.size > maxSize) {
            setErrors({ ...errors, file: 'File size must be less than 100MB' })
            return
        }

        setSelectedFile(file)
        setUploading(true)
        setErrors({})

        try {
            // Simulate progress (since Supabase doesn't provide progress events)
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval)
                        return 90
                    }
                    return prev + 10
                })
            }, 200)

            // Create filename: products/your-file-name.psd
            const fileName = `products/${Date.now()}-${file.name}`

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('products')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            clearInterval(progressInterval)
            setUploadProgress(100)

            if (error) throw error

            // Set the file path
            setFilePath(fileName)

            // Auto-fill title from filename if empty
            if (!title) {
                const fileNameWithoutExt = file.name.replace('.psd', '')
                setTitle(fileNameWithoutExt.replace(/-/g, ' '))
            }

        } catch (error) {
            console.error('Upload error:', error)
            setErrors({ ...errors, file: 'Upload failed. Please try again.' })
        } finally {
            setTimeout(() => {
                setUploading(false)
                setUploadProgress(0)
            }, 500)
        }
    }

    // Validate form
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!title.trim()) newErrors.title = 'Title is required'
        if (!description.trim()) newErrors.description = 'Description is required'
        if (!price) newErrors.price = 'Price is required'
        if (parseFloat(price) <= 0) newErrors.price = 'Price must be greater than 0'
        if (!filePath) newErrors.file = 'Please upload a PSD file first'
        if (!previewImage.trim()) newErrors.previewImage = 'Preview image URL is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // STEP 2: Create product entry in database
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setSubmitting(true)

        try {
            // Insert into products table
            const { data, error } = await supabase
                .from('products')
                .insert([
                    {
                        title,
                        description,
                        price: Math.round(parseFloat(price)),
                        file_path: filePath,
                        preview_image: previewImage,
                        category,
                        active: true
                    }
                ])
                .select()

            console.log("data :", data)

            if (error) throw error

            // Show success message
            const successMessage = document.createElement('div')
            successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in'
            successMessage.innerHTML = '✅ Product created successfully!'
            document.body.appendChild(successMessage)
            setTimeout(() => successMessage.remove(), 3000)

            // Redirect
            setTimeout(() => {
                router.push('/admin/products')
                router.refresh()
            }, 1000)

        } catch (error) {
            console.error('Insert error:', error)
            setErrors({ ...errors, submit: 'Failed to create product. Please try again.' })
        } finally {
            setSubmitting(false)
        }
    }

    // Cancel and go back
    const handleCancel = () => {
        if (confirm('Are you sure? Any unsaved changes will be lost.')) {
            router.push('/admin/products')
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header with back button */}
            <div className="mb-6">
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
                        <p className="text-gray-600">Upload a PSD file and create a product listing</p>
                    </div>
                </div>
            </div>

            {/* Main Form */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {/* Progress Steps */}
                <div className="px-6 py-4 bg-gray-50 border-b">
                    <div className="flex items-center justify-between max-w-2xl mx-auto">
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${filePath ? 'bg-green-500' : 'bg-indigo-600'
                                } text-white`}>
                                {filePath ? <CheckCircle className="w-4 h-4" /> : '1'}
                            </div>
                            <span className={`text-sm font-medium ${filePath ? 'text-green-600' : 'text-gray-700'}`}>
                                Upload PSD
                            </span>
                        </div>

                        <div className="w-16 h-px bg-gray-300"></div>

                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${filePath && !submitting ? 'bg-indigo-600' : 'bg-gray-300'
                                } text-white`}>
                                2
                            </div>
                            <span className={`text-sm font-medium ${filePath ? 'text-gray-700' : 'text-gray-400'}`}>
                                Product Details
                            </span>
                        </div>

                        <div className="w-16 h-px bg-gray-300"></div>

                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                3
                            </div>
                            <span className="text-sm font-medium text-gray-400">Publish</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Error Alert */}
                    {errors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-red-800">{errors.submit}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setErrors({ ...errors, submit: '' })}
                                className="ml-auto text-red-600 hover:text-red-800"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* STEP 1: File Upload */}
                    <div className={`p-6 rounded-lg border-2 transition ${filePath ? 'border-green-200 bg-green-50' : 'border-gray-200 border-dashed'
                        }`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${filePath ? 'bg-green-100' : 'bg-indigo-100'
                                }`}>
                                <Upload className={`w-4 h-4 ${filePath ? 'text-green-600' : 'text-indigo-600'}`} />
                            </div>
                            <h3 className="font-medium text-gray-900">Step 1: Upload PSD File</h3>
                            {filePath && (
                                <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                    Completed
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            {!filePath ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition group">
                                    <input
                                        type="file"
                                        accept=".psd"
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer"
                                    >
                                        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition">
                                            <Upload className="w-8 h-8 text-indigo-600" />
                                        </div>
                                        <p className="text-lg font-medium text-gray-700 mb-2">
                                            Click to upload PSD file
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            or drag and drop (max 100MB)
                                        </p>
                                    </label>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg border p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-indigo-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">{selectedFile?.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {(selectedFile?.size || 0) / (1024 * 1024) < 1
                                                        ? `${((selectedFile?.size || 0) / 1024).toFixed(2)} KB`
                                                        : `${((selectedFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB`
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFilePath('')
                                                setSelectedFile(null)
                                            }}
                                            className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 block">
                                        {filePath}
                                    </code>
                                </div>
                            )}

                            {uploading && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Uploading...</span>
                                        <span className="text-indigo-600 font-medium">{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {errors.file && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.file}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* STEP 2: Product Details */}
                    <div className={`p-6 rounded-lg border-2 ${filePath ? 'border-gray-200' : 'border-gray-200 opacity-50'
                        }`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <Package className="w-4 h-4 text-indigo-600" />
                            </div>
                            <h3 className="font-medium text-gray-900">Step 2: Product Details</h3>
                        </div>

                        <div className="space-y-5">
                            {/* Category Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.title ? 'border-red-300 bg-red-50' : ''
                                        }`}
                                    placeholder="e.g., Podcast Thumbnail - Interview Style"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.description ? 'border-red-300 bg-red-50' : ''
                                        }`}
                                    placeholder="Describe your PSD file - what's included, dimensions, features..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.description}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    {description.length}/500 characters
                                </p>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price ($) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.price ? 'border-red-300 bg-red-50' : ''
                                            }`}
                                        placeholder="29.99"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            {/* Preview Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preview Image URL <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="url"
                                        value={previewImage}
                                        onChange={(e) => setPreviewImage(e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.previewImage ? 'border-red-300 bg-red-50' : ''
                                            }`}
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>
                                {errors.previewImage && (
                                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.previewImage}
                                    </p>
                                )}

                                {/* Preview Image Example */}
                                {previewImage && (
                                    <div className="mt-3 flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-16 h-16 object-cover rounded border"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none'
                                            }}
                                        />
                                        <div className="flex-1">
                                            <p className="text-xs font-medium text-gray-700">Preview</p>
                                            <p className="text-xs text-gray-500 break-all">{previewImage}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* File Path (read-only) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    File Path
                                </label>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700 border">
                                        {filePath || 'No file uploaded'}
                                    </code>
                                    <div className="relative group">
                                        <HelpCircle className="w-5 h-5 text-gray-400 cursor-help" />
                                        <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded-lg">
                                            This path is automatically set when you upload a file
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!filePath || submitting}
                            className={`px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition ${!filePath || submitting
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow'
                                }`}
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Create Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Help Section */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-blue-800 mb-1">Need help?</h4>
                        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                            <li>Upload PSD files first - they'll be stored in the 'products' bucket</li>
                            <li>Preview images can be from any image hosting service (Unsplash, Imgur, etc.)</li>
                            <li>Make sure your PSD file name is descriptive (e.g., podcast-thumbnail-dark.psd)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}