"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage("");
    setMessageType("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
    } else {
      setMessage("Logging in...");
      setMessageType("success");
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    }
  }

  async function handleSignup(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage("");
    setMessageType("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
    } else {
      setMessage("Signup successful! Check your email to confirm.");
      setMessageType("success");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="mt-10 max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl text-black font-bold mb-4">Welcome</h2>
      <p className="text-gray-700">Sign in or create an account</p>

      {message && (
        <div
          className={`mt-4 p-2 rounded ${
            messageType === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <form className="mt-4" onSubmit={handleLogin}>
        <input
          aria-label="Email"
          className="border w-full placeholder-gray-400 text-black px-3 py-2 rounded mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          aria-label="Password"
          className="border w-full placeholder-gray-400 text-black px-3 py-2 rounded mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded mb-3 transition-colors hover:bg-blue-700 cursor-pointer"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleSignup}
          className="bg-gray-700 text-white w-full py-2 rounded transition-colors hover:bg-gray-800 cursor-pointer"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
