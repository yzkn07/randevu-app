export default function RandevuKartlari({bosRandevular, handleRandevu}) {

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bosRandevular.map((randevu) => (
        <div
          key={randevu.id}
          className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl cursor-pointer transition-shadow duration-300"
          onClick={() => handleRandevu(randevu.id)}
        >
          <p className="text-md text-gray-700">
            {randevu.randevu_zamani}
          </p>
        </div>
      ))}
    </div>
    )
}