import { sendToGemini } from '../utils/geminiClient.js';

export async function handleInsuranceChat(req, res) {
  const { userMessage, chatHistory } = req.body;

  try {
    const reply = await sendToGemini(userMessage, chatHistory);
    res.json({ reply });
  } catch (error) {
    console.error('Error in insuranceChatController:', error);
    res.status(500).json({ error: 'Gemini API error' });
  }
}
// This function handles the insurance chat by sending the user's message and chat history to the Gemini API
// and returning the reply. It catches any errors and responds with a 500 status code if necessary. 