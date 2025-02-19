import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import heroRoutes from './routes/heroRoutes';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow React frontend
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use('/api', heroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
