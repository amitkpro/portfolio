import { NextResponse } from "next/server"
import { getGroqResponse } from "@/app/utils/groqService"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = await getGroqResponse(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
