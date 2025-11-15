"use client";

import Link from "next/link";

export default function Navbar(){
    return ( 
        <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Xavier Caldwell Capstone</h1>
            <div className="space-x-4">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/login">Login</Link>
            </div>
        </nav>
    )
}