import { NextResponse } from "next/server"
import { getGroqResponse } from "@/app/utils/groqService"
import { translateText } from "@/app/utils/translateService"

export async function POST(req: Request) {
  try {
    const { message , language="hi"} = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    let response = await getGroqResponse(message)
 // Translate the response to the user's selected language
//  if()
if (response && language && language !== "en") {
    const translatedResponse = await translateText(response, language)
    if (translatedResponse) {
     response = translatedResponse
    }
  }
    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
