'use client'
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface User {
  name: string;
  email: string;
}

interface Profile {
  nickname: string;
  birthday: string;
}

const Page = () => {
  const [localProfile, setLocalProfile] = useState<Profile>({
    nickname: "",
    birthday: "",
  });
  const [localStartDate, setLocalStartDate] = useState<string>("");
  const [savedMessage, setSavedMessage] = useState<string>("");

  const handleSave = () => {
    // setUserProfile(localProfile);
    // setRelationshipStart(localStartDate);
    setSavedMessage("Your settings have been saved! ✨");
    setTimeout(() => setSavedMessage(""), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-md">
        <button className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Love Settings</h1>
      </div>
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Your Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm font-medium mb-2 block">
                Nickname
              </label>
              <input
                type="text"
                value={localProfile.nickname}
                onChange={(e) =>
                  setLocalProfile({ ...localProfile, nickname: e.target.value })
                }
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                placeholder="e.g., Stitch"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm font-medium mb-2 block">
                Birthday
              </label>
              <input
                type="date"
                value={localProfile.birthday}
                onChange={(e) =>
                  setLocalProfile({ ...localProfile, birthday: e.target.value })
                }
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">
            Our Special Start Date
          </h3>
          <input
            type="date"
            value={localStartDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
            className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400"
          />
          <p className="text-sm text-gray-600 mt-2">
            This is the day our love story began ✨
          </p>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Save All Settings
        </button>
        {savedMessage && (
          <p className="text-center text-purple-600 animate-in fade-in">
            {savedMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
