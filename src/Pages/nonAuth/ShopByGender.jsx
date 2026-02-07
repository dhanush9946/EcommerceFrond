import React from 'react'

function ShopByGender({ onSelect }) {
  return (
    <div className="mt-6 mb-10">
      {/* Heading */}
      <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center text-black mb-5 tracking-wide">
        Shop By Gender
      </h1>

      {/* All Button */}
      <div className="flex justify-center mb-5">
        <button
          onClick={() => onSelect('All')}
          className="px-5 py-2 rounded-full bg-black text-white font-medium shadow-lg hover:bg-pink-600 transition transform hover:scale-105"
        >
          Show All Perfumes
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Women */}
          <div
            onClick={() => onSelect('Women')}
            className="relative group overflow-hidden rounded-2xl shadow-lg bg-pink-50 cursor-pointer border border-pink-200 hover:shadow-2xl transition"
          >
            <div className="aspect-[16/9] w-full">
              <img
                src="https://images-static.nykaa.com/uploads/8ca1ac3d-4f4f-4909-bc08-ec11ea8b7127.jpg?tr=cm-pad_resize,w-350"
                alt="shop by women"
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
              <h2 className="text-white text-sm md:text-base font-semibold tracking-wide">
                Shop Women
              </h2>
            </div>
          </div>

          {/* Men */}
          <div
            onClick={() => onSelect('Men')}
            className="relative group overflow-hidden rounded-2xl shadow-lg bg-pink-50 cursor-pointer border border-pink-200 hover:shadow-2xl transition"
          >
            <div className="aspect-[16/9] w-full">
              <img
                src="https://images-static.nykaa.com/uploads/092848b8-7935-434d-8a71-ee88701577a7.jpg?tr=cm-pad_resize,w-350"
                alt="shop by men"
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
              <h2 className="text-white text-sm md:text-base font-semibold tracking-wide">
                Shop Men
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopByGender
