"use client"

import { useEffect, useState } from "react";
import { getBolumler, getDoktorlar, getRandevuSlotlari, getSubeler, getUser } from "./actions";
import BosRandevuForm from "./components/BosRandevuForm";
import SelectedInfos from "./components/SelectedInfos";
import { Suspense } from "react";
import { getSelectedItem, formatRandevuData } from "@/utils/functions/functions";
import { useRouter } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";


export default function Home() {
  const router = useRouter();

  const [step, setStep] = useState(null);
  const [subeler, setSubeler] = useState([]);
  const [selectedSubeId, setSelectedSubeId] = useState(null);
  const [bolumler, setBolumler] = useState([]);
  const [selectedBolumId, setSelectedBolumId] = useState(null);
  const [doktorlar, setDoktorlar] = useState([]);
  const [selectedDoktorId, setSelectedDoktorId] = useState(null);
  const [buttonIsActive, setButtonIsActive] = useState(false);
  const [bosRandevular, setBosRandevular] = useState([]);
  const [selectedRandevuId, setSelectedRandevuId] = useState(null);
  const [formattedData, setFormattedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [yonlendirme, setYonlendirme] = useState("");
  const [userId, setUserId] = useState(null);

  // başlangıçta şubeleri getirir.
  useEffect(() => {
    async function fetchSubeler() {
      const subelerData = await getSubeler();
      setSubeler(subelerData.subeler);
    }
    fetchSubeler();
  }, []);

  const selectedSube = getSelectedItem(subeler, selectedSubeId);

  // başlangıçta giriş yapmış kullanıcıyı getirir
  useEffect(() => {
    async function fetchUser() {
      const userIdData = await getUser();
      if (userIdData?.userId) {
        setUserId(userIdData);
        setIsAuthenticated(true);
      } else {
        setUserId(null);
        setIsAuthenticated(false);
      }
    }
    fetchUser();
  }, []);

  // doktor seçilince boş randevuları getirir
  useEffect(() => {
    if (step === 2 && selectedDoktorId) {
      async function fetchRandevular() {
        const randevuData = await getRandevuSlotlari(selectedDoktorId);
        setBosRandevular(randevuData);
      }
      fetchRandevular();
    }
  }, [step, selectedDoktorId]);



  // devam et butonunun işlevleri
  const handleDevam = async () => {
    if (selectedSubeId && step === 0) {
      const bolumlerData = await getBolumler(selectedSubeId);
      setBolumler(bolumlerData);
      setStep(1);
      setButtonIsActive(false);
    } else if (selectedBolumId && step === 1) {
      const doktorlarData = await getDoktorlar(selectedSubeId, selectedBolumId);
      setDoktorlar(doktorlarData.doktorlar);
      setStep(2);
      setButtonIsActive(false);
    } else if (selectedDoktorId && step === 2) {
      setStep(3);
      setButtonIsActive(false);
    }

    if (selectedRandevuId) {
      if (!isAuthenticated) {
        setYonlendirme("Randevu Almak İçin Giriş Yap");
      } else {
        setYonlendirme("Randevu Al");
      }
      setIsModalOpen(true);
    }
  };

// geri git butonunun işlevleri
  const handleGeri = () => {
    if (step === 2) {
      setStep(1);
      setSelectedDoktorId(null);
      setSelectedBolumId(null);
      setButtonIsActive(false);
    } else if (step === 1) {
      setSelectedDoktorId(null);
      setSelectedBolumId(null);
      setSelectedSubeId(null);
      setStep(null);
      setButtonIsActive(false);
    } else if (step === 3) {
      setSelectedRandevuId(null);
      setSelectedDoktorId(null);
      setStep(2);
      setButtonIsActive(false);
    }
  };

  const selectedBolum = getSelectedItem(bolumler, selectedBolumId);
  const selectedDoktor = getSelectedItem(doktorlar, selectedDoktorId);
  const selectedRandevu = getSelectedItem(bosRandevular, selectedRandevuId);

  const handleGiris = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="flex justify-between items-center p-2">
        <h1 className="border border-blue-400 p-2 rounded-lg">MALİPOL HASTANELERİ</h1>
        {isAuthenticated ? (
          <SignOutButton />
        ) : (
          <button
            onClick={handleGiris}
            className="border border-black p-2 rounded-lg active:bg-black active:text-white"
          >
            Giriş yap
          </button>
        )}
      </div>

      {isAuthenticated && (
        <div className="border w-fit border-blue-400 text-black bg-white active:bg-blue-600 p-2 rounded-lg m-2">
          <Link href={"/private"}>Randevularım </Link>
        </div>
      )}
      
{/* hızlı randevu modülü */}
      <div className="flex flex-col p-2 border border-black bg-slate-200 text-black m-2 rounded-lg">
        <div className="border-b border-black p-2 bg-white rounded-t-lg text-start">
          <p className="font-light text-xl">hızlı randevu al</p>
        </div>

        <div className="p-2 bg-slate-300 rounded-b-lg">
          {/* <div className="p-2">
            <p className="font-semibold text-lg text-blue-600">şube seçin</p>
          </div> */}

          <div className="p-0 shadow-inner bg-slate-100 rounded-t-lg border-b border-black">
            {subeler && (
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
                  formattedData={formattedData}
                />
              </Suspense>
            )}
          </div>

            {/* geri git ve davam et butonlarının ui kısmı */}
          <div
            className={`${
              step !== null ? "h-16 max-h-screen opacity-100" : "h-2 opacity-0"
            } w-full flex justify-between items-center relative p-2 rounded-b-lg bg-blue-200 shadow-xl
            transition-all duration-500 ease-in-out overflow-hidden`}
          >
            {step > 0 && (
              <button
                onClick={handleGeri}
                className="bg-gray-500/90 text-white p-2 left-0 m-2 px-6 py-3 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 focus:outline-none"
                type="button"
              >
                geri git
              </button>
            )}
            <button
              onClick={handleDevam}
              disabled={!buttonIsActive}
              className={`absolute w-fit ${
                buttonIsActive
                  ? "bg-blue-500/90 hover:bg-blue-600 text-white transform translate-x-[calc(100vw-180px)] shadow-lg left-0 m-2 visible"
                  : "bg-gray-300 text-gray-500 left-0 m-2 hidden"
              } px-6 py-3 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none disabled:opacity-50`}
              type="button"
            >
              devam et
            </button>
          </div>
        </div>
        
        {/* seçilen bilgileri gösterme */}
        {selectedSube && (
          <SelectedInfos
            selectedSube={selectedSube}
            selectedBolum={selectedBolum}
            selectedDoktor={selectedDoktor}
            selectedRandevu={selectedRandevu}
            formattedData={formattedData}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            selectedRandevuId={selectedRandevuId}
            setSelectedRandevuId={setSelectedRandevuId}
            yonlendirme={yonlendirme}
            setYonlendirme={setYonlendirme}
            bosRandevular={bosRandevular}
          />
        )}
      </div>
    </>
  );
}
