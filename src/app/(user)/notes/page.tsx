"use client";
import MemoryModal from "@/components/modal/memory-modal";
import { ArrowLeft, Plus, X, Filter, Calendar, Heart, Search, SortAsc, SortDesc, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import useSWR from "swr";

interface Note {
    id: number;
    text: string;
    createdAt: string;
}

const Page = () => {
    const { data } = useSWR<{notes: Note[]} | undefined>('/api/users/me/relationship/notes', (url:string) => fetch(url).then(res => res.json()));

    const [filterDate, setFilterDate] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [showFilters, setShowFilters] = useState<boolean>(false);

    // Filter and sort notes
    const filteredNotes = useMemo(() => {
        if (!data?.notes) return [];
        
        let filtered = data.notes;
        
        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(note => 
                note.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // Apply date filter
        if (filterDate) {
            filtered = filtered.filter(note => 
                new Date(note.createdAt).toDateString() === new Date(filterDate).toDateString()
            );
        }
        
        // Apply sort
        filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
        
        return filtered;
    }, [data?.notes, searchQuery, filterDate, sortOrder]);

    const clearAllFilters = () => {
        setFilterDate(null);
        setSearchQuery('');
        setSortOrder('newest');
        setShowFilters(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Today';
        if (diffDays === 2) return 'Yesterday';
        if (diffDays <= 7) return `${diffDays - 1} days ago`;
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 flex items-center justify-between sticky top-0 z-10 shadow-xl backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                    <Link href={'/home'} className="text-white hover:text-pink-200 transition-colors duration-200">
                        <div className="p-2 rounded-full hover:bg-white/20 transition-all duration-200">
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Heart className="w-6 h-6 text-white animate-pulse" />
                            <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Love Notes</h1>
                            <p className="text-xs text-white/80">
                                {data?.notes?.length || 0} precious memories
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 text-white"
                >
                    <Filter className="w-6 h-6" />
                </button>
            </div>

            {/* Enhanced Filters Section */}
            <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white/80 backdrop-blur-sm m-4 rounded-3xl p-6 shadow-xl border border-purple-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-purple-500" />
                            <span>Filter & Sort</span>
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
                                placeholder="Search your love notes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                            />
                        </div>

                        {/* Date and Sort Row */}
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
                            <button
                                onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                                className="flex items-center justify-center space-x-2 py-3 px-4 border-2 border-purple-200 rounded-2xl hover:border-purple-400 transition-all duration-200"
                            >
                                {sortOrder === 'newest' ? 
                                    <SortDesc className="w-5 h-5 text-purple-500" /> : 
                                    <SortAsc className="w-5 h-5 text-purple-500" />
                                }
                                <span className="text-sm font-medium text-gray-700">
                                    {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                                </span>
                            </button>
                        </div>

                        {/* Active Filters */}
                        {(searchQuery || filterDate) && (
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
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced Notes List */}
            <div className="p-4">
                <div className="space-y-4 pb-20">
                    {data?.notes !== undefined ? (
                        filteredNotes.length > 0 ? (
                            <>
                                {/* Results count */}
                                <div className="text-sm text-gray-600 mb-4 flex items-center justify-between">
                                    <span>
                                        {filteredNotes.length} of {data.notes.length} notes
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <div className="h-2 w-2 bg-pink-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs">Live updates</span>
                                    </div>
                                </div>

                                {filteredNotes.map((note, index) => (
                                    <div
                                        key={note.id}
                                        className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            animation: 'fadeInUp 0.5s ease-out forwards'
                                        }}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full">
                                                    <Heart className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">
                                                        Love Note #{note.id}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatDate(note.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <div className="flex items-center space-x-1">
                                                    <div className="h-1 w-1 bg-pink-400 rounded-full"></div>
                                                    <div className="h-1 w-1 bg-purple-400 rounded-full"></div>
                                                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="relative">
                                            <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-pink-400 to-purple-400 rounded-full"></div>
                                            <blockquote className="pl-6 text-gray-800 font-medium leading-relaxed text-lg italic">
                                                "{note.text}"
                                            </blockquote>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
                                <div className="text-6xl mb-4">
                                    {searchQuery || filterDate ? '🔍' : '💌'}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {searchQuery || filterDate ? 'No matches found' : 'No Love Letters Yet'}
                                </h3>
                                <p className="text-gray-500 text-lg mb-4">
                                    {searchQuery || filterDate ? 
                                        'Try adjusting your search or filters' : 
                                        'Start writing your first sweet note! 💕'
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
                        )
                    ) : (
                        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                            <p className="text-gray-500 text-lg">Loading your love notes...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced FAB */}
            <div className="fixed bottom-6 right-6 z-20">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-300 group relative"
                >
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                </button>
                <p className="text-xs text-gray-600 text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Add Note
                </p>
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
            `}</style>
        </div>
    );
};

export default Page;