import { createClient, supabaseServer } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const code = url.searchParams.get("code")

    if (code) {
        const supabase = await createClient()
        const { data, error } =
            await supabase.auth.exchangeCodeForSession(code)

        if (data?.user) {

            await supabaseServer
                .from("users")
                .upsert({
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.user_metadata.full_name,
                    avatar_url: data.user.user_metadata.avatar_url
                })
        }
    }

    return NextResponse.redirect(`${url.origin}/dashboard`)
}