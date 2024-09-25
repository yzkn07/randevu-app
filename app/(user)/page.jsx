"use client"
import Link from "next/link";

import { useEffect, useState } from "react";
import { getBolumler, getDoktorlar, getSubeler } from "./actions";
import BosRandevuForm from "./components/BosRandevuForm";
import SelectedInfos from "./components/SelectedInfos";
import { Suspense } from "react";


export default  function Home() {


  const [step, setStep] =useState(0) 
  const [subeler, setSubeler] = useState([])
  const [selectedSubeId, setSelectedSubeId] = useState(null)
  const [bolumler, setBolumler] = useState([]);  
  const [selectedBolumId, setSelectedBolumId] = useState(null);
  const [doktorlar, setDoktorlar] = useState([])
  const [selectedDoktorId, setSelectedDoktorId] = useState(null);
  const [buttonIsActive, setButtonIsActive ] = useState(false)

  useEffect(() => {
    async function fetchSubeler() {
      const subelerData = await getSubeler()
      setSubeler(subelerData.subeler)
      
    }
    fetchSubeler()
  },[])
  const selectedSube = selectedSubeId ? subeler.find(sube => sube.id === selectedSubeId) : null;
  
  
  const handleDevam = async () => {
    if(selectedSubeId && step === 0){
      const bolumlerData = await getBolumler(selectedSubeId)
      setBolumler(bolumlerData);
      setStep(1)
      
    }
    if(selectedBolumId && step === 1){
      const doktorlarData = await getDoktorlar(selectedSubeId, selectedBolumId)
      setDoktorlar(doktorlarData.doktorlar)
      setStep(2)
      
    }

    if(selectedDoktorId){
      alert("artık boş randevu slotlarını göstere bilirsin :)")
    }
  }

  const handleGeri = async() => {
    if(step === 2 ){
      setStep(1)
      setSelectedDoktorId(null)
      setSelectedBolumId(null)
    }
    if(step === 1 ){
      setStep(0)
    }
  }
  const selectedBolum = selectedBolumId ? bolumler.find(bolum => bolum.id === selectedBolumId) : null;
  const selectedDoktor = selectedDoktorId ? doktorlar.find(doktor => doktor.id === selectedDoktorId) : null;

  
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
                              step={step}
                              setStep={setStep}
                              subeler={subeler}
                              selectedSubeId={selectedSubeId}
                              setSelectedSubeId={setSelectedSubeId}
                              bolumler={bolumler}
                              selectedBolumId={selectedBolumId}
                              setSelectedBolumId={setSelectedBolumId}
                              doktorlar={doktorlar}
                              selectedDoktorId={selectedDoktorId}
                              setSelectedDoktorId={setSelectedDoktorId}
                              buttonIsActive={buttonIsActive}
                              setButtonIsActive={setButtonIsActive}
                            />
                          </Suspense>
                          }
                        </div>

 
                              <div className={`h-16 w-full flex justify-between items-center relative p-2 rounded-b-lg border-t border-black bg-orange-400`}> 
                                  {step > 0 && (
                                    <button onClick={handleGeri} className="bg-red-300" type="button">geri git</button>
                                  )}
                                        <button
                                          onClick={handleDevam}
                                          disabled={!buttonIsActive}
                                          className={`absolute w-fit
                                            ${
                                              buttonIsActive
                                                ? "bg-blue-500 hover:bg-blue-600 text-white transform translate-x-[calc(100vw-180px)]  shadow-lg  left-0 m-2" 
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed left-0 m-2"
                                            }
                                            px-6 py-3 rounded-lg transition-transform duration-1000 ease-in-out hover:scale-105 focus:outline-none disabled:opacity-50`}
                                          type="button"
                                        >
                                          devam et
                                        </button>
                              </div>

                </div>

            {/* seçilen bilgileri gösterme */}
              {selectedSube && 
                <SelectedInfos 
                  selectedSube={selectedSube}
                  selectedBolum={selectedBolum}
                  selectedDoktor={selectedDoktor}
                  />
              }
              
       </div>
  </>
  );
}
