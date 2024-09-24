export default function SelectedInfos({ 
    selectedSube,
    selectedBolum,
    selectedDoktor
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
        </div>
    )
}