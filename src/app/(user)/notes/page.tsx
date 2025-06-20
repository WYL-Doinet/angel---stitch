
'use client'
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Note {
    id: number;
    content: string;
    date: string;
}


const Page = () => {
    const [filterDate, setFilterDate] = useState<string | null>(null);
    const [notes, setNotes] = useState<Note[]>([
        { id: 1, content: "Missing your warm hugs today... like Stitch needs his cuddles 💙", date: '2024-01-15' },
        { id: 2, content: "You're my greatest adventure, my ohana forever 💕", date: '2024-01-10' }
    ]);

    const [newNote, setNewNote] = useState<string>('');
    const noteDates = [...new Set(notes.map(note => note.date))];
    const filteredNotes = filterDate ? notes.filter(note => note.date === filterDate) : notes;
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
            <div className="bg-gradient-to-r from-pink-400 to-blue-400 p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-md"><button className="text-white"><ArrowLeft className="w-6 h-6" /></button><h1 className="text-xl font-bold text-white">Love Notes</h1></div>
            <div className="p-4">
                <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                    <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Write a sweet note when you miss them... 💕" className="w-full p-3 border-2 border-pink-200 rounded-xl resize-none focus:outline-none focus:border-pink-400" rows={3} />
                    <button onClick={() => { if (newNote.trim()) { setNotes([{ id: Date.now(), content: newNote, date: new Date().toISOString().split('T')[0] }, ...notes]); setNewNote(''); } }} className="mt-3 bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all">Save Love Note 💌</button>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                    <h3 className="font-bold text-gray-800 mb-2">Filter by Date</h3>
                    <input type="date" value={filterDate || ''} onChange={(e) => setFilterDate(e.target.value)} className="w-full p-2 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
                    {filterDate && (<button onClick={() => setFilterDate(null)} className="text-sm text-pink-600 hover:underline mt-2">Clear Filter</button>)}
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Dates with notes are marked in <span className="text-blue-500 font-bold">blue</span>.</h4>
                        <div className="flex flex-wrap gap-2">{noteDates.map(date => (<div key={date} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{new Date(date).toLocaleDateString()}</div>))}</div>
                    </div>
                </div>
                <div className="space-y-4">
                    {filteredNotes.length > 0 ? filteredNotes.map(note => (
                        <div key={note.id} className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-pink-300">
                            <p className="text-gray-800 mb-2 italic">"{note.content}"</p>
                            <p className="text-sm text-gray-500 text-right">{new Date(note.date).toLocaleDateString()}</p>
                        </div>
                    )) : (<div className="text-center py-10 bg-white rounded-2xl shadow-lg"><p className="text-gray-500">No notes found for this date.</p></div>)}
                </div>
            </div>
        </div>
    );
}

export default Page