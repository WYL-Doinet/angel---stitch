"use client";
import { getFetcher, postFetcher } from "@/utils/client/fetcher";
import { ArrowLeft, Calendar, Heart, User, Sparkles, Save, Check } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import useSWR from "swr";

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [activeForm, setActiveForm] = useState<'profile' | 'partner' | null>(null);
    
    const { data: user, mutate } = useSWR<any | undefined>('/api/users/me', () => {
        return getFetcher({ url: '/api/users/me' })
    }, { revalidateOnMount: false });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, type: 'profile' | 'partner') => {
        e.preventDefault();
        setIsSubmitting(true);
        setActiveForm(type);
        
        const el = e.target as HTMLFormElement;
        const formData = new FormData(el);
        const body = Object.fromEntries(formData.entries().filter(([key, value]) => value)) as any;
        
        if ('dateOfBirth' in body) {
            body.dateOfBirth = new Date(body.dateOfBirth as string);
        }
        
        try {
            const endpoint = type === 'profile' ? '/api/users/me' : '/api/users/me/partner';
            const data = await postFetcher({ url: endpoint, body, method: "PATCH" });
            mutate({ ...user, ...data });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error: unknown) {
            if (error instanceof Response) {
                const data = await error.json();
            }
        } finally {
            setIsSubmitting(false);
            setActiveForm(null);
        }
    };

    const handleStartDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const body = {
            startDate: new Date(e.target.value),
        };
        try {
            const data = await postFetcher({ url: '/api/users/me/relationship', body, method: "PATCH" });
            mutate({ ...user, ...data });
        } catch (error: unknown) {
            if (error instanceof Response) {
                const data = await error.json();
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-xl backdrop-blur-sm">
                <Link href={'/home'} className="text-white hover:text-purple-200 transition-colors duration-200">
                    <div className="p-2 rounded-full hover:bg-white/20 transition-all duration-200">
                        <ArrowLeft className="w-6 h-6" />
                    </div>
                </Link>
                <div className="flex items-center space-x-2">
                    <Heart className="w-6 h-6 text-white animate-pulse" />
                    <h1 className="text-xl font-bold text-white">Love Settings</h1>
                </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-bounce">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Settings saved successfully!</span>
                </div>
            )}

            <div className="p-4 space-y-6 max-w-md mx-auto">
                {/* Anniversary Date Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Our Special Date</h3>
                            <p className="text-sm text-gray-600">When our love story began</p>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            onChange={handleStartDateChange}
                            type="date"
                            defaultValue={user?.relationship?.startDate.split('T')[0]}
                            className="w-full p-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-700 font-medium"
                        />
                        <div className="absolute right-4 top-4 text-purple-400">
                            <Sparkles className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Your Profile Section */}
                <form onSubmit={(e) => handleSubmit(e, 'profile')} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Your Profile</h3>
                            <p className="text-sm text-gray-600">Tell us about yourself</p>
                        </div>
                    </div>
                    
                    <div className="space-y-5">
                        <div className="group">
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center space-x-2">
                                <span>Name</span>
                                <div className="h-1 w-1 bg-purple-400 rounded-full"></div>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={user?.name || ''}
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 group-hover:border-purple-300"
                                placeholder="Your beautiful name"
                            />
                        </div>
                        
                        <div className="group">
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center space-x-2">
                                <span>Birthday</span>
                                <div className="h-1 w-1 bg-purple-400 rounded-full"></div>
                            </label>
                            <input
                                type="date"
                                defaultValue={user?.dateOfBirth?.split('T')[0]}
                                name="dateOfBirth"
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 group-hover:border-purple-300"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting && activeForm === 'profile'}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting && activeForm === 'profile' ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    <span>Save Profile</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Partner Section */}
                <form onSubmit={(e) => handleSubmit(e, 'partner')} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Your Partner</h3>
                            <p className="text-sm text-gray-600">The love of your life</p>
                        </div>
                    </div>
                    
                    <div className="space-y-5">
                        <div className="group">
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center space-x-2">
                                <span>Name</span>
                                <div className="h-1 w-1 bg-pink-400 rounded-full"></div>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={user?.partner?.name || ''}
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200 group-hover:border-pink-300"
                                placeholder="Your partner's name"
                            />
                        </div>
                        
                        <div className="group">
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center space-x-2">
                                <span>Birthday</span>
                                <div className="h-1 w-1 bg-pink-400 rounded-full"></div>
                            </label>
                            <input
                                type="date"
                                defaultValue={user?.partner?.dateOfBirth?.split('T')[0]}
                                name="dateOfBirth"
                                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200 group-hover:border-pink-300"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting && activeForm === 'partner'}
                            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting && activeForm === 'partner' ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    <span>Save Partner</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;