import sql from "@/lib/db";
import { NextResponse } from "next/server";

//  
export async function GET() {
  try {
    const result = await sql`SELECT * FROM items`;
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

//  
export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    const result = await sql`INSERT INTO items (description, date_created) VALUES (${description}, now()) RETURNING *`;
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
