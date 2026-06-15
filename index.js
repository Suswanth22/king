import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import motorRoutes from './routes/motor.js';
import designRoutes from './routes/design.js';
import simulationRoutes from './routes/simulation.js';
import exportRoutes from './routes/export.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Motor-AI-Design API is running ✓' });
});

// API Routes
app.use('/api/motor', motorRoutes);
app.use('/api/design', designRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/export', exportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Motor-AI-Design API listening on port ${PORT}`);
});
