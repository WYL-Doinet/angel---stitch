import { Heart, X } from "lucide-react";
import { memo } from "react";

const InviteCodeModal = memo(({ open, onCloseClick }: { open: boolean, onCloseClick: () => void}) => {
    return open ? <div className="fixed inset-0 bg-black/60 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative transform transition-all animate-in zoom-in-75">
            <button
                onClick={onCloseClick}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Enter Love Code
                </h2>
                <p className="text-gray-600">
                    Type the code your partner shared with you
                </p>
            </div>
            <div className="mb-6">
                <label className="text-gray-700 text-sm font-medium mb-2 block">
                    Partner's Love Code
                </label>
                <input
                    type="text"
                    className="w-full p-4 border-2 border-purple-200 rounded-2xl text-center text-2xl font-bold tracking-wider focus:outline-none focus:border-purple-400 bg-gradient-to-r from-blue-50 to-pink-50"
                    placeholder="LOVE2024"
                    maxLength={8}
                />
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                Connect Our Hearts 💕
            </button>
        </div>
    </div> : null
});


export default InviteCodeModal

InviteCodeModal.displayName = 'InviteCodeModal'