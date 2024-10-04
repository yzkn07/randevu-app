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
    
    // Supabase formatına uygun ISO string olarak al
    const baslangicDate = new Date(baslangicZamani).toISOString();
    const bitisDate = new Date(bitisZamani).toISOString();

    const { data: user } = await supabase.auth.getUser()
    const doktorId = user.user.id
    
    // Randevu slotunu veritabanına ekle
  const { data, error } = await supabase
  .from('randevu_slotlari')
  .insert([
    {
      doktor_id: doktorId,
      baslangic_zamani: baslangicDate,
      bitis_zamani: bitisDate,
      musaitlik_durumu: 'bos', 
      hasta_id: null,
    },
    ])

    if (error) {
        console.error('Randevu eklenirken hata:', error);
    } else {
        console.log('Randevu başarıyla eklendi:', data);
    }
  
    // console.log(baslangicZamani, "baslangicZamani");

    // console.log("2024-10-04T15:22", "datetime-locale formData'dan gelen format");
    // console.log("baslangic_zamani: '2024-10-03T23:48:48+00:00',", "supabaseden gelen format");
    // console.log("2024-10-04T14:00:00.000Z", "baslangic new Date:");
    // console.log("2024-10-04T14:00:00.000Z", "baslangicISOstring:");

    // zamanı supabase gönderebilecek uygun format new date + isosstring sanırım
    
 }
