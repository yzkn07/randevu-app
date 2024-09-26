"use client";
// import { useRouter, useSearchParams,  } from "next/navigation";
import { useSearchParams,  } from "next/navigation";
import { useEffect } from "react";


export default function BosRandevuForm({
  subeler,
  selectedSubeId,setSelectedSubeId,
  bolumler,
  selectedBolumId,setSelectedBolumId,
  step,setStep,
  doktorlar,
  selectedDoktorId,setSelectedDoktorId,
  buttonIsActive ,setButtonIsActive
}) {
    const  searchParams = useSearchParams()
    // const router = useRouter()
    
  //url'de sube-id varsa ona göre sube id'yi set ediyor.
  useEffect(() => {
    const subeIdFromUrl = searchParams.get("sube-id");
    const bolumIdFromUrl = searchParams.get("bolum-id");
    const doktorIdFromUrl = searchParams.get("doktor-id");
    if (subeIdFromUrl) {
      setSelectedSubeId(parseInt(subeIdFromUrl));  
    }
    if (bolumIdFromUrl) {
      setSelectedBolumId(parseInt(bolumIdFromUrl));  
    }
    if (doktorIdFromUrl) {
      setSelectedDoktorId(parseInt(doktorIdFromUrl));  
    }
    
  }, [searchParams, setSelectedSubeId, setSelectedBolumId, setSelectedDoktorId]);

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

  return (

    <div style={{
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      }} className="bg-white p-0 m-2 rounded-lg min-h-56 max-h-56 overflow-y-scroll">
        {(step === null || step === 0) &&  (
            <ul>
            {subeler.map((e) => (
                <li
                key={e.id}  
                onClick={() => handleSube(e.id)}
                className={`m-2 p-4 rounded-lg hover:cursor-pointer active:bg-slate-700 active:text-white ${
                    selectedSubeId === e.id ? "bg-blue-500 text-white " : "bg-slate-200  hover:bg-slate-400"
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
                        className={`p-4 m-2 rounded-lg ${
                            selectedBolumId === bolum.id ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-400"
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
                        className={`p-2 m-2 rounded-lg ${
                            selectedDoktorId === doktor.id ? "bg-blue-500 text-white" : "bg-gray-200"
                        } hover:cursor-pointer`}
                        >
                        {doktor.doktor_unvani} {doktor.doktor_adi} {doktor.doktor_soyadi} 
                        </li>
                    ))}  
            </ul>
         )}


    </div>

  );
}
