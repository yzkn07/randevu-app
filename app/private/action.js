"use server"
import { formatRandevuData } from "@/utils/functions/functions";
import { createClient } from "@/utils/supabase/server";

export default  async function GetRandevu(){

    const supabase = createClient()

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const userId = userData.user.id;
 
    
    if (userError || !userData) {
        console.error('Kullanıcı bilgileri alınırken hata:', userError);
        return { error: 'Kullanıcı giriş yapmamış.' };
      }
    // console.log(userData.user.user_metadata.name);
    

    let { data: randevu_slotlari, error } = await supabase
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
          doktor_adi,
          doktor_soyadi,
          bolumler (bolum_adi),
          subeler (sube_adi)
        )
      `)
      .eq('hasta_id', userId)
      .eq('musaitlik_durumu', 'dolu');

      if (error) {
        console.log('Randevu verileri alınırken hata:', error);
      
      }

      const formattedRandevu = formatRandevuData(randevu_slotlari)
    // console.log(randevu_slotlari);

      return formattedRandevu;
}

export async function CancelRandevu(randevuId) {
  const supabase = createClient();
  
  const { data: updatedRandevu, error } = await supabase
    .from('randevu_slotlari')
    .update({ musaitlik_durumu: 'bos', hasta_id: null })
    .eq('id', randevuId);

  if (error) {
    console.error("Randevu iptal edilirken hata oluştu:", error);
    return { error };
  }

  return updatedRandevu;
}

export async function hastaData() {
  const supabase = createClient()

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const userId = userData.user.id;

    const { data: hastaData , error } = await supabase
    .from('hastalar')
    .select('*')
    .eq('id', userId)

    return { hastaData }
}