import express from 'express';
import dotenv from 'dotenv';
import insuranceChatRoutes from './routes/insuranceChatRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', insuranceChatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// This code sets up an Express server that listens on a specified port.
// It uses dotenv to load environment variables and sets up a route for handling insurance chat requests.   