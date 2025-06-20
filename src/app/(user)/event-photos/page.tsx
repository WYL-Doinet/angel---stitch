'use client'

import { ArrowLeft, Plus } from "lucide-react";

const Page = () => {
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
    <div className="bg-gradient-to-r from-blue-400 to-pink-400 p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-md">
      <button
        // onClick={() => setCurrentScreen("calendar")}
        className="text-white"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div>
        <h1 className="text-xl font-bold text-white">{''}</h1>
        <p className="text-blue-100 text-sm">
          {/* {selectedEvent && new Date(selectedEvent.date).toLocaleDateString()} */}
        </p>
      </div>
    </div>
    <div className="p-4">
      {/* {false && <AddPhotoModal />} */}
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
        <p className="text-gray-700 italic text-center">
          {/* "{selectedEvent?.note}" */}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* {selectedEvent?.photos.map((photo, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg flex items-center justify-center aspect-square transform hover:scale-105 transition-transform"
          >
            {photo.startsWith("data:image/") ? (
              <img
                src={photo}
                alt={`Memory ${idx + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <span className="text-6xl">{photo}</span>
            )}
          </div>
        ))} */}
        <div
     
          className="bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl shadow-lg flex items-center justify-center aspect-square border-2 border-dashed border-blue-300 cursor-pointer hover:bg-gradient-to-br hover:from-blue-200 hover:to-pink-200 transition-all"
        >
          <div className="text-center">
            <Plus className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-blue-600 font-medium">Add Photo</p>
          </div>
        </div>
      </div>
    </div>
  </div>;
};
export default Page;
