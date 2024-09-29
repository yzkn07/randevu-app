import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SignOutButton from '@/components/SignOutButton'
import Image from 'next/image'
import GetRandevu from './action'
import { formatRandevuData } from '@/utils/functions/functions'
import Link from 'next/link'

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
    <div className="max-w-3xl mx-auto my-1 p-2 bg-white shadow-lg rounded-lg">
    {/* Kullanıcı Bilgisi */}
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Hoşgeldiniz, <span className="text-blue-600">{data.user.email}</span></h1>
      </div>
      <SignOutButton />
    </div>
  
    {/* Randevu Ara Butonu */}
    <div className="mb-6">
      <Link href={"/"} className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
        Randevu Ara
      </Link>
    </div>
  
    {/* Randevular */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Randevularınız</h2>
      <ul className="space-y-4">
        {formattedRandevuSlotlari.length > 0 ? (
          formattedRandevuSlotlari.map((e) => (
            <li key={e.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
              <p className="text-lg font-semibold text-blue-600">Hasta: {e.hasta}</p>
              <p className="text-md font-medium text-green-600">Şube: {e.sube}</p>
              <p className="text-md font-medium text-indigo-600">Bölüm: {e.bolum}</p>
              <p className="text-md font-medium text-purple-600">Doktor: {e.doktor}</p>
              <p className="text-sm text-gray-700">Randevu Zamanı: {e.randevu_zamani}</p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">Henüz randevunuz yok.</p>
        )}
      </ul>
    </div>
  </div>
  
  )
}
