"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Xavier Caldwell Capstone</h1>

      <div className="space-x-4">

        {/* Login status text */}
        {user === undefined ? (
          <span className="text-gray-400">Loading...</span>
        ) : user ? (
          <span className="text-green-400">Welcome, {user.email}</span>
        ) : (
          <span className="text-red-400">Not logged in</span>
        )}


        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
 {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}      </div>
    </nav>
  );
}
