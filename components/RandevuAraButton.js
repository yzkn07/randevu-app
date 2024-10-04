import Link from "next/link"

export default function RandevuAraButton() {
    return (
        <Link
          href={"/"}
          className="inline-block bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Randevu Ara
        </Link>
    )
}