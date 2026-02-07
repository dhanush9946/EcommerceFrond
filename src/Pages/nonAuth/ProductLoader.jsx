import React from "react";
function ProductLoader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
      {Array(8)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="bg-pink-100 rounded-3xl shadow-md flex flex-col overflow-hidden"
          >
            <div className="bg-pink-200 h-48 w-full"></div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="h-4 bg-pink-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-pink-300 rounded mb-2 w-1/2"></div>
              <div className="h-8 bg-pink-300 rounded w-full mt-auto"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
export default ProductLoader