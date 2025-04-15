import { Translate } from "@aws-sdk/client-translate"

// Initialize the Amazon Translate client
const translateClient = new Translate({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  // If no text or target language is provided, return the original text
  if (!text || !targetLanguage) {
    return text
  }

  // If AWS credentials are not configured, return the original text with a warning
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.warn("AWS credentials are not configured. Skipping translation.")
    return text
  }

  try {
    // Call Amazon Translate to translate the text
    const result = await translateClient.translateText({
      Text: text,
      SourceLanguageCode: "auto", // Auto-detect source language
      TargetLanguageCode: targetLanguage,
    })

    // Return the translated text
    return result.TranslatedText || text
  } catch (error) {
    console.error("Error translating text:", error)
    // Return the original text if translation fails
    return text
  }
}
