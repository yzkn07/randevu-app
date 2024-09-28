"use client"
import { useEffect, useState } from "react"
import { randevuyuGoruntule } from "./action"
import { formatRandevuData } from "@/utils/functions/functions";

export default function Randevu({ params }) {
    const { randevuId } = params || ""
    const [randevu, setRandevu] = useState([])
    useEffect(() => {
        async function fetchRandevu(){
          const randevuData = await randevuyuGoruntule(randevuId); 
          setRandevu(randevuData.randevu_slotlari)
          console.log(randevu);

    }
    fetchRandevu();
}, [randevuId]);  

const formattedRandevu =  formatRandevuData(randevu)
console.log(formattedRandevu);

    
    
    return(
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
    <h1 className="text-2xl font-bold text-gray-800 border-b pb-4">Seçilen Randevu</h1>

    <ul className="space-y-4">
        {formattedRandevu.map((e) => (
            <li key={e.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                <p className="text-lg font-semibold text-blue-600">Şube: {e.sube}</p>
                <p className="text-md font-medium text-green-600">Bölüm: {e.bolum}</p>
                <p className="text-md font-medium text-indigo-600">Doktor: {e.doktor}</p>
                <p className="text-sm text-gray-700">Randevu Zamanı: {e.randevu_zamani}</p>
            </li>
        ))}
    </ul>
</div>

    )
}
