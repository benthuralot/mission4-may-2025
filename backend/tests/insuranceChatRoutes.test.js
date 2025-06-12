import request from 'supertest';
import express from 'express';
import insuranceChatRoutes from '../routes/insuranceChatRoutes.js';
import * as geminiClient from '../utils/geminiClient.js';

const app = express();
app.use(express.json());
app.use('/api', insuranceChatRoutes);

describe('POST /api/insurance-chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a Gemini reply', async () => {
    jest.spyOn(geminiClient, 'sendToGemini').mockResolvedValue('Coverage info here.');

    const response = await request(app)
      .post('/api/insurance-chat')
      .send({ userMessage: 'Tell me about coverage', chatHistory: [] });

    expect(response.status).toBe(200);
    expect(response.body.reply).toBe('Coverage info here.');
  });

  it('should return 500 on Gemini error', async () => {
    jest.spyOn(geminiClient, 'sendToGemini').mockRejectedValue(new Error('fail'));

    const response = await request(app)
      .post('/api/insurance-chat')
      .send({ userMessage: 'Tell me about coverage', chatHistory: [] });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Gemini API error' });
  });
});
