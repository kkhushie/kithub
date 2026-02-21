import { createClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    // Check if user is admin
    // You can either:
    // Option A: Check email
    const adminEmails = ['khushipal1470@gmail.com', 'admin@kithub.tech']

    if (!user || !adminEmails.includes(user.email!)) {
        console.log('User is ', user)
        redirect('/') // Not admin, go home
    }

    // Option B: Check admin flag in profiles table (better for multiple admins)
    // const { data: profile } = await supabase
    //   .from('profiles')
    //   .select('is_admin')
    //   .eq('id', user.id)
    //   .single()
    // 
    // if (!profile?.is_admin) redirect('/')

    return (
        <div className="min-h-screen">
            {/* Admin Header */}
            {/* <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="relative w-10 h-10">
                                <img
                                    src="/favicon.ico"
                                    alt="logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Kithub Admin</h1>
                        </div>
                        <nav className="flex gap-4">
                            <a href="/admin" className="text-gray-600 hover:text-gray-900">Dashboard</a>
                            <a href="/admin/products" className="text-gray-600 hover:text-gray-900">Products</a>
                            <a href="/admin/products/new" className="text-gray-600 hover:text-gray-900">+ New Product</a>
                        </nav>
                    </div>
                </div>
            </header> */}

            <main className="py-8">
                {children}
            </main>
        </div>
    )
}