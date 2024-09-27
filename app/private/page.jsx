import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SignOutButton from '@/components/SignOutButton'
import Image from 'next/image'
import GetRandevu from './action'
import { formatRandevuData } from '@/utils/functions/functions'

export default async function PrivatePage() {
  const supabase = createClient()

  // Fetch user data
  const { data, error } = await supabase.auth.getUser()

  // Redirect to login page if not authenticated
  if (error || !data?.user) {
    redirect('/login')
  }

  const randevu_slotlari = await GetRandevu() || [];
  const formattedRandevuSlotlari = formatRandevuData(randevu_slotlari);

  return (
    <div>
        {/* <Image src={data.user.user_metadata.avatar_url} width={100} height={100} alt='user' priority/> */}
      Hoşgeldiniz {data.user.email}
      <span>
        <SignOutButton /> 
      </span>

      <div>
        <h2>randevularınız</h2>
        <ul>
          {formattedRandevuSlotlari.length > 0 ? (formattedRandevuSlotlari.map(e => (
            <li key={e.id}>
              <p>Hasta: {e.hasta}</p>
              <p>Şube: {e.sube}</p>
              <p>Bölüm: {e.bolum}</p>
              <p>Doktor: {e.doktor}</p>
              <p>Randevu Zamanı: {e.randevu_zamani}</p>
            </li>
          ))) : (
            <p>Henüz randevunuz yok.</p>
          )}
        </ul>
      </div>
    </div>
  )
}
