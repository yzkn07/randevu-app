"use server"
import { formatRandevuData } from "@/utils/functions/functions";
import { createClient } from "@/utils/supabase/server";

export async function getSubeler() {
    const supabase = createClient()
       
    const { data: subeler, error } = await supabase.from('subeler').select('*')
    if(error){
        console.error("şubeler alınırken hata oluştu",error);
    }
    
    return { subeler };
}

export async function getBolumler(subeId) {
    const supabase = createClient()
    const {data : bolumlerTablo, error} = await supabase
        .from('doktorlar')
        .select(`
            id,
            doktor_adi,
            doktor_soyadi,
            bolum_id,
            sube_id,
            doktor_unvani, 
            bolumler (
                    id,
                    bolum_adi
            ),
            subeler (
              id,
              sube_adi
            )
          `)
    .eq('sube_id', subeId)

    if (error) {
        console.log('Error fetching bolumler:', error);

    }

  // Hem bolum_adi hem de id'yi uniq yap, burayı araştır.
  const uniqueBolumler = Array.from(new Map(
    bolumlerTablo.map(doktor => [doktor.bolumler.bolum_adi, doktor.bolumler])
).values());

return uniqueBolumler;

}

export async function getDoktorlar(subeId,bolumId) {
    const supabase = createClient()
    const {data : doktorlar, error} = await supabase
        .from('doktorlar')
        .select(`
            id,
            doktor_adi,
            doktor_soyadi,
            bolum_id,
            sube_id,
            doktor_unvani, 
            bolumler (
                    id,
                    bolum_adi
            ),
            subeler (
              id,
              sube_adi
            )
          `)
    .eq('sube_id', subeId)
    .eq('bolum_id', bolumId)

    if (error) {
        console.log('Error fetching doktorlar:', error);
    }

    
    return { doktorlar }
}

export async function getRandevuSlotlari(doktorId){
 const supabase = createClient()
 const { data: randevu_slotlari, error } = await supabase
    .from('randevu_slotlari')
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
    .eq('doktor_id', doktorId)
    .eq('musaitlik_durumu', 'bos');

    const formattedRandevu = formatRandevuData(randevu_slotlari)
    return  formattedRandevu
}

export async function getUser() {
    const supabase = createClient()

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    console.log(userId,"userId");
    
    return { userId }
 
}