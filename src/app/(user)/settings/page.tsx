"use client";
import { getFetcher, postFetcher } from "@/utils/client/fetcher";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent } from "react";
import useSWR from "swr";


const Page = () => {
    const { data: user, mutate } = useSWR<any | undefined>('/api/users/me', () => {
        return getFetcher({ url: '/api/users/me' })
    }, { revalidateOnMount: false })



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const el = e.target as HTMLFormElement
        const formData = new FormData(el)
        const body = Object.fromEntries(formData.entries().filter(([key, value]) => value)) as any;
        if ('dateOfBirth' in body) {
            body.dateOfBirth = new Date(body.dateOfBirth as string);
        }
        try {
            const data = await postFetcher({ url: '/api/users/me', body, method: "PATCH" })
            mutate({ ...user, ...data })
        } catch (error: unknown) {
            if (error instanceof Response) {
                const data = await error.json();
            }
        }
    }

    const handleStartDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const body = {
            startDate: new Date(e.target.value),
        };
        try {
            const data = await postFetcher({ url: '/api/users/me/relationship', body, method: "PATCH" })
            mutate({ ...user, ...data })
        } catch (error: unknown) {
            if (error instanceof Response) {
                const data = await error.json();
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-md">
                <Link href={'/home'} className="text-white">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold text-white">Love Settings</h1>
            </div>
            <div className="p-4 space-y-6">

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-800 mb-4">
                        Our Special Start Date
                    </h3>
                    <input
                        onChange={handleStartDateChange}
                        type="date"
                        defaultValue={user?.relationship?.startDate.split('T')[0]}
                        className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:border-purple-400"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                        This is the day our love story began ✨
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-800 text-lg mb-4">
                        Your Profile
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-700 text-sm font-medium mb-2 block">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={user?.name || ''}
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                                placeholder="e.g., Stitch"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 text-sm font-medium mb-2 block">
                                Birthday
                            </label>
                            <input
                                type="date"
                                defaultValue={user?.dateOfBirth?.split('T')[0]}
                                name="dateOfBirth"
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            Save All Settings
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default Page;
