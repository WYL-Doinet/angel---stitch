"use client";

import MemoryModal from "@/components/modal/memory-modal";
import { ArrowLeft, Camera, Plus, X, Heart, Save, Calendar, Filter, Search, Clock, Sparkles, Image, MapPin, Grid, List } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import useSWR from "swr";

interface Event {
    id: number;
    title: string;
    date: string;
    note: string;
    photos: string[]; // Array of emojis or base64 data URLs
}

const Page = () => {
    const { data } = useSWR('/api/users/me/relationship/events', (url) => fetch(url).then(res => res.json()));
    const [filterDate, setFilterDate] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState<'all' | 'week' | 'month' | 'year'>('all');

    const [events, setEvents] = useState<Event[]>([
        {
            id: 1,
            title: "Our First Date",
            date: "2023-02-14",
            note: "The day our hearts found each other ✨",
            photos: ["🌟", "💕", "🌺"],
        },
        {
            id: 2,
            title: "Beach Adventure",
            date: "2023-03-20",
            note: "Just like Lilo and Stitch, we found our ohana 🏖️",
            photos: ["🏖️", "🌊", "☀️"],
        },
        {
            id: 3,
            title: "Movie Night",
            date: "2023-04-15",
            note: "Cuddled up watching our favorite movies 🎬",
            photos: ["🍿", "🎭", "💑"],
        },
        {
            id: 4,
            title: "Anniversary Dinner",
            date: "2023-08-12",
            note: "Celebrating our love with candlelight and wine 🥂",
            photos: ["🕯️", "🍷", "🌹", "💐"],
        },
        {
            id: 5,
            title: "Hiking Adventure",
            date: "2023-09-03",
            note: "Conquered mountains together, just like our challenges 🏔️",
            photos: ["🏔️", "🥾", "🌲"],
        },
    ]);

    // Enhanced filtering logic
    const filteredEvents = useMemo(() => {
        let filtered = events;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(event => 
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.note.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Date filter
        if (filterDate) {
            filtered = filtered.filter(event => event.date === filterDate);
        }

        // Date range filter
        if (selectedDateRange !== 'all') {
            const now = new Date();
            const filterDate = new Date();
            
            switch (selectedDateRange) {
                case 'week':
                    filterDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    filterDate.setMonth(now.getMonth() - 1);
                    break;
                case 'year':
                    filterDate.setFullYear(now.getFullYear() - 1);
                    break;
            }
            
            filtered = filtered.filter(event => new Date(event.date) >= filterDate);
        }

        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [events, searchQuery, filterDate, selectedDateRange]);

    const eventDates = [...new Set(events.map((event) => event.date))];
    const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).slice(0, 3);

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };

    const clearAllFilters = () => {
        setSearchQuery('');
        setFilterDate(null);
        setSelectedDateRange('all');
        setShowFilters(false);
    };

    const getEventsByMonth = () => {
        const grouped = filteredEvents.reduce((acc, event) => {
            const month = new Date(event.date).toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!acc[month]) acc[month] = [];
            acc[month].push(event);
            return acc;
        }, {} as Record<string, Event[]>);
        return grouped;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 flex items-center justify-between sticky top-0 z-10 shadow-xl backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                    <Link href={"/home"} className="text-white hover:text-blue-200 transition-colors duration-200">
                        <div className="p-2 rounded-full hover:bg-white/20 transition-all duration-200">
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                    </Link>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Calendar className="w-6 h-6 text-white" />
                            <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Memory Calendar</h1>
                            <p className="text-xs text-white/80">{events.length} precious moments</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 text-white"
                    >
                        {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 text-white"
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Enhanced Filters */}
            <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white/80 backdrop-blur-sm m-4 rounded-3xl p-6 shadow-xl border border-purple-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-purple-500" />
                            <span>Filter Memories</span>
                        </h3>
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                        >
                            Clear All
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search memories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                            />
                        </div>

                        {/* Date and Range */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    value={filterDate || ""}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                                />
                            </div>
                            <select
                                value={selectedDateRange}
                                onChange={(e) => setSelectedDateRange(e.target.value as any)}
                                className="py-3 px-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                            >
                                <option value="all">All Time</option>
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                                <option value="year">Last Year</option>
                            </select>
                        </div>

                        {/* Active Filters */}
                        {(searchQuery || filterDate || selectedDateRange !== 'all') && (
                            <div className="flex flex-wrap gap-2">
                                {searchQuery && (
                                    <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                        <span>Search: "{searchQuery}"</span>
                                        <button onClick={() => setSearchQuery('')}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                {filterDate && (
                                    <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                        <span>Date: {new Date(filterDate).toLocaleDateString()}</span>
                                        <button onClick={() => setFilterDate(null)}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                {selectedDateRange !== 'all' && (
                                    <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                        <span>Range: {selectedDateRange}</span>
                                        <button onClick={() => setSelectedDateRange('all')}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{events.length}</p>
                                <p className="text-xs text-gray-600">Total Memories</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-100 rounded-full">
                                <Heart className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{filteredEvents.length}</p>
                                <p className="text-xs text-gray-600">Found</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-pink-100 rounded-full">
                                <Image className="w-5 h-5 text-pink-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{events.reduce((acc, event) => acc + event.photos.length, 0)}</p>
                                <p className="text-xs text-gray-600">Photos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Memory Timeline */}
                <div className="space-y-4">
                    {filteredEvents.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-800">Memory Timeline</h2>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>Sorted by newest first</span>
                                </div>
                            </div>

                            {viewMode === 'list' ? (
                                <div className="space-y-4">
                                    {Object.entries(getEventsByMonth()).map(([month, monthEvents]) => (
                                        <div key={month} className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-px bg-gradient-to-r from-purple-400 to-pink-400 flex-1"></div>
                                                <h3 className="text-sm font-semibold text-gray-600 bg-white px-3 py-1 rounded-full border border-purple-200">
                                                    {month}
                                                </h3>
                                                <div className="h-px bg-gradient-to-r from-pink-400 to-purple-400 flex-1"></div>
                                            </div>
                                            
                                            {monthEvents.map((event, index) => (
                                                <div
                                                    key={event.id}
                                                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                                    style={{
                                                        animationDelay: `${index * 0.1}s`,
                                                        animation: 'fadeInUp 0.5s ease-out forwards'
                                                    }}
                                                >
                                                    <div className="flex items-start space-x-4">
                                                        <div className="relative">
                                                            <div className="bg-gradient-to-br from-blue-400 to-pink-400 p-3 rounded-full">
                                                                <Camera className="w-6 h-6 text-white" />
                                                            </div>
                                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <h3 className="font-bold text-gray-800 text-lg">{event.title}</h3>
                                                                <div className="text-right">
                                                                    <p className="text-sm text-gray-600 font-medium">
                                                                        {new Date(event.date).toLocaleDateString('en-US', {
                                                                            month: 'short',
                                                                            day: 'numeric',
                                                                            year: 'numeric'
                                                                        })}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">{getTimeAgo(event.date)}</p>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="relative mb-3">
                                                                <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-pink-400 rounded-full"></div>
                                                                <blockquote className="pl-4 text-gray-700 italic leading-relaxed">
                                                                    "{event.note}"
                                                                </blockquote>
                                                            </div>
                                                            
                                                            {event.photos.length > 0 && (
                                                                <div className="flex items-center space-x-2">
                                                                    <div className="flex items-center space-x-1">
                                                                        <Image className="w-4 h-4 text-gray-500" />
                                                                        <span className="text-sm text-gray-600">Photos:</span>
                                                                    </div>
                                                                    <div className="flex space-x-2">
                                                                        {event.photos.slice(0, 6).map((photo, idx) => (
                                                                            <div key={idx} className="relative">
                                                                                <span className="text-2xl hover:scale-110 transition-transform duration-200 cursor-pointer">
                                                                                    {photo}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                        {event.photos.length > 6 && (
                                                                            <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                                                                                <span className="text-xs text-gray-600 font-medium">
                                                                                    +{event.photos.length - 6}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {filteredEvents.map((event, index) => (
                                        <div
                                            key={event.id}
                                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="bg-gradient-to-br from-blue-400 to-pink-400 p-2 rounded-full">
                                                    <Camera className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-800 text-sm">{event.title}</h3>
                                                    <p className="text-xs text-gray-600">{getTimeAgo(event.date)}</p>
                                                </div>
                                            </div>
                                            
                                            <p className="text-sm text-gray-700 italic mb-2 line-clamp-2">
                                                "{event.note}"
                                            </p>
                                            
                                            {event.photos.length > 0 && (
                                                <div className="flex space-x-1">
                                                    {event.photos.slice(0, 3).map((photo, idx) => (
                                                        <span key={idx} className="text-lg">{photo}</span>
                                                    ))}
                                                    {event.photos.length > 3 && (
                                                        <span className="text-xs text-gray-500">+{event.photos.length - 3}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
                            <div className="text-6xl mb-4">
                                {searchQuery || filterDate ? '🔍' : '📅'}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {searchQuery || filterDate ? 'No memories found' : 'No memories yet'}
                            </h3>
                            <p className="text-gray-500 text-lg mb-4">
                                {searchQuery || filterDate ? 
                                    'Try adjusting your search or filters' : 
                                    'Start creating your first memory! 💕'
                                }
                            </p>
                            {(searchQuery || filterDate) && (
                                <button
                                    onClick={clearAllFilters}
                                    className="text-purple-600 hover:text-purple-800 font-medium"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced FAB */}
            <div className="fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 group relative"
                >
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>

            {/* Modal */}
            {showModal && <MemoryModal onClose={() => setShowModal(false)} />}

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default Page;