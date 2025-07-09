'use client'

import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    return <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-32 left-16 w-16 h-16 bg-pink-400 rounded-full opacity-30 animate-bounce"></div>
            <div className="absolute bottom-20 right-20 w-12 h-12 bg-purple-400 rounded-full opacity-25 animate-ping"></div>
            <div className="absolute bottom-32 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-15 animate-pulse"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen p-6">
            <div className="text-center mb-8">
                <div className="text-6xl mb-4"><UserPlus className="inline-block text-white animate-bounce" /></div>
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Create a Love Account</h1>
                <p className="text-blue-200 text-lg font-medium">Start your story today</p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-pink-400 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="w-full max-w-sm">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                    <div className="space-y-4">
                        <div>
                            <label className="text-white text-sm font-medium mb-2 block">Your Name</label>
                            <input type="text" className="w-full p-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm" placeholder="e.g., Lilo" />
                        </div>
                        <div>
                            <label className="text-white text-sm font-medium mb-2 block">Email</label>
                            <input type="email" className="w-full p-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="text-white text-sm font-medium mb-2 block">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} className="w-full p-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm pr-12" placeholder="Create a password" />
                                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                            </div>
                        </div>
                        <div>
                            <label className="text-white text-sm font-medium mb-2 block">Confirm Password</label>
                            <div className="relative">
                                <input type={showConfirmPassword ? "text" : "password"} className="w-full p-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm pr-12" placeholder="Confirm your password" />
                                <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                            </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mt-6">Create Account & Invite Partner</button>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <p className="text-blue-200">Already have an account?</p>
                    <button className="text-white font-semibold underline mt-1">Login to your Story</button>
                </div>
            </div>
        </div>
    </div>
}

export default SignUpForm;