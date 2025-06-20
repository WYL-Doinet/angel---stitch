import { Calendar, Heart, PenTool } from "lucide-react"

const Page = () => {
    return <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float-delay { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 8s ease-in-out infinite; }
      `}</style>
        <div className="relative bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-b-[3rem] shadow-2xl overflow-hidden">
            <div className="absolute top-4 left-8 w-16 h-16 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute top-12 right-12 w-12 h-12 bg-pink-300/30 rounded-full animate-float-delay"></div>
            <div className="absolute bottom-8 left-1/4 w-8 h-8 bg-blue-300/40 rounded-full animate-pulse"></div>
            <div className="relative p-8 pb-12">
                <div className="text-center">
                    <div className="relative mb-6">
                        <div className="text-7xl animate-pulse">💙</div>
                        <div className="absolute -top-2 -right-2 text-4xl animate-bounce">💕</div>
                        <div className="absolute -bottom-2 -left-2 text-3xl animate-ping">✨</div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Our Infinite Love Story</h1>
                    <p className="text-pink-100 text-lg font-medium mb-4">Like Stitch found Lilo, we found forever</p>
                    <div className="w-32 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
                        <p className="text-white/90 text-sm">Connected with</p>
                        <p className="text-white font-bold">💕 Your Soulmate 💕</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mx-6 -mt-16 mb-8 relative z-10">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-pink-200 transform hover:scale-105 transition-all duration-300">
                <div className="text-center">
                    <div className="text-5xl font-bold mb-2"><span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">{''}</span></div>
                    <p className="text-gray-700 font-semibold text-lg mb-1">Days of Pure Magic</p>
                    <p className="text-gray-500">Since </p>
                    <div className="flex justify-center space-x-2 mt-4">
                        <span className="text-pink-400 animate-bounce">💗</span>
                        <span className="text-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }}>💜</span>
                        <span className="text-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}>💙</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="px-6 space-y-6 pb-8">
            <div className="group bg-white rounded-3xl p-6 shadow-xl border-l-4 border-blue-400 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all"><Calendar className="w-8 h-8 text-white" /></div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-xl mb-2">Memory Lane</h3>
                        <p className="text-gray-600">Every precious moment we've shared</p>
                    </div>
                </div>
            </div>
            <div className="group bg-white rounded-3xl p-6 shadow-xl border-l-4 border-pink-400 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all"><PenTool className="w-8 h-8 text-white" /></div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-xl mb-2">Love Letters</h3>
                        <p className="text-gray-600">Sweet whispers when hearts miss</p>
                    </div>
                </div>
            </div>
            <div className="group bg-white rounded-3xl p-6 shadow-xl border-l-4 border-purple-400 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all"><Heart className="w-8 h-8 text-white" /></div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-xl mb-2">Love Settings</h3>
                        <p className="text-gray-600">Our relationship preferences</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Page