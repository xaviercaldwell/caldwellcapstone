"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Item {
  id: number;
  description: string | null;
  created_at: Date;
  updated_at: Date | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [newDescription, setNewDescription] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/login");
      else {
        setUserEmail(session.user.email ?? null);
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) router.push("/login");
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  async function fetchItems() {
    try {
      const res = await fetch("/api/testdb");
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  }

  useEffect(() => {
    fetchItems().finally(() => setLoading(false));
  }, []);
// --- NEW handle add
  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newDescription.trim()) return;

    setPosting(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      if (!token) {
        console.error("No session token found, cannot post.");
        setPosting(false);
        return;
      }
//post request with auth 
      const res = await fetch("/api/testdb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // THIS IS WHERE IT GOES
        },
        body: JSON.stringify({ description: newDescription }),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error(
          "Failed to parse JSON from POST response. Likely network/database issue.",
          err
        );
        setPosting(false);
        return;
      }

      if (data.success) {
        setNewDescription("");
        fetchItems();
      } else {
        console.error("POST error:", data.error);
      }
    } catch (err) {
      console.error("POST request failed:", err);
    } finally {
      setPosting(false);
    }
  }

  // --- NEW handle DELETE ---
  async function handleDeleteItem(id: number) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) {
        console.error("No session token found, cannot delete.");
        return;
      }

      const res = await fetch("/api/testdb", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Failed to parse JSON from DELETE response.", err);
        return;
      }

      if (data.success) {
        fetchItems(); // refresh table
      } else {
        console.error("DELETE error:", data.error);
      }
    } catch (err) {
      console.error("DELETE request failed:", err);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!userEmail) return <p>Redirecting to login...</p>;

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-start py-16 px-8 bg-white dark:bg-black sm:items-start sm:px-16 sm:py-32 rounded-lg shadow">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h2 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Dashboard
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            Welcome, {userEmail}!
          </p>

          {/* --- ADD NEW ITEM --- */}
          <h2 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            New Item Input
          </h2>
          <form onSubmit={handleAddItem} className="w-full flex gap-2">
            <input
              className="flex-1 border px-3 py-2 rounded text-black dark:text-white placeholder-gray-400"
              placeholder="New item description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button
              type="submit"
              disabled={posting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              {posting ? "Adding..." : "Add"}
            </button>
          </form>

          {/* --- ITEMs  --- */}
          <div className="w-full overflow-x-auto mt-4">
            <table className="w-full border-collapse border border-gray-300 dark:border-zinc-700 text-left">
              <thead className="bg-zinc-100 dark:bg-zinc-900">
                <tr>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">
                ID
                  </th>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">
                    Description
                  </th>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">
                    Created At
                  </th>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">
                    Updated At
                  </th>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <td className="border p-3 text-zinc-800 dark:text-zinc-200">
                      {item.id}
                    </td>
                    <td className="border p-3 text-zinc-800 dark:text-zinc-200">
                      {item.description ?? "-"}
                    </td>
                    <td className="border p-3 text-zinc-800 dark:text-zinc-200">
                      {item.created_at.toLocaleString()}
                    </td>
                    <td className="border p-3 text-zinc-800 dark:text-zinc-200">
                      {item.updated_at ? item.updated_at.toLocaleString() : "-"}
                    </td>
                    <td className="border p-3 text-zinc-800 dark:text-zinc-200">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
