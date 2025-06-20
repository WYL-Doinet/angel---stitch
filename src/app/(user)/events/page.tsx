'use client'

import { ArrowLeft, Camera } from "lucide-react";
import { useState } from "react";
interface Event {
    id: number;
    title: string;
    date: string;
    note: string;
    photos: string[]; // Array of emojis or base64 data URLs
}
const Page = () => {
    const [filterDate, setFilterDate] = useState<string | null>(null);

    const [events, setEvents] = useState<Event[]>([
        { id: 1, title: 'Our First Date', date: '2023-02-14', note: 'The day our hearts found each other ✨', photos: ['🌟', '💕', '🌺'] },
        { id: 2, title: 'Beach Adventure', date: '2023-03-20', note: 'Just like Lilo and Stitch, we found our ohana 🏖️', photos: ['🏖️', '🌊', '☀️'] },
        { id: 3, title: 'Movie Night', date: '2023-04-15', note: 'Cuddled up watching our favorite movies 🎬', photos: ['🍿', '🎭', '💑'] }
    ]);
    const eventDates = [...new Set(events.map(event => event.date))];
    const filteredEvents = filterDate ? events.filter(event => event.date === filterDate) : events;
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
            <div className="bg-gradient-to-r from-blue-400 to-pink-400 p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-md"><button className="text-white">
                <ArrowLeft className="w-6 h-6" /></button><h1 className="text-xl font-bold text-white">Our Memory Calendar</h1></div>
            <div className="p-4">
                <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                    <h3 className="font-bold text-gray-800 mb-2">Filter by Date</h3>
                    <input type="date" value={filterDate || ''} onChange={(e) => setFilterDate(e.target.value)} className="w-full p-2 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {filterDate && (<button onClick={() => setFilterDate(null)} className="text-sm text-blue-600 hover:underline mt-2">Clear Filter</button>)}
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Dates with memories are marked in <span className="text-pink-500 font-bold">pink</span>.</h4>
                        <div className="flex flex-wrap gap-2">{eventDates.map(date => (<div key={date} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-medium">{new Date(date).toLocaleDateString()}</div>))}</div>
                    </div>
                </div>
                <div className="space-y-4">
                    {filteredEvents.length > 0 ? filteredEvents.map(event => (
                        <div key={event.id} className="bg-white rounded-2xl p-4 shadow-lg cursor-pointer transform hover:scale-[1.03] transition-transform duration-300 border-l-4 border-blue-400">
                            <div className="flex items-start space-x-4">
                                <div className="bg-gradient-to-br from-blue-100 to-pink-100 p-3 rounded-full"><Camera className="w-5 h-5 text-blue-600" /></div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 mb-1">{event.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-700 italic">"{event.note}"</p>
                                    <div className="flex space-x-1 mt-2">{event.photos.slice(0, 3).map((photo, idx) => (<span key={idx} className="text-lg">{photo}</span>))} {event.photos.length > 3 && <span className="text-sm text-gray-500">+{event.photos.length - 3}</span>}</div>
                                </div>
                            </div>
                        </div>
                    )) : (<div className="text-center py-10 bg-white rounded-2xl shadow-lg"><p className="text-gray-500">No memories found for this date.</p></div>)}
                </div>
            </div>
        </div>
    );
}

export default Page