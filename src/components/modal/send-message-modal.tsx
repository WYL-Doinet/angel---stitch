'use client'
import { Mail, X } from "lucide-react"
import { memo } from "react"

const SendMessageModal = memo(({ open, onCloseClick, loveCode }: { open: boolean, onCloseClick: () => void, loveCode: string }) => {
    return open ? <div className="bg-black/60 fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative transform transition-all animate-in zoom-in-75">
            <button onClick={onCloseClick} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"><X className="w-6 h-6" /></button>
            <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center"><Mail className="w-12 h-12 text-white" /></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Invite via Email</h2>
                <p className="text-gray-600">Share your love code with your soulmate.</p>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="text-gray-700 text-sm font-medium mb-2 block">Partner's Email</label>
                    <input type="email" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-400" placeholder="partner@example.com" />
                </div>
                <div>
                    <label className="text-gray-700 text-sm font-medium mb-2 block">Message</label>
                    <textarea className="w-full p-3 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-400" rows={4} readOnly value={`You're invited to join our love story on Love & Stitch! Use this code to connect with me:`} />
                </div>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6">Send Invite 💕</button>
        </div>
    </div> : null
})

export default SendMessageModal

SendMessageModal.displayName = 'SendMessageModal'
