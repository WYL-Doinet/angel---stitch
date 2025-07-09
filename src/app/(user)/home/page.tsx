'use client'
import { signOut } from "@/app/(auth)/sign-out/action"
import { Calendar, Heart, LogOut, PenTool } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

const Page = () => {
    const { data: user } = useSWR<any>('/api/users/me', () => { }, { revalidateOnMount: false })
    
    // Calculate days together
    const calculateDaysTogether = (startDate : string) => {
        if (!startDate) return 0;
        const start = new Date(startDate).getTime();
        const today = new Date().getTime();
        const diffTime = Math.abs(today - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysTogether = calculateDaysTogether(user?.relationship?.startDate);
    const partnerName = user?.relationship?.partnerName || "Your Amazing Partner";

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
                    <p className="text-pink-100 text-lg font-medium mb-4">Two hearts beating as one, forever and always</p>
                    <div className="w-32 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
                        <p className="text-white/90 text-sm">Connected with</p>
                        <p className="text-white font-bold">💕 {user?.partner?.name} 💕</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mx-6 -mt-16 mb-8 relative z-10">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-pink-200 transform hover:scale-105 transition-all duration-300">
                <div className="text-center">
                    <div className="text-5xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                            {daysTogether} DAYS
                        </span>
                    </div>
                    <p className="text-gray-700 font-semibold text-lg mb-1">Days of Pure Magic</p>
                    <p className="text-lg md:text-2xl font-light bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent leading-tight tracking-tight">
                        Since {user?.relationship?.startDate ? new Intl.DateTimeFormat('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }).format(new Date(user?.relationship?.startDate)) : 'the beginning of time'}
                    </p>
                    <div className="flex justify-center space-x-2 mt-4">
                        <span className="text-pink-400 animate-bounce">💗</span>
                        <span className="text-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }}>💜</span>
                        <span className="text-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}>💙</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="px-6 space-y-6 pb-8">
            <Link href={'/memories'} className="group block bg-white rounded-3xl p-6 shadow-xl border-l-4 border-blue-400 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all"><Calendar className="w-8 h-8 text-white" /></div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-xl mb-2">Memory Lane</h3>
                        <p className="text-gray-600">Every precious moment we've shared</p>
                    </div>
                </div>
            </Link>
            <Link href={'/notes'} className="group block bg-white rounded-3xl p-6 shadow-xl border-l-4 border-pink-400 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all"><PenTool className="w-8 h-8 text-white" /></div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-xl mb-2">Love Letters</h3>
                        <p className="text-gray-600">Sweet whispers when hearts miss</p>
                    </div>
                </div>
            </Link>
            <Link href={'/settings'} prefetch className="group block bg-white rounded-3xl p-6 shadow-xl border-l-4 border-purple-400 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-6">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all"><Heart className="w-8 h-8 text-white" /></div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-xl mb-2">Love Settings</h3>
                        <p className="text-gray-600">Our relationship preferences</p>
                    </div>
                </div>
            </Link>
            <button onClick={() => signOut()}
                className="group w-full sm:w-auto bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:from-red-500 hover:via-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-3xl shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-red-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="relative group-hover:tracking-wider transition-all duration-300">Sign Out</span>
            </button>
        </div>
    </div>
}

export default Page