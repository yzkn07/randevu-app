export default function SelectedInfos({ 
    selectedSube,
    selectedBolum,
    selectedDoktor,
    selectedRandevu,
    formattedData,
    isModalOpen,
    setIsModalOpen
}) {

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
            {isModalOpen && formattedData && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
      <h1 className="text-lg font-bold mb-4">Alınabilecek Uygun Boş Randevu Bilgileri</h1>
      {formattedData.map((e) => (
        <div key={e.id} className="mb-4">
          <p><span className="font-semibold">Şube:</span> {e.sube}</p>
          <p><span className="font-semibold">Bölüm:</span> {e.bolum}</p>
          <p><span className="font-semibold">Doktor:</span> {e.doktor}</p>
          <p><span className="font-semibold">Randevu Zamanı:</span> {e.randevu_zamani}</p>
        </div>
      ))}
      <button
        onClick={() => setIsModalOpen(false)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Kapat
      </button>
    </div>
  </div>
)}

        </div>
    )
}