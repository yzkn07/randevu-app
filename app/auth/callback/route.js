import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = '/private'  // Force next to always be /private

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Always redirect to nutship.com/private regardless of environment
      return NextResponse.redirect(`https://nutship.com${next}`)
    }
  }

  // If there's an error, redirect the user to an error page with instructions
  return NextResponse.redirect('https://nutship.com/auth/auth-code-error')
}
