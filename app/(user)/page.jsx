"use client"
import Link from "next/link";

import { useEffect, useState } from "react";
import { getBolumler, getDoktorlar, getRandevuSlotlari, getSubeler } from "./actions";
import BosRandevuForm from "./components/BosRandevuForm";
import SelectedInfos from "./components/SelectedInfos";
import { Suspense } from "react";


export default  function Home() {


  const [step, setStep] =useState(null) 
  const [subeler, setSubeler] = useState([])
  const [selectedSubeId, setSelectedSubeId] = useState(null)
  const [bolumler, setBolumler] = useState([]);  
  const [selectedBolumId, setSelectedBolumId] = useState(null);
  const [doktorlar, setDoktorlar] = useState([])
  const [selectedDoktorId, setSelectedDoktorId] = useState(null);
  const [buttonIsActive, setButtonIsActive ] = useState(false)
  const [bosRandevular, setBosRandevular ] = useState([])
  const [selectedRandevuId, setSelectedRandevuId] = useState(null)
  const [formattedData, setFormattedData] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false);





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
      setButtonIsActive(false)
    }
    if(selectedBolumId && step === 1){
      const doktorlarData = await getDoktorlar(selectedSubeId, selectedBolumId)
      setDoktorlar(doktorlarData.doktorlar)
      setStep(2)
      setButtonIsActive(false)
      
    }

    if(selectedDoktorId){
      const formatRandevuZamani = (baslangic_zamani, bitis_zamani) => {
        const baslangicDate = new Date(baslangic_zamani);
        const bitisDate = new Date(bitis_zamani);
    
        // Başlangıç zamanı: Hem tarih hem de saat
        const formattedBaslangic = baslangicDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });
    
        // Bitiş zamanı: Sadece saat
        const formattedBitis = bitisDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });
    
        return `Randevu Zamanı: ${formattedBaslangic} - ${formattedBitis}`;
    };

      const bosRandevularData = await getRandevuSlotlari(selectedDoktorId)
      setBosRandevular(bosRandevularData.randevu_slotlari)
      

     const newFormattedData = bosRandevular.map(randevu => ({
        id: randevu.id,
        baslangic_zamani: randevu.baslangic_zamani,
        bitis_zamani: randevu.bitis_zamani,
        randevu_zamani: formatRandevuZamani(randevu.baslangic_zamani, randevu.bitis_zamani),
        musaitlik_durumu: randevu.musaitlik_durumu,
        // hasta: `${randevu.hastalar.hasta_adi} ${randevu.hastalar.hasta_soyadi}`,
        doktor: `${randevu.doktorlar.doktor_adi} ${randevu.doktorlar.doktor_soyadi}`,
        bolum: randevu.doktorlar.bolumler.bolum_adi,
        sube: randevu.doktorlar.subeler.sube_adi 
      }))
      setFormattedData(newFormattedData)
      setStep(3)
      setButtonIsActive(false)
    }
    if(selectedRandevuId){
      setStep(4)
      setIsModalOpen(true)
    }
  }

  const handleGeri = async() => {
    if(step === 2 ){
      setStep(1)
      setSelectedDoktorId(null)
      setSelectedBolumId(null)
      setButtonIsActive(false)
    }
    if(step === 1 ){
      setSelectedDoktorId(null)
      setSelectedBolumId(null)
      setSelectedSubeId(null)
      setStep(null)
      setButtonIsActive(false)
    }
    if(step === 3 ){
      setSelectedRandevuId(null)
      setSelectedDoktorId(null)
      setStep(2)
      setButtonIsActive(false)
    }

  }
  const selectedBolum = selectedBolumId ? bolumler.find(bolum => bolum.id === selectedBolumId) : null;
  const selectedDoktor = selectedDoktorId ? doktorlar.find(doktor => doktor.id === selectedDoktorId) : null;
  const selectedRandevu = selectedRandevuId ? bosRandevular.find(randevu => randevu.id === selectedRandevuId) : null;

  
  return (
  <>
    <div className="flex justify-between items-center p-2">
      <h1 className="bg-blue-400 p-2 rounded-lg">MALİPOL</h1>
      <Link className="bg-lime-200 p-2 rounded-lg active:bg-black active:text-white " href={"/login"}>giriş yap</Link>
    </div>
    <div className="flex flex-col  p-2 border border-black bg-slate-200 text-black m-2 rounded-lg ">
          <div className="border-b border-black p-2 bg-lime-200 rounded-t-lg  text-start">
            <p className="font-light text-xl">hızlı randevu al</p>
          </div>
      
          <div className="p-2 bg-slate-300 rounded-b-lg">
            <div className="p-2">
              <p className="font-semibold text-lg text-blue-600">şube seçin</p>
            </div>

            <div className="p-2 bg-slate-100 rounded-t-lg  border-b border-black">
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
                  bosRandevular={bosRandevular}
                  setBosRandevular={setBosRandevular}
                  selectedRandevuId={selectedRandevuId}
                  setSelectedRandevuId={setSelectedRandevuId}
                />
              </Suspense>
              }
            </div>

            <div className={`${
                step !== null ? "h-16 max-h-screen opacity-100" : "h-2 opacity-0"
              } 
  w-full flex justify-between items-center relative p-2 rounded-b-lg  bg-slate-400
  transition-all duration-500 ease-in-out overflow-hidden`} 
            > 
  {step > 0 && (
    <button
      onClick={handleGeri}
      className={`
      bg-gray-500/90 text-white p-2 left-0 m-2
      px-6 py-3 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 focus:outline-none`}
      type="button"
    >
      geri git
    </button>
  )}
  <button
    onClick={handleDevam}
    disabled={!buttonIsActive}
    className={`absolute w-fit
      ${
        buttonIsActive
          ? "bg-blue-500/90 hover:bg-blue-600 text-white transform translate-x-[calc(100vw-180px)] shadow-lg left-0 m-2 visible" 
          : "bg-gray-300 text-gray-500 left-0 m-2 hidden"
      }
      px-6 py-3 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none disabled:opacity-50`}
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
                selectedRandevu={selectedRandevu}
                formattedData={formattedData}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                />
            }
      </div>
  </>
  );
}
