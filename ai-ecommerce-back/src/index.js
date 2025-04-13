// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRouter from './routers/UserRouter.js';
import productRouter from './routers/ProductRouter.js';
import cartRouter from './routers/CartRouter.js';
import chatRouter from './routers/ChatRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Definir as rotas
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', chatRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
