import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') 
  const next = searchParams.get('next') ?? '/private'

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // Determine whether to redirect to local or production URL
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const baseUrl = isLocalEnv ? 'http://localhost:3000' : 'https://nutship.com'
      
      // Redirect user to the correct domain with the next path
      return redirect(`${baseUrl}${next}`)
    }
  }

  // Redirect the user to an error page in case of failure
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://nutship.com'
  return redirect(`${baseUrl}/error`)
}
