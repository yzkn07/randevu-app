"use client"
import { redirect, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

import SignOutButton from '@/components/SignOutButton';
import GetRandevu, { CancelRandevu, hastaData } from './action';
import { formatRandevuData } from '@/utils/functions/functions';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RandevuAraButton from '@/components/RandevuAraButton';

export default function PrivatePage() {
  const router = useRouter()

  const supabase = createClient();
  const [refresh, setRefresh] = useState(false); // Randevuları yenilemek için state
  const [formattedRandevuSlotlari, setFormattedRandevuSlotlari] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDoktor, setIsDoktor] = useState(false)

  useEffect(() => {
    async function fetchUserData() {
      // Fetch user data
      const { data, error } = await supabase.auth.getUser();

      // Redirect to login page if not authenticated
      if (error || !data?.user) {
        redirect('/login');
      } else {
        setUserEmail(data.user.email);
      }
      const randevu_slotlari = await GetRandevu() || [];
      const formattedData = formatRandevuData(randevu_slotlari);
      setFormattedRandevuSlotlari(formattedData);
    }
    
    fetchUserData();
  }, [refresh]); // Refresh state değiştikçe verileri yeniden getir


  // giriş yapan hastanın doktor rolü var mı?
  useEffect(()=>{
    async function GetHastaDoktorMu() {
      const data = await hastaData()
      const doktorMu = data.hastaData[0]?.isDoktor;
      setIsDoktor(doktorMu)
    }
    GetHastaDoktorMu()
  },[])

  const handleDoktor = () => {
    if(isDoktor){
      router.push("/doktor")
    }
  }



  // Randevuyu iptal etme fonksiyonu
  const handleIptal = async (randevuId) => {
    let iptalOnay = false
    alert("randevu iptal edilsin mi?",iptalOnay = true)
    if(iptalOnay){
      const result = await CancelRandevu(randevuId);
    if (!result?.error) {
      // Başarılı olursa randevuları yenilemek için refresh state'ini değiştir
      setIsModalOpen(true)
      setTimeout(() => {
        setIsModalOpen(false)
      }, 1800);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 1500);
    } else {
      console.error('Randevu iptal edilemedi:', result.error);
    }
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-1 p-2 bg-white shadow-lg rounded-lg">
      {/* Kullanıcı Bilgisi */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Sağlıklı günler <br />
            <span className="text-blue-600 text-xs">{userEmail}</span>
          </h1>
        </div>
        <SignOutButton />
      </div>

     <div className='flex gap-2 justify-between items-center'>
       {/* Randevu Ara Butonu */}
       <RandevuAraButton/>
       {/* kullanıcı doktorsa doktor panelini açabilir */}
       {isDoktor ?  (
          <button onClick={() => handleDoktor()} className='p-2 bg-white border border-black rounded-lg active:bg-black active:text-white'>doktor paneli</button>
        ): (<></>)}
     </div>

      {/* Randevular */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Randevularınız</h2>
        <ul className="space-y-4">
          {formattedRandevuSlotlari.length > 0 ? (
            formattedRandevuSlotlari.map((e) => (
              <li key={e.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                {/* İptal Et Butonu */}
                <button
                  onClick={() => handleIptal(e.id)}
                  className="float-right border border-red-600 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  İptal Et
                </button>
                <p className="text-lg font-semibold text-blue-600">Hasta: {e.hasta}</p>
                <p className="text-md font-medium text-green-600">Şube: {e.sube}</p>
                <p className="text-md font-medium text-indigo-600">Bölüm: {e.bolum}</p>
                <p className="text-md font-medium text-purple-600">Doktor: {e.doktor}</p>
                <p className="text-sm text-gray-700">Randevu Zamanı: {e.randevu_zamani}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">Henüz randevunuz yok.</p>
          )}
        </ul>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 shadow-2xl transition-opacity duration-1800 ease-out animate-fade-in">
          <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg transform transition-transform duration-1800 ease-out animate-bounce-in">
            <h1 className="text-3xl font-bold m-0 text-center text-red-500">Randevu iptal edildi</h1>
          </div>
      </div>
   )}
    </div>
  );
}
