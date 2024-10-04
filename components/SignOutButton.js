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

  return <button className='bg-white text-red-500 font-medium p-2 rounded-lg border border-red-500 active:bg-red-500 active:text-white' onClick={handleSignOut}>Çıkış Yap</button>
}
