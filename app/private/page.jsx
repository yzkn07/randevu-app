import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SignOutButton from '@/components/SignOutButton'
import Image from 'next/image'
import GetRandevu from './action'

export default async function PrivatePage() {
  const supabase = createClient()

  // Fetch user data
  const { data, error } = await supabase.auth.getUser()

  // Redirect to login page if not authenticated
  if (error || !data?.user) {
    redirect('/login')
  }

  const formatRandevuZamani = (baslangic_zamani, bitis_zamani) => {
    const baslangicDate = new Date(baslangic_zamani);
    const bitisDate = new Date(bitis_zamani);

    // Başlangıç zamanı: Hem tarih hem de saat
    const formattedBaslangic = baslangicDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    // Bitiş zamanı: Sadece saat
    const formattedBitis = bitisDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    return `Randevu Zamanı: ${formattedBaslangic} - ${formattedBitis}`;
};


  const randevu_slotlari = await GetRandevu() || [];

  const formattedData = randevu_slotlari.map(randevu => ({
    id: randevu.id,
    baslangic_zamani: randevu.baslangic_zamani,
    bitis_zamani: randevu.bitis_zamani,
    randevu_zamani: formatRandevuZamani(randevu.baslangic_zamani, randevu.bitis_zamani),
    musaitlik_durumu: randevu.musaitlik_durumu,
    hasta: `${randevu.hastalar.hasta_adi} ${randevu.hastalar.hasta_soyadi}`,
    doktor: `${randevu.doktorlar.doktor_adi} ${randevu.doktorlar.doktor_soyadi}`,
    bolum: randevu.doktorlar.bolumler.bolum_adi,
    sube: randevu.doktorlar.subeler.sube_adi 
  }))

  
  
  
  

  // console.log(data.user);
  

  
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
          {formattedData.length > 0 ? (formattedData.map(e => (
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
