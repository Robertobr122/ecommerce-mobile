// src/controllers/ChatController.js
const chatController = {
    // Chat entre usuários ou FAQ
    userChat: async (req, res) => {
      const { message } = req.body;
      // Exemplo: ecoar a mensagem recebida
      res.json({ response: `Você disse: ${message}` });
    },
    // Chat com a IA
    aiChat: async (req, res) => {
      const { question } = req.body;
      // Exemplo simples: resposta fixa ou integração com um serviço de IA
      res.json({ response: `Resposta da IA para a pergunta: "${question}"` });
    }
  };
  
  export default chatController;
  