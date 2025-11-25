// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {supabase} from "@/lib/supabase"; 
export default async function DashboardPage() {

    
  // check if the user has a valid session
  const { data: { session } } = await supabase.auth.getSession();

  // redirect if not logged in
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mt-10 max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <p className="text-gray-700 mb-4">You are signed in! This page is protected.</p>

      {/* Placeholder for future DB interaction */}
      <div className="border p-4 rounded bg-gray-50">
        <p>This is where your database content will show up.</p>
        <p>Later, we’ll allow adding, editing, and deleting rows here.</p>
      </div>
    </div>
  );
}
