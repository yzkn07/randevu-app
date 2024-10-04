"use client"
import SignOutButton from "@/components/SignOutButton";

import { useEffect, useState } from "react";
import { getPolRandevulari, randevuEkle } from "./actions";
import { useRouter } from "next/navigation";


export default function Doktor() {
    const router = useRouter()
    const [polRandevulari, setPolRandevulari] = useState([])

    function handleHasta() {
        return (
            router.push("/private")
        )
    }

    useEffect(()=> {
        async function getRandevu(){
            const randevuBilgi = await getPolRandevulari()
            setPolRandevulari(randevuBilgi)
        }
        getRandevu()
    },[])



    return(
    <>
            <div className="flex justify-between items-center m-2">
                <button onClick={handleHasta} className="p-2 border border-black active:bg-black active:text-white rounded-lg">hasta paneli</button>
                <SignOutButton/>
            </div>

            <form action={randevuEkle} className="bg-slate-400 px-2 py-4 mx-auto my-4  w-3/4 flex flex-col justify-center items-center gap-2 rounded-2xl">
                <label htmlFor="baslangicTarihi" className="text-center p-2 bg-slate-300 rounded-lg w-28">başlangıç: </label>
                <input type="datetime-local" name="baslangicTarihi" id="baslangicTarihi" className="p-2 rounded-2xl w-full"/>
                <label htmlFor="bitisTarihi" className="mt-2 text-center p-2 bg-slate-300 rounded-lg w-28">bitiş: </label>
                <input type="datetime-local" name="bitisTarihi" id="bitisTarihi" className="p-2 rounded-2xl w-full"/>
                <button  className="mt-2 bg-white p-4 rounded-3xl font-semibold text-xl">randevu ekle</button>
            </form>

            <div className="flex flex-col justify-center items-center m-6 p-4 bg-blue-100 shadow-md rounded-lg">
            <h1 className="text-center text-3xl font-bold my-4 text-blue-600">Hasta Randevuları</h1>
                <ul className="space-y-4 w-full max-w-2xl">
                    {polRandevulari.map(e => (
                    <li key={e.id} className="bg-gray-50 p-4 rounded-lg shadow hover:bg-blue-50 transition duration-300">
                        <p className="text-lg font-semibold text-gray-800">
                        {e.hasta}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">{e.randevu_zamani}</span>
                        </p>
                    </li>
                    ))}
                </ul>
            </div>
    </>
    )
}