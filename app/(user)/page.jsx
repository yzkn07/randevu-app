"use client"
import Link from "next/link";

import { useEffect, useState } from "react";
import { getSubeler } from "./actions";
import BosRandevuForm from "./components/BosRandevuForm";
import SelectedInfos from "./components/SelectedInfos";
import { Suspense } from "react";


export default  function Home() {



  const [subeler, setSubeler] = useState([])
  const [selectedSubeId, setSelectedSubeId] = useState(null)



  useEffect(() => {
    async function fetchSubeler() {
      const subelerData = await getSubeler()
      setSubeler(subelerData.subeler)
      
    }
    fetchSubeler()
  },[])
  


  const selectedSube = selectedSubeId ? subeler.find(sube => sube.id === selectedSubeId) : null;
  

  return (
  <>
    <div className="flex justify-between items-center p-2">
      <h1 className="bg-blue-400 p-2 rounded-lg">MALİPOL</h1>
      <Link className="bg-lime-200 p-2 rounded-lg active:bg-black active:text-white " href={"/login"}>giriş yap</Link>
    </div>

      <div className="flex flex-col  p-2 border border-black bg-slate-200 text-black m-2 rounded-lg ">
        <div className="border-b border-black p-2 bg-lime-200 rounded-t-lg text-start">
          <p className="font-light text-xl">hızlı randevu al</p>
        </div>
        
        <div className="p-2 bg-slate-300">
          <div className="p-2">
            <p className="font-semibold text-lg text-blue-600">şube seçin</p>
          </div>


          <div className="p-2 bg-slate-100 rounded-t-lg">
            {subeler && 
            <Suspense>
              <BosRandevuForm  
                subeler={subeler}
                selectedSubeId={selectedSubeId}
                setSelectedSubeId={setSelectedSubeId}
              />
            </Suspense>
            }
          </div>


          <div className="p-2 rounded-b-lg border-t border-black bg-purple-300 "> 
            <button className="bg-red-300" type="button">devam et</button>
          </div>

        </div>

            {/* seçilen bilgileri gösterme */}
              {selectedSube && <SelectedInfos 
                selectedSube={selectedSube}
              />}
          
      </div>
  </>
  );
}
