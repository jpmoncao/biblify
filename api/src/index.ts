import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/conn';
import userRouter from './routers/user';
import versesRouter from './routers/verse';
import notesRouter from './routers/note';
import checkTokenMiddleware from './middlewares/check-token';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados
(async () => {
    try {
        await connectDB();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
})();

// Teste de saúde da API
app.get('/', (req, res) => { res.status(201).json({ message: 'API is running!' }) });

// Rotas
app.use('/api/users', userRouter);
app.use('/api/verses', checkTokenMiddleware, versesRouter);
app.use('/api/notes', checkTokenMiddleware, notesRouter);

// Inicialização do Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
