"use client";
import MemoryModal from "@/components/modal/memory-modal";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

interface Note {
    id: number;
    text: string;
    createdAt: string;
}

const Page = () => {
    const { data } = useSWR<{notes: Note[]} | undefined>('/api/users/me/relationship/notes', (url:string) => fetch(url).then(res => res.json()))

    const [filterDate, setFilterDate] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
 

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
            <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-md">
                <Link href={'/home'} className="text-white">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold text-white">Love Notes</h1>
            </div>

            <div className="p-4">
                <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                    <h3 className="font-bold text-gray-800 mb-2">
                        Filter by Date
                    </h3>
                    <input
                        type="date"
                        value={filterDate || ""}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="w-full p-2 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    {filterDate && (
                        <button
                            onClick={() => setFilterDate(null)}
                            className="text-sm text-pink-600 hover:underline mt-2"
                        >
                            Clear Filter
                        </button>
                    )}
                </div>

                <div className="space-y-4 pb-20">
                    {data?.notes !== undefined ? (
                        data.notes.length > 0 ? data.notes.map((note: any) => (
                            <div
                                key={note.id}
                                className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-pink-300"
                            >
                                <p className="text-gray-800 mb-2 italic">
                                    "{note.text}"
                                </p>
                                <p className="text-sm text-gray-500 text-right">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        )) : <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                            <div className="text-6xl mb-4">💌</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No Love Letters Yet</h3>
                            <p className="text-gray-500 text-lg">
                                Start writing your first sweet note! 💕
                            </p>
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                            <div className="text-6xl mb-4">💌</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No Love Letters Yet</h3>
                            <p className="text-gray-500 text-lg">
                                Start writing your first sweet note! 💕
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-300 z-20 group"
            >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Modal */}
            {showModal && <MemoryModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Page;