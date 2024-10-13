'use client' // Error components must be Client Components
import Link from 'next/link'
import breackDownImage from "../../../public/assets/brackDown.svg"
import Image from 'next/image'
export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="h-screen w-full bg-gray-50 flex items-center mt-3 flex-nowrap">
      <div className="container flex flex-row xs:flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="w-full  mx-8">
          <div className="text-7xl text-green-500 font-dark font-extrabold mb-8"> 500</div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            {`Something went wrong!`}
          </p>
          <div style={{ margin: "20px 0" }} className='flex space-x-2 gap-1'>
            <button
            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-green-600 hover:bg-green-700"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try again
            </button>
          <Link href="/" className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-green-600 hover:bg-green-700">back to homepage</Link>
          </div>
        </div>
        <div className="w-full lg:flex lg:justify-end mx-5 my-12 hidden md:block">
          <Image width={500} height={150} src={breackDownImage} className="" alt="Page not found" />
        </div>

      </div>
    </div>

  )
}