"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

interface Item {
  id: number;
  description: string | null;
  created_at: string;
  updated_at: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState("");
  const [posting, setPosting] = useState(false);

  // ----------------------
  // AUTH CHECK
  // ----------------------
  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error) {
        console.error("Error fetching session:", error);
        router.push("/login");
        return;
      }

      if (!session) {
        router.push("/login");
        return;
      }

      setUserEmail(session.user?.email ?? null);
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setUserEmail(session.user?.email ?? null);
      else router.push("/login");
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  // ----------------------
  // FETCH ITEMS
  // ----------------------
  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;

      setItems(
        data.map((it) => ({
          ...it,
          created_at: it.created_at,
          updated_at: it.updated_at,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) fetchItems();
  }, [userEmail]);

  // ----------------------
  // ADD ITEM
  // ----------------------
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDescription.trim()) return;

    setPosting(true);
    try {
      const { error } = await supabase
        .from("items")
        .insert({ description: newDescription });

      if (error) throw error;

      setNewDescription("");
      fetchItems();
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setPosting(false);
    }
  };

  // ----------------------
  // DELETE ITEM
  // ----------------------
  const handleDeleteItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase.from("items").delete().eq("id", id);
      if (error) throw error;
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

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

          {/* ADD ITEM */}
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {posting ? "Adding..." : "Add"}
            </button>
          </form>

          {/* ITEMS TABLE */}
          <div className="w-full overflow-x-auto mt-4">
            <table className="w-full border-collapse border border-gray-300 dark:border-zinc-700 text-left">
              <thead className="bg-zinc-100 dark:bg-zinc-900">
                <tr>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">ID</th>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">Description</th>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">Created At</th>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">Updated At</th>
                  <th className="border p-3 text-zinc-900 dark:text-zinc-50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                    <td className="border p-3 text-zinc-800 dark:text-zinc-200">{item.id}</td>
                    <td className="border p-3 text-zinc-800 dark:text-zinc-200">{item.description ?? "-"}</td>
                    <td className="border p-3 text-zinc-800 dark:text-zinc-200">{new Date(item.created_at).toLocaleString()}</td>
                    <td className="border p-3 text-zinc-800 dark:text-zinc-200">{item.updated_at ? new Date(item.updated_at).toLocaleString() : "-"}</td>
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
