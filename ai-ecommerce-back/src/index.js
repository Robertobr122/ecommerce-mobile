// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRouter from './routers/UserRouter.js';
import productRouter from './routers/ProductRouter.js';
import cartRouter from './routers/CartRouter.js';
import chatRouter from './routers/ChatRouter.js';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import AiService from './services/AiService.js';


dotenv.config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const app = express();



const server = createServer(app)
const ws = new WebSocketServer({server}) 

//const clients = new Set()

console.log("ponto 1")

ws.on('connection', (client) => {

  console.log("ponto 2")
  //clients.add(client)

  client.on('message', async (message) => {

    const msg = message.toString()
    const msgJson = JSON.parse(msg)
    const pdfContextPath = "caminho"
    //AiService.longContext(msgJson.text, pdfContextPath)
    const result = await AiService.prompt(msgJson.text)


    //console.log("Received:", message)

    client.send(JSON.stringify({text: result.text(), sentBy: 'Gemini'}));

 /*   
    for (let c of clients) {
      if (c.readyState === WebSocket.OPEN) {
        c.send(message.toString());
      }
    }

  */
  });

  client.on('close', () => {
    //clients.delete(client)
  })
})

console.log("ponto 3")

app.use(express.json());
app.use(cors());

// Definir as rotas
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', chatRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server + WebSocket rodando em http://10.5.7.186:${PORT}`);
});
