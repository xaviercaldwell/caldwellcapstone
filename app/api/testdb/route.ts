// import sql from "@/lib/db";
// import { NextResponse } from "next/server";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// // GET public
// export async function GET() {
//   try {
//     const result = await sql`SELECT * FROM items`;
//     return NextResponse.json({ success: true, data: result });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
//   }
// }

// // POST
// export async function POST(req: Request) {
//   const supabase = createRouteHandlerClient({ cookies });

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//   }

//   const { description } = await req.json();

//   const result = await sql`INSERT INTO items (description, date_created) VALUES (${description}, now()) RETURNING *`;

//   return NextResponse.json({ success: true, data: result });
// }

// //DELETE FUNCTION
// export async function DELETE(req: Request) {
//   const supabase = createRouteHandlerClient({ cookies });

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) {
//     return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//   }

//   const { id } = await req.json(); // expects id NUMBER

//   try {
//     await sql`DELETE FROM items WHERE id = ${id}`;
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
//   }
// }
// //I could do put but man im tired