import sql from "@/lib/db"

export async function GET() {
  try {
    // Run a simple query
    const result = await sql`SELECT * FROM items`
return new Response(JSON.stringify({ success: true, items: result }), {
  status: 200,
})

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
    })
  }
}
