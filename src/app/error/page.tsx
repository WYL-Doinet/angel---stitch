'use client'
import React, { useState } from 'react';
import { AlertCircle, Home, RefreshCw, ArrowLeft, Search, Shield, Clock, Zap } from 'lucide-react';
import { useSearchParams } from 'next/navigation'
import { signOut } from '../(auth)/sign-out/action';
const ErrorPage = () => {
    const errorConfigs = {
        400: {
            title: "Bad Request",
            message: "The request couldn't be understood by the server due to invalid syntax.",
            icon: <AlertCircle className="w-16 h-16" />,
            actions: [
                { label: "Check Input", action: () => alert("Checking input validation..."), icon: <Search className="w-4 h-4" /> },
                { label: "Go Home", action: () => alert("Redirecting to home..."), icon: <Home className="w-4 h-4" /> }
            ]
        },
        401: {
            title: "Unauthorized",
            message: "You need to authenticate to access this resource.",
            icon: <Shield className="w-16 h-16" />,
            actions: [
                { label: "Login", action: () => signOut(), icon: <Shield className="w-4 h-4" /> },
                { label: "Go Home", action: () => alert("Redirecting to home..."), icon: <Home className="w-4 h-4" /> }
            ]
        },
        403: {
            title: "Forbidden",
            message: "You don't have permission to access this resource.",
            icon: <Shield className="w-16 h-16" />,
            actions: [
                { label: "Contact Support", action: () => alert("Opening support chat..."), icon: <AlertCircle className="w-4 h-4" /> },
                { label: "Go Back", action: () => alert("Going back..."), icon: <ArrowLeft className="w-4 h-4" /> }
            ]
        },
        404: {
            title: "Page Not Found",
            message: "The page you're looking for doesn't exist or has been moved.",
            icon: <Search className="w-16 h-16" />,
            actions: [
                { label: "Go Home", action: () => alert("Redirecting to home..."), icon: <Home className="w-4 h-4" /> },
                { label: "Search", action: () => alert("Opening search..."), icon: <Search className="w-4 h-4" /> },
                { label: "Go Back", action: () => alert("Going back..."), icon: <ArrowLeft className="w-4 h-4" /> }
            ]
        },
        500: {
            title: "Internal Server Error",
            message: "Something went wrong on our end. We're working to fix it.",
            icon: <Zap className="w-16 h-16" />,
            actions: [
                { label: "Try Again", action: () => alert("Retrying..."), icon: <RefreshCw className="w-4 h-4" /> },
                { label: "Report Issue", action: () => alert("Opening issue report..."), icon: <AlertCircle className="w-4 h-4" /> },
                { label: "Go Home", action: () => alert("Redirecting to home..."), icon: <Home className="w-4 h-4" /> }
            ]
        },
        502: {
            title: "Bad Gateway",
            message: "The server received an invalid response from the upstream server.",
            icon: <Zap className="w-16 h-16" />,
            actions: [
                { label: "Refresh", action: () => alert("Refreshing page..."), icon: <RefreshCw className="w-4 h-4" /> },
                { label: "Try Later", action: () => alert("Setting reminder..."), icon: <Clock className="w-4 h-4" /> }
            ]
        },
        503: {
            title: "Service Unavailable",
            message: "The service is temporarily unavailable. Please try again later.",
            icon: <Clock className="w-16 h-16" />,
            actions: [
                { label: "Refresh", action: () => alert("Refreshing page..."), icon: <RefreshCw className="w-4 h-4" /> },
                { label: "Status Page", action: () => alert("Opening status page..."), icon: <AlertCircle className="w-4 h-4" /> }
            ]
        }
    };
    const searchParams = useSearchParams()
    const currentStatus =  parseInt(searchParams.get('status') || "500" ) 
    const currentError = errorConfigs[currentStatus as keyof typeof errorConfigs];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Status Code Selector */}
                <div className="mb-8 text-center">
                    <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/20">
                        {Object.keys(errorConfigs).map((status) => (
                            <button
                                key={status}
                            
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 mx-1 ${currentStatus === parseInt(status)
                                    ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                    <div className="p-8 md:p-12">
                        {/* Error Icon and Status Code */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br  rounded-full mb-6 text-gradient-to-r from-blue-600 to-pink-600">
                                {currentError.icon}
                            </div>
                            <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                {currentStatus}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                {currentError.title}
                            </h1>
                            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                                {currentError.message}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {currentError.actions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.action}
                                    className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${index === 0
                                        ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                                        : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md'
                                        }`}
                                >
                                    {action.icon}
                                    {action.label}
                                </button>
                            ))}
                        </div>

                        {/* Decorative Elements */}
                        <div className="mt-8 text-center">
                            <div className="flex items-center justify-center gap-2 text-gray-400">
                                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-100"></div>
                                <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500">
                    <p className="text-sm">
                        Need help? Contact our{' '}
                        <button className="text-blue-600 hover:text-pink-600 font-medium transition-colors">
                            support team
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;