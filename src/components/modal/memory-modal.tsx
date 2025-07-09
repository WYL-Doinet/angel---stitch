'use client'
import { postFetcher } from "@/utils/client/fetcher";
import { Heart, Save, X } from "lucide-react";
import { memo, useState } from "react";

const MemoryModal = memo((props: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        note: '',
        emojis: [] as string[]
    });
    const emojiOptions = [
        "❤️", "💕", "💖", "💗", "💝", "💘", "💞", "💓", "💌", "💋",
        "🌹", "🌺", "🌸", "🌷", "🌻", "🌼", "🌙", "⭐", "✨", "🌟",
        "🎉", "🎊", "🎈", "🎁", "🎂", "🍰", "🥂", "🍾", "🎵", "🎶",
        "🏖️", "🌊", "☀️", "🌅", "🌄", "🍿", "🎬", "🎭", "📸", "🎪"
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const body = { ...formData, date: new Date(formData.date), emojis: formData.emojis.join(',') }
        try {
            const data = postFetcher({ url: '/api/events' ,body})
        } catch(error : unknown) {

        }

        // setFormData({ title: '', date: '', note: '', emojis: [] });

    };

    const handleEmojiToggle = (emoji: string) => {
        setFormData(prev => ({
            ...prev,
            emojis: prev.emojis.includes(emoji)
                ? prev.emojis.filter(p => p !== emoji)
                : [...prev.emojis, emoji]
        }));
    };

    const resetForm = () => {
        setFormData({ title: '', date: '', note: '', emojis: [] });
        props.onClose();
    };
    return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full h-[85vh] flex flex-col">
            {/* Fixed Header */}
            <div className="bg-gradient-to-r from-blue-400 to-pink-400 p-4 rounded-t-2xl flex-shrink-0">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        Create New Memory
                    </h2>
                    <button
                        onClick={resetForm}
                        className="text-white hover:bg-white/20 p-1 rounded-full transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Memory Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="e.g., Our First Kiss"
                            className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date *
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Memory Note
                        </label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                            placeholder="Share your special moment..."
                            className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-20 resize-none"
                        />
                    </div>

                    {/* Cool Emoji Design */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                            ✨ Add Some Magic ({formData.emojis.length}/8)
                        </label>

                        {/* Selected Emojis Floating Pills */}
                        {formData.emojis.length > 0 && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-2xl border-2 border-dashed border-pink-200">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        Your Memory Vibes ✨
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, emojis: [] }))}
                                        className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-full hover:bg-red-50"
                                    >
                                        Clear all
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.emojis.map((emoji, idx) => (
                                        <div
                                            key={idx}
                                            className="relative group bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer"
                                            onClick={() => handleEmojiToggle(emoji)}
                                        >
                                            <span className="text-2xl block">{emoji}</span>
                                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110">
                                                ×
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cool Emoji Grid */}
                        <div className="space-y-4">
                            {/* Love Category */}
                            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4 border border-red-100">
                                <h4 className="text-sm font-bold text-red-600 mb-3 flex items-center gap-2">
                                    💕 Love & Romance
                                </h4>
                                <div className="grid grid-cols-5 gap-3">
                                    {["💕", "💖", "💗", "💝", "💘", "💞", "💓", "💌", "💋", "❤️"].map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => handleEmojiToggle(emoji)}
                                            className={`relative text-2xl p-3 rounded-2xl transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${formData.emojis.includes(emoji)
                                                ? 'bg-gradient-to-br from-red-200 to-pink-200 shadow-lg scale-110 ring-2 ring-red-300'
                                                : 'bg-white hover:bg-red-50 shadow-sm hover:shadow-lg'
                                                } ${formData.emojis.length >= 8 && !formData.emojis.includes(emoji) ? 'opacity-40 cursor-not-allowed' : ''}`}
                                            disabled={formData.emojis.length >= 8 && !formData.emojis.includes(emoji)}
                                        >
                                            {emoji}
                                            {formData.emojis.includes(emoji) && (
                                                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-4 h-4 flex items-center justify-center">
                                                    <span className="text-white text-xs">✓</span>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Nature Category */}
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-100">
                                <h4 className="text-sm font-bold text-green-600 mb-3 flex items-center gap-2">
                                    🌸 Nature & Beauty
                                </h4>
                                <div className="grid grid-cols-5 gap-3">
                                    {["🌹", "🌺", "🌸", "🌷", "🌻", "🌙", "⭐", "✨", "🌟", "🌊"].map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => handleEmojiToggle(emoji)}
                                            className={`relative text-2xl p-3 rounded-2xl transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${formData.emojis.includes(emoji)
                                                ? 'bg-gradient-to-br from-green-200 to-blue-200 shadow-lg scale-110 ring-2 ring-green-300'
                                                : 'bg-white hover:bg-green-50 shadow-sm hover:shadow-lg'
                                                } ${formData.emojis.length >= 8 && !formData.emojis.includes(emoji) ? 'opacity-40 cursor-not-allowed' : ''}`}
                                            disabled={formData.emojis.length >= 8 && !formData.emojis.includes(emoji)}
                                        >
                                            {emoji}
                                            {formData.emojis.includes(emoji) && (
                                                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-4 h-4 flex items-center justify-center">
                                                    <span className="text-white text-xs">✓</span>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Fun Category */}
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100">
                                <h4 className="text-sm font-bold text-purple-600 mb-3 flex items-center gap-2">
                                    🎉 Fun & Celebration
                                </h4>
                                <div className="grid grid-cols-5 gap-3">
                                    {["🎉", "🎊", "🎈", "🎁", "🎂", "🥂", "🍾", "🎵", "📸", "🎪"].map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => handleEmojiToggle(emoji)}
                                            className={`relative text-2xl p-3 rounded-2xl transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${formData.emojis.includes(emoji)
                                                ? 'bg-gradient-to-br from-purple-200 to-indigo-200 shadow-lg scale-110 ring-2 ring-purple-300'
                                                : 'bg-white hover:bg-purple-50 shadow-sm hover:shadow-lg'
                                                } ${formData.emojis.length >= 8 && !formData.emojis.includes(emoji) ? 'opacity-40 cursor-not-allowed' : ''}`}
                                            disabled={formData.emojis.length >= 8 && !formData.emojis.includes(emoji)}
                                        >
                                            {emoji}
                                            {formData.emojis.includes(emoji) && (
                                                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-4 h-4 flex items-center justify-center">
                                                    <span className="text-white text-xs">✓</span>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Fixed Footer */}
            <div className="p-6 bg-gray-50 rounded-b-2xl flex-shrink-0">
                <div className="flex space-x-3">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-400 to-pink-400 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-pink-500 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Save Memory
                    </button>
                </div>
            </div>
        </div>
    </div>
})

MemoryModal.displayName = 'MemoryModal'

export default MemoryModal
