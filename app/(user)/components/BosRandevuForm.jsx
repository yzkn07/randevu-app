"use client";
import { useRouter, useSearchParams,  } from "next/navigation";
import { useEffect } from "react";


export default function BosRandevuForm({
  subeler,
  selectedSubeId,
  setSelectedSubeId,
}) {
    const  searchParams = useSearchParams()
    const router = useRouter()
    
  //url'de sube-id varsa ona göre sube id'yi set ediyor.
  useEffect(() => {
    const subeIdFromUrl = searchParams.get("sube-id");
    if (subeIdFromUrl) {
      setSelectedSubeId(parseInt(subeIdFromUrl));  
    }
  }, [searchParams, setSelectedSubeId]);

  const handleSube = (id) => {
    setSelectedSubeId(id);
    router.push(`?sube-id=${id}`);
  };

  if (!subeler || subeler.length === 0) {
    return <p>Şube yükleniyor...</p>;
  }

  return (

    <div className="bg-emerald-200 p-2 rounded-lg">
      <ul>
        {subeler.map((e) => (
            <li
            key={e.id}  
            onClick={() => handleSube(e.id)}
            className={`m-2 p-4 rounded-lg hover:cursor-pointer active:bg-slate-700 active:text-white ${
                selectedSubeId === e.id ? "bg-blue-500 text-white" : "bg-slate-100"
            }`}
            value={e.id}>
                {e.sube_adi}
            </li>
        ))}
      </ul>
    </div>

  );
}
