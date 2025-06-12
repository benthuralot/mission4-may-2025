import express from 'express';
import { handleInsuranceChat } from '../controllers/insuraceChatController';

const router = express.Router();

router.post('/insurance-chat', handleInsuranceChat);

export default router;

// This code defines a route for handling insurance chat requests.
// It imports the necessary modules, sets up a POST route at '/insurance-chat', and calls the handleInsuranceChat function.