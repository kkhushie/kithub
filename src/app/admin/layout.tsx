import { createClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    LogOut,
    ChevronRight,
    User
} from 'lucide-react'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    // Admin emails
    const adminEmails = ['khushipal1470@gmail.com', 'admin@kithub.tech']

    if (!user || !adminEmails.includes(user.email!)) {
        redirect('/')
    }

    // Get user profile for avatar/name
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single()

    const handleSignOut = async () => {
        'use server'
        const supabase = await createClient()
        await supabase.auth.signOut()
        redirect('/')
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Add Product', href: '/admin/products/new', icon: PlusCircle },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-18">
                        {/* Logo and Brand */}
                        <Link href="/" className="flex items-center gap-0">
                            <div className="relative w-16 h-16">
                                <img
                                    src="/favicon.ico"
                                    alt="logo"
                                    className="w-full h-full absolute top-1 object-contain"
                                />
                            </div>
                            <div>
                                <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-hand)' }}>Kithub</div>
                                <div className="text-xs text-gray-600 -mt-1">Admin Panel</div>
                            </div>
                        </Link>
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition"
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                        {profile?.full_name || user.email}
                                    </p>
                                    <p className="text-xs text-gray-500">Admin</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-black to-gray-900 flex items-center justify-center text-white">
                                    <User className="w-4 h-4" />
                                </div>
                            </div>

                            <form action={handleSignOut}>
                                <button
                                    type="submit"
                                    className="p-2 text-gray-400 hover:text-gray-600 transition rounded-lg hover:bg-gray-100"
                                    title="Sign out"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition whitespace-nowrap"
                            >
                                <item.icon className="w-3 h-3" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-8">
                {children}
            </main>
        </div>
    )
}