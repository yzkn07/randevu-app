import { useRouter } from "next/navigation"

export default function SelectedInfos({ 
    selectedSube,
    selectedBolum,
    selectedDoktor,
    selectedRandevu,
    formattedData,
    isModalOpen,
    setIsModalOpen,
    isAuthenticated,
    setIsAuthenticated,
    selectedRandevuId,
    setSelectedRandevuId,
    yonlendirme,
    setYonlendirme,
}) {
    const router = useRouter()


    const handleRandevu = (randevuId) => {
        if(!isAuthenticated){
            setSelectedRandevuId(randevuId);
            router.push(`/login/?randevu-id=${randevuId}`)

        } else {
            setSelectedRandevuId(randevuId);
            router.push(`/private/${randevuId}`)
        }
    }

    const selectedRandevuModal = formattedData?.find((e) => e.id === selectedRandevuId);

    return (
        <div className="p-4 bg-slate-300 -mt-2 rounded-xl outline outline-slate-200  -outline-offset-8">    
            {/* şeçimleri göster */}
            {selectedSube && (
                <div className="flex justify-start items-center">
                    <p>Şube:</p>
                    <p className="bg-slate-500 p-4 m-2 rounded-xl text-white">{selectedSube.sube_adi}</p>
                </div>
            )}
            {selectedBolum && (
                <div className="flex justify-start items-center">
                    <p>Bölüm:</p>
                    <p className="bg-slate-500 p-4 m-2 rounded-xl text-white">{selectedBolum.bolum_adi}</p>
                </div>
            )}
            {selectedDoktor && (
                <div className="flex justify-start items-center">
                    <p>Doktor:</p>
                    <p className="bg-slate-500 p-4 m-2 rounded-xl text-white">
                    {selectedDoktor.doktor_unvani} {selectedDoktor.doktor_adi} {selectedDoktor.doktor_soyadi} 
                    </p>
                </div>
            )}
            {selectedRandevu && (
                <div className="flex justify-start items-center">
                    <p>randevu:</p>
                    <p className="bg-slate-500 p-4 m-2 rounded-xl text-white">
                    {selectedRandevu.baslangic_zamani} 
                    </p>
                </div>
            )}

{/* bir randevu slotu seçilince o randevunun özet bilgisi ekrana gelir */}
            {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 shadow-2xl">
    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
      <button
        onClick={() => setIsModalOpen(false)}
        className="ms-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 float-end"
      >
        Kapat
      </button>
      <h1 className="text-lg font-bold mb-4">Randevu Bilgileri</h1>
        {selectedRandevuModal && (
            <div key={selectedRandevuModal.id} className="mb-4">
                <p><span className="font-semibold">Şube:</span> {selectedRandevuModal.sube}</p>
                <p><span className="font-semibold">Bölüm:</span> {selectedRandevuModal.bolum}</p>
                <p><span className="font-semibold">Doktor:</span> {selectedRandevuModal.doktor}</p>
                <p><span className="font-semibold">Randevu Zamanı:</span> {selectedRandevuModal.randevu_zamani}</p>
            </div>
        )}

      <button onClick={() => handleRandevu(selectedRandevuId)}  className="bg-blue-400 p-2 w-full rounded-xl hover:bg-blue-500 hover:text-white shadow-xl font-semibold text-lg">{yonlendirme}</button>
    </div>
  </div>
)}

        </div>
    )
}