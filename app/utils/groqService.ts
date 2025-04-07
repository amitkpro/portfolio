import { Groq } from "groq-sdk"
import { cvData } from "./cvData"

// Function to get the API key from localStorage (client-side only)
const getApiKey = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("GROQ_API_KEY") || process.env.NEXT_GROQ_API_KEY || "default-key-placeholder"
  }
  return process.env.NEXT_GROQ_API_KEY || "default-key-placeholder"
}

// Initialize the GROQ client
const getGroqClient = () => {
  return new Groq({
    apiKey: getApiKey(),
  })
}

// Define the system prompt that instructs GROQ how to respond
const systemPrompt = `
You are AmitBot 9000, an AI assistant that exclusively provides information about Amit Kumar based on his CV data.

Here is Amit Kumar's CV data:
${JSON.stringify(cvData, null, 2)}

IMPORTANT INSTRUCTIONS:
1. ONLY answer questions related to Amit's professional background, skills, experience, projects, education, or interests.
2. If asked about anything outside of this CV data, politely explain that you can only provide information about Amit's professional background.
3. For casual greetings like "hello", "hi", etc., respond as "Amit's AI assistant" with a friendly greeting.
4. Keep your responses concise, professional, and based ONLY on the CV data provided.
5. Do not make up or infer information that is not explicitly stated in the CV data.
6. If you're unsure if the information is in the CV, state that you don't have that specific information.

Remember: You are representing Amit Kumar professionally. Your responses should reflect his professional image.
`

// Function to check if a message is a casual greeting
const isCasualGreeting = (message: string): boolean => {
  const greetings = ["hello", "hi", "hey", "greetings", "howdy", "hola", "what's up", "sup"]
  return greetings.some((greeting) => message.toLowerCase().includes(greeting))
}

// Function to get a response from GROQ
export const getGroqResponse = async (message: string): Promise<string> => {
  try {
    // Handle casual greetings differently
    if (isCasualGreeting(message) && message.split(" ").length < 4) {
      return `Hi there! I'm Amit's AI assistant. How can I help you learn about Amit's professional background today?`
    }

    // For CV-related queries, use GROQ
    const groq = getGroqClient()
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.5,
      max_tokens: 1024,
    })

    return completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request."
  } catch (error) {
    console.error("Error querying GROQ:", error)
    return "I'm having trouble accessing Amit's information right now. Please try again later."
  }
}

