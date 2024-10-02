import Link from "next/link"

export default function RandevuAraButton() {
    return (
        <div className="mt-2 p-2 mb-6">
        <Link
          href={"/"}
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Randevu Ara
        </Link>
      </div>
    )
}