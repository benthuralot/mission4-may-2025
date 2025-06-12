import { sendToGemini } from '../utils/geminiClient.js';
import { tinaPrompt } from '../utils/tinaPrompt.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

jest.mock('@google/generative-ai', () => {
  const mockSendMessage = jest.fn();
  const mockStartChat = jest.fn();

  const mockModel = {
    startChat: mockStartChat,
  };

  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn(() => mockModel),
    })),
    __mocks__: {
      mockSendMessage,
      mockStartChat,
      mockModel,
    },
  };
});

const { __mocks__ } = jest.requireMock('@google/generative-ai');
const { mockSendMessage, mockStartChat } = __mocks__;

describe('sendToGemini', () => {
  beforeEach(() => {
    mockStartChat.mockResolvedValue({
      sendMessage: mockSendMessage,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return Gemini response text', async () => {
    mockSendMessage.mockResolvedValue({
      response: {
        text: () => 'Hi from Tina!',
      },
    });

    const result = await sendToGemini('Hello Tina');
    expect(result).toBe('Hi from Tina!');
  });

  it('should return fallback if Gemini gives no text', async () => {
    mockSendMessage.mockResolvedValue({
      response: {
        text: () => '',
      },
    });

    const result = await sendToGemini('No reply?');
    expect(result).toBe('Sorry, no response from Gemini.');
  });

  it('should throw an error if sendMessage fails', async () => {
    mockSendMessage.mockRejectedValue(new Error('Gemini is down'));

    await expect(sendToGemini('error test')).rejects.toThrow('Gemini is down');
  });
});
