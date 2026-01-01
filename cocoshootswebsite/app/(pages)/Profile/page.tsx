'use client';
import React from 'react';
export default function ProfilePage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="mb-12 border-b pb-8 "> 
                <h1 className="text-4xl font-bold mb-4 ">User Profile</h1>
                <p className="text-lg text-gray-600">Manage your personal information and settings.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">  
                <section className="flex flex-col border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                    <h2 className="text-xl font-bold mb-3 text-gray-800 ">Personal Information</h2>
                    <p className="text-gray-600 mb-4">Update your name, email, and other personal details.</p>
                    <button className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg">Edit Info</button>
                </section>

                <section className="flex flex-col border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Change Password</h2>
                    <p className="text-gray-600 mb-4">Secure your account with a strong password.</p>
                    <button className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg">Change Password</button>
                </section>  

                <section className="flex flex-col border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Notifications</h2>
                    <p className="text-gray-600 mb-4">Manage your notification preferences.</p>
                    <button className="w-full bg-[#253939] text-[#fef6e9] font-bold py-4 px-6 rounded-2xl hover:bg-[#D2532B] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg">Manage Notifications</button>
                </section>
            </div>
        </div>
    );
} 
//flex flex-col border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white