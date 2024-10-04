"use client";
// import { useRouter, useSearchParams,  } from "next/navigation";
import { useSearchParams,  } from "next/navigation";
import { useEffect } from "react";
import RandevuKartlari from "./RandevuKartlari";
import { formatRandevuData } from "@/utils/functions/functions";


export default function BosRandevuForm({
  subeler,
  selectedSubeId,setSelectedSubeId,
  bolumler,
  selectedBolumId,setSelectedBolumId,
  step,setStep,
  doktorlar,
  selectedDoktorId,setSelectedDoktorId,
  buttonIsActive ,setButtonIsActive,
  bosRandevular, setBosRandevular,
  selectedRandevuId,setSelectedRandevuId,
  formattedData,setFormattedData

}) {
    const  searchParams = useSearchParams()
    // const router = useRouter()
    
  //url'de sube-id varsa ona göre sube id'yi set ediyor.
  // useEffect(() => {
  //   const subeIdFromUrl = searchParams.get("sube-id");
  //   const bolumIdFromUrl = searchParams.get("bolum-id");
  //   const doktorIdFromUrl = searchParams.get("doktor-id");
  //   if (subeIdFromUrl) {
  //     setSelectedSubeId(parseInt(subeIdFromUrl));  
  //   }
  //   if (bolumIdFromUrl) {
  //     setSelectedBolumId(parseInt(bolumIdFromUrl));  
  //   }
  //   if (doktorIdFromUrl) {
  //     setSelectedDoktorId(parseInt(doktorIdFromUrl));  
  //   }
    
  // }, [searchParams, setSelectedSubeId, setSelectedBolumId, setSelectedDoktorId]);


  const handleSube = (id) => {
    setSelectedSubeId(id);
    // router.push(`?sube-id=${id}`);
    setButtonIsActive(true)
    setStep(0)
    
  };

  if (!subeler || subeler.length === 0) {
    return <p>Şubeler yükleniyor...</p>;
  }

  const handleBolum = (bolumId) => {
    setSelectedBolumId(bolumId); 
    // router.push(`?sube-id=${selectedSubeId}&bolum-id=${bolumId}`)
    setButtonIsActive(true)

  }

  const handleDoktor = (doktorId) => {
    setSelectedDoktorId(doktorId); 
    // router.push(`?sube-id=${selectedSubeId}&bolum-id=${selectedBolumId}&doktor-id=${doktorId}`)
    setButtonIsActive(true)
  }

  const handleRandevu = (randevuId) => {
    setSelectedRandevuId(randevuId); 
    // router.push(`?sube-id=${selectedSubeId}&bolum-id=${selectedBolumId}&doktor-id=${doktorId}`)
    setButtonIsActive(true)

  }

  // const formattedBosRandevular = formatRandevuData(bosRandevular)
  // console.log(formattedBosRandevular);
  
  return (

    <div style={{
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
      }} className="bg-white p-0 m-0 rounded-t-lg min-h-52 max-h-52 overflow-y-scroll">
        {(step === null || step === 0) &&  (
            <ul>
            {subeler.map((e) => (
                <li
                key={e.id}  
                onClick={() => handleSube(e.id)}
                className={`shadow-md m-2 p-4 rounded-lg hover:cursor-pointer active:bg-slate-700 active:text-white ${
                    selectedSubeId === e.id ? "bg-blue-500 text-white " : "bg-slate-50 hover:bg-slate-400"
                }`}
                value={e.id}>
                    {e.sube_adi}
                </li>
            ))}
        </ul>
        ) }

        {step === 1 && (
            <ul>
            {bolumler.map((bolum) => (
                        <li
                        key={bolum.id}  
                        onClick={() => handleBolum(bolum.id)}  
                        className={`shadow-md p-4 m-2 rounded-lg ${
                            selectedBolumId === bolum.id ? "bg-blue-500 text-white" : "bg-slate-50 hover:bg-gray-400"
                        } hover:cursor-pointer `}
                        >
                        {bolum.bolum_adi}
                        </li>
                    ))}  
            </ul>
        )}

         {step === 2 && (
            <ul>
            {doktorlar.map((doktor) => (
                        <li
                        key={doktor.id}  
                        onClick={() => handleDoktor(doktor.id)}  
                        className={`shadow-md p-2 m-2 rounded-lg ${
                            selectedDoktorId === doktor.id ? "bg-blue-500 text-white" : "bg-slate-50 hover:bg-gray-400"
                        } hover:cursor-pointer`}
                        >
                        {doktor.doktor_unvani} {doktor.doktor_adi} {doktor.doktor_soyadi} 
                        </li>
                    ))}  
            </ul>
         )}

         {step === 3 && (
            bosRandevular.length > 0 ? (
              <RandevuKartlari bosRandevular={formattedData} handleRandevu={handleRandevu}/>
            )
          : (
          <div className="flex justify-center items-center min-h-52">
            <p className="rounded-xl border border-red-500 text-red-500 p-4 font-semibold">boş randevu bulunamadı</p>
          </div>
         ))}

    </div>

  );
}
