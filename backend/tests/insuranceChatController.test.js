import { handleInsuranceChat } from '../controllers/insuraceChatController.js';
import * as geminiClient from '../utils/geminiClient.js';

describe('handleInsuranceChat', () => {
  const mockReq = {
    body: {
      userMessage: 'Tell me about coverage.',
      chatHistory: [],
    },
  };

  const mockRes = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a reply from Gemini', async () => {
    jest.spyOn(geminiClient, 'sendToGemini').mockResolvedValue('You are covered.');

    await handleInsuranceChat(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({ reply: 'You are covered.' });
  });

  it('should handle errors and return status 500', async () => {
    jest.spyOn(geminiClient, 'sendToGemini').mockRejectedValue(new Error('API failed'));

    await handleInsuranceChat(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Gemini API error' });
  });
});
