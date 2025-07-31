import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/task', taskRoutes);

// healthcheck
app.get('/', (req, res) => res.send({ status: 'ok' }));

// Error genérico
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Error no manejado' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
