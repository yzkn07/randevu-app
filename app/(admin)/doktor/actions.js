"use server"

import { formatRandevuData } from "@/utils/functions/functions"
import { createClient } from "@/utils/supabase/server"


export async function getPolRandevulari() {
    const supabase = createClient()
    const { data: user } = await supabase.auth.getUser()
    
    
  // Randevu_slotlari tablosundan doktor_id'si kullanıcı id'sine eşit olanılardan dolu olanları getir
  
  const { data: randevuSlotlari } = await supabase
    .from('randevu_slotlari')
    .select(`
        id,
        baslangic_zamani,
        bitis_zamani,
        musaitlik_durumu,
        hasta_id,
        doktor_id, 
        hastalar (
                id,
                hasta_adi,
                hasta_soyadi
        ),
        doktorlar (
          id,
          doktor_adi,
          doktor_soyadi,
          bolumler (bolum_adi),
          subeler (sube_adi)
        )
      `)
      .eq('musaitlik_durumu', 'dolu')
      .eq('doktor_id', user.user.id)

      const formattedRandevu = formatRandevuData(randevuSlotlari)
      
      
      
return  formattedRandevu ;
 }

 export async function randevuEkle(formData){

  const supabase = createClient()

  const baslangicZamani = formData.get("baslangicTarihi")
  const bitisZamani = formData.get("bitisTarihi")
  
  // Date nesneleri oluştur
  const baslangicDate = new Date(baslangicZamani);
  const bitisDate = new Date(bitisZamani);
  
  // Saat dilimini Türkiye saati olarak tut
  const baslangicISO = baslangicDate.toISOString().replace('Z', '+03:00');
  const bitisISO = bitisDate.toISOString().replace('Z', '+03:00');

  const { data: user } = await supabase.auth.getUser()
  const doktorId = user.user.id
  
  // Randevu slotunu veritabanına ekle
  const { data, error } = await supabase
    .from('randevu_slotlari')
    .insert([
      {
        doktor_id: doktorId,
        baslangic_zamani: baslangicISO,
        bitis_zamani: bitisISO,
        musaitlik_durumu: 'bos', 
        hasta_id: null,
      },
    ])

  if (error) {
      console.error('Randevu eklenirken hata:', error);
  } else {
      console.log('Randevu başarıyla eklendi:', data);
  }
}
