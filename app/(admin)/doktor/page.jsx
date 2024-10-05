"use client"
import SignOutButton from "@/components/SignOutButton";
import { useEffect, useState } from "react";
import { getPolRandevulari, randevuEkle } from "./actions";
import { useRouter } from "next/navigation";

export default function Doktor() {
  const router = useRouter();
  const [polRandevulari, setPolRandevulari] = useState([]);
  const [showRandevuForm, setShowRandevuForm] = useState(false);
  const [showRandevuList, setShowRandevuList] = useState(true);
  const [notification, setNotification] = useState(""); 
  const [showModal, setShowModal] = useState(false);

  const [baslangicTarihi, setBaslangicTarihi] = useState("");
  const [bitisTarihi, setBitisTarihi] = useState("");

  function handleHasta() {
    return router.push("/private");
  }

  useEffect(() => {
    async function getRandevu() {
      const randevuBilgi = await getPolRandevulari();
      setPolRandevulari(randevuBilgi);
    }
    getRandevu();
  }, []);

  const toggleRandevuForm = () => {
    if (showRandevuList) setShowRandevuList(false);
    setShowRandevuForm(true);
  };

  const toggleRandevuList = () => {
    if (showRandevuForm) setShowRandevuForm(false);
    setShowRandevuList(true);
  };

  // Randevu ekleme fonksiyonu
  const handleRandevuEkle = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    await randevuEkle(formData);

  
    setNotification("Randevu başarıyla eklendi!");
    setShowModal(true); 
    setBaslangicTarihi("");
    setBitisTarihi("");

  
    setTimeout(() => {
      setShowModal(false);
      setNotification("");
    }, 3000);
  };

  return (
    <>
      <div className="flex justify-between items-center m-2">
        <button
          onClick={handleHasta}
          className="p-2 border border-black active:bg-black active:text-white rounded-lg"
        >
          Hasta Paneli
        </button>
        <SignOutButton />
      </div>

      <div className="flex justify-around my-4">
        {/* Randevu Ekleme Formunu Gösteren Buton */}
        <button
          onClick={toggleRandevuForm}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Randevu Ekle
        </button>

        {/* Hasta Randevularını Gösteren Buton */}
        <button
          onClick={toggleRandevuList}
          className="bg-slate-500 text-white px-6 py-2 rounded-lg hover:bg-slate-600 transition duration-300"
        >
          Hasta Randevularını Gör
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-sm">
            <h1 className="text-lg font-bold mb-4 text-center text-green-700">
              {notification}
            </h1>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto block hover:bg-blue-600 transition duration-300"
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      {/* Randevu Ekleme Formu */}
      {showRandevuForm && (
        <form
          onSubmit={handleRandevuEkle}
          className="bg-slate-400 px-4 py-6 mx-auto my-4 w-3/4 flex flex-col justify-center items-center gap-4 rounded-2xl"
        >
          <label
            htmlFor="baslangicTarihi"
            className="text-center p-2 bg-slate-300 rounded-lg w-32"
          >
            Başlangıç:
          </label>
          <input
            type="datetime-local"
            name="baslangicTarihi"
            id="baslangicTarihi"
            className="p-2 rounded-2xl w-full"
            value={baslangicTarihi}
            onChange={(e) => setBaslangicTarihi(e.target.value)}
          />
          <label
            htmlFor="bitisTarihi"
            className="mt-2 text-center p-2 bg-slate-300 rounded-lg w-32"
          >
            Bitiş:
          </label>
          <input
            type="datetime-local"
            name="bitisTarihi"
            id="bitisTarihi"
            className="p-2 rounded-2xl w-full"
            value={bitisTarihi}
            onChange={(e) => setBitisTarihi(e.target.value)}
          />
          <button className="mt-2 bg-white p-4 rounded-3xl font-semibold text-xl hover:bg-gray-200">
            Randevu Ekle
          </button>
        </form>
      )}

      {/* Hasta Randevuları Listesi */}
      {showRandevuList && (
        <div className="flex flex-col justify-center items-center m-6 p-4 bg-blue-100 shadow-md rounded-lg">
          <h1 className="text-center text-3xl font-bold my-4 text-blue-600">
            Hasta Randevuları
          </h1>
          <ul className="space-y-4 w-full max-w-2xl">
            {polRandevulari.map((e) => (
              <li
                key={e.id}
                className="bg-gray-50 p-4 rounded-lg shadow hover:bg-blue-50 transition duration-300"
              >
                <p className="text-lg font-semibold text-gray-800">
                  {e.hasta}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">
                    {e.randevu_zamani}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
