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
