import Link from "next/link"

export default function RandevuAraButton() {
    return (
        <Link
          href={"/"}
          className="block w-2/3 mx-auto my-4 bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-center text-3xl"
        >
         Randevu Ara
        </Link>
    )
}