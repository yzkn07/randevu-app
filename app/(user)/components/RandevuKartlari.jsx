export default function RandevuKartlari({bosRandevular, handleRandevu}) {

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bosRandevular.map((randevu) => (
        <div
          key={randevu.id}
          className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl cursor-pointer transition-shadow duration-300"
          onClick={() => handleRandevu(randevu.id)}
        >
          <h3 className="text-lg font-bold text-blue-600">{randevu.doktor}</h3>
          <p className="text-md text-gray-700">
            {randevu.baslangic_zamani} - {randevu.bitis_zamani}
          </p>
          <p className="text-sm text-gray-500">{randevu.sube}</p>
          <p className="text-sm text-gray-500">{randevu.bolum}</p>
          <button className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Randevu Al
          </button>
        </div>
      ))}
    </div>
    )
}