'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function SignOutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/login') // Redirect to login page after sign-out
    }
  }

  return <button className='bg-red-600 text-white p-2 m-2 rounded-lg' onClick={handleSignOut}>Çıkış Yap</button>
}
