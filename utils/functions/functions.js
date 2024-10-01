export  function getSelectedItem(list, id) {
    return id ? list.find((item) => item.id === id) : null;
  }


export  function formatRandevuZamani(baslangic_zamani, bitis_zamani){

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
            hour12: false,
        });
    
        // Bitiş zamanı: Sadece saat
        const formattedBitis = bitisDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        });
    
        return `${formattedBaslangic} - ${formattedBitis}`
}

export function formatRandevuData(randevuList) {
  return randevuList?.map((randevu) => ({
    id: randevu.id,
    baslangic_zamani: randevu.baslangic_zamani,
    bitis_zamani: randevu.bitis_zamani,
    randevu_zamani: formatRandevuZamani(
      randevu.baslangic_zamani,
      randevu.bitis_zamani
    ),
    musaitlik_durumu: randevu.musaitlik_durumu,
    hasta: `${randevu.hastalar?.hasta_adi || ''} ${randevu.hastalar?.hasta_soyadi || ''}`,
    doktor: `${randevu.doktorlar.doktor_adi} ${randevu.doktorlar.doktor_soyadi}`,
    bolum: randevu.doktorlar.bolumler.bolum_adi,
    sube: randevu.doktorlar.subeler.sube_adi,
  }));
}
