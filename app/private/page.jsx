import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SignOutButton from '@/components/SignOutButton'
import Image from 'next/image'

export default async function PrivatePage() {
  const supabase = createClient()

  // Fetch user data
  const { data, error } = await supabase.auth.getUser()

  // Redirect to login page if not authenticated
  if (error || !data?.user) {
    redirect('/login')
  }


  return (
    <p>
        <Image src={data.user.user_metadata.avatar_url} width={100} height={100}/>
      Hello {data.user.email}
      <span>
        <SignOutButton /> {/* Render the client-side sign-out button */}
      </span>
    </p>
  )
}
