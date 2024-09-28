"use server"
import { createClient } from "@/utils/supabase/server"

export async function randevuyuGoruntule(randevuId) {
    const supabase = createClient()

    const {data: randevu_slotlari , error } = await supabase
    .from("randevu_slotlari")
    .select(`
        id,
        baslangic_zamani,
        bitis_zamani,
        musaitlik_durumu,
        hasta_id, 
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
    .eq('id', randevuId)
    .eq('musaitlik_durumu', 'bos');

    return { randevu_slotlari }
    
}