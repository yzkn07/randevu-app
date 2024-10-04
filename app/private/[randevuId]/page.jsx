"use client"
import { useEffect, useState } from "react"
import { randevuyuGoruntule, SaveRandevu } from "./action"
import { formatRandevuData } from "@/utils/functions/functions";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Randevu({ params }) {
    const router = useRouter()

    const { randevuId } = params || ""
    const [randevu, setRandevu] = useState([])
    const [userId, setUserId] = useState(null)
    const [ randevuOnayModal, setRandevuOnayModal] = useState(false)


    useEffect(() => {
        async function fetchRandevu(){
          const randevuData = await randevuyuGoruntule(randevuId); 
          setRandevu(randevuData.randevu_slotlari)


    }
    fetchRandevu();
}, [randevuId]);  

useEffect(() => {

    async function fetchUserId() {
        const supabase = createClient();
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (!userError && userData) {
            setUserId(userData.user.id);
        }
    }
    fetchUserId();
}, []);

const formattedRandevu =  formatRandevuData(randevu)

const handleAra = () => {
    router.push("/")
}
  
const handleRandevuAl =  () => {
    if (userId) {
        SaveRandevu(randevuId, userId);
        setRandevuOnayModal(true)
            setTimeout(() => {
                setRandevuOnayModal(false)
                router.push("/private")
            }, 1500);
    } else {
        console.error("User ID not found.");
    }
}

return(
    <div className="max-w-xl flex flex-col h-screen gap-8 justify-start items-center p-8 bg-white rounded-lg shadow-lg border border-gray-200">
  
  {/* Başlık */}
  <h1 className="text-3xl font-bold text-blue-800 border-b-4 border-blue-300 pb-4 mt-10 rounded-md text-center w-full">
    Randevunu Onayla
  </h1>

  {/* Randevu Bilgileri */}
  <ul className="w-full space-y-4">
    {formattedRandevu ? (
      formattedRandevu.map((e) => (
        <li key={e.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-gray-100 transition duration-300">
          <p className="text-lg font-bold text-blue-700 mb-2">Şube: <span className="font-normal text-gray-700">{e.sube}</span></p>
          <p className="text-md font-semibold text-blue-600 mb-1">Bölüm: <span className="font-normal text-gray-700">{e.bolum}</span></p>
          <p className="text-md font-semibold text-blue-600 mb-1">Doktor: <span className="font-normal text-gray-700">{e.doktor}</span></p>
          <p className="text-md font-semibold text-blue-600">Randevu Zamanı: <span className="font-normal text-gray-700">{e.randevu_zamani}</span></p>
          
          {/* Butonlar */}
          <div className="flex justify-between items-center mt-4">
            <button 
              onClick={() => handleAra()} 
              className="bg-gray-200 text-gray-700 p-2 font-semibold text-lg rounded-lg hover:bg-gray-300 hover:text-gray-800 transition-colors duration-300"
            >
              Randevu Ara
            </button>
            <button 
              onClick={() => handleRandevuAl()}
              className="bg-blue-600 px-8 py-2 font-semibold text-lg text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-300"
            >
              Onayla
            </button>
          </div>
        </li>
      ))
    ) : (
      <p className="text-gray-600 text-center">Seçili randevu yok</p>
    )}
  </ul>

  {/* Onay Bildirimi */}
  {randevuOnayModal && (   
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg transform transition-transform duration-500 scale-105">
        <h1 className="text-2xl font-bold text-center text-green-600">Randevu Onaylandı!</h1>
      </div>
    </div>
  )}
</div>


)
}
