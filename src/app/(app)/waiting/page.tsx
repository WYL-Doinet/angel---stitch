'use client'
import { Heart } from "lucide-react"
import Link from "next/link"

const Page = () => {
    return <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col justify-center items-center p-6 text-center">
        <style>{`
            @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
                animation: spin-slow 10s linear infinite;
            }
        `}</style>
        <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-dashed border-pink-300 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-16 h-16 text-pink-400 animate-pulse" />
            </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Waiting for Your Partner</h1>
        <p className="text-gray-600 mb-8 max-w-sm">
            Your invitation has been sent! Once your partner enters your Love Code, your shared story will begin.
        </p>
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border-2 border-dashed border-purple-300 w-full max-w-sm">
            <p className="text-gray-600 mb-2">Your Love Code</p>
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wider">

            </div>
        </div>
        <Link href="/invite"
            className="mt-4 text-gray-500 underline"
        >
            Go Back
        </Link>
    </div>
}

export default Page