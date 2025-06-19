'use client'
import { Mail, Users, Share } from "lucide-react"

const Page = () => {
    return <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6 rounded-b-3xl shadow-xl">
            <div className="text-center">
                <div className="text-6xl mb-4">💕✨</div>
                <h1 className="text-3xl font-bold text-white mb-2">Invite Your Soulmate</h1>
                <p className="text-pink-100">Every love story needs two hearts</p>
            </div>
        </div>
        <div className="p-6 -mt-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-pink-200">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center"><Users className="w-12 h-12 text-white" /></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Share Your Love Code</h2>
                    <p className="text-gray-600">Send this special code to your partner</p>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6 mb-6 border-2 border-dashed border-pink-300">
                    <div className="text-center">
                        <p className="text-gray-600 mb-2">Your Love Code</p>
                        <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wider">{'code'}</div>
                    </div>
                </div>
                <div className="space-y-4">
                    <button className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"><Share className="w-5 h-5" /><span>Share Love Code</span></button>
                    <button className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"><Mail className="w-5 h-5" /><span>Send via Message</span></button>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm mb-4">Already have a partner code?</p>
                    <button className="text-pink-500 font-semibold underline">Enter Partner Code</button>
                </div>
            </div>
            <div className="text-center mt-6">
                <button className="text-gray-500 underline">Skip for now (Demo)</button>
            </div>
        </div>
        {/* {showInviteModal && <InviteCodeModal />}
      {showSendMessageModal && <SendMessageModal />} */}
    </div>
}
export default Page