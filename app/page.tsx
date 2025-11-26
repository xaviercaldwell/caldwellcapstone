"use client";

import { useEffect, useState } from "react";

interface Item {
  id: number;
  description: string | null;
  created_at: Date;
  updated_at: Date | null;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/testdb");
        const data = await res.json();
        if (data.success) {
          // Convert date strings → Date objects
          const normalized = data.data.map((it: any) => ({
            ...it,
            created_at: new Date(it.created_at),
            updated_at: it.updated_at ? new Date(it.updated_at) : null,
          }));
          setItems(normalized);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to my capstone project!
          </h1>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This prototype web app is meant to demonstrate proficiency in my
            three areas of study: Software development, cybersecurity, and
            project management.
          </p>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            To get started,{" "}
            <a href="/login" className="font-medium text-zinc-950 dark:text-zinc-50">
              login
            </a>{" "}
            or{" "}
            <a href="/signup" className="font-medium text-zinc-950 dark:text-zinc-50">
              sign up
            </a>{" "}
            with an email.
          </p>

          <h2 className="text-2xl font-semibold mt-10 text-black dark:text-zinc-50">
            Public Items
          </h2>

          {loading ? (
            <p className="text-zinc-600 dark:text-zinc-400">Loading items...</p>
          ) : (
            <div className="w-full overflow-x-auto mt-4">
              <table className="w-full border-collapse border border-gray-300 dark:border-zinc-700 text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-900">
                  <tr>
                    <th className="border p-3 text-zinc-900 dark:text-zinc-50">ID</th>
                    <th className="border p-3 text-zinc-900 dark:text-zinc-50">Description</th>
                    <th className="border p-3 text-zinc-900 dark:text-zinc-50">Created At</th>
                    <th className="border p-3 text-zinc-900 dark:text-zinc-50">Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                      <td className="border p-3 text-zinc-800 dark:text-zinc-200">{item.id}</td>
                      <td className="border p-3 text-zinc-800 dark:text-zinc-200">
                        {item.description ?? "-"}
                      </td>
                      <td className="border p-3 text-zinc-800 dark:text-zinc-200">
                        {item.created_at.toLocaleString()}
                      </td>
                      <td className="border p-3 text-zinc-800 dark:text-zinc-200">
                        {item.updated_at ? item.updated_at.toLocaleString() : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
