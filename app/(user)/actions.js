"use server"
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