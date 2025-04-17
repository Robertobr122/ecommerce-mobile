import { GoogleGenerativeAI }  from "@google/generative-ai";
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21"
})

const AiService = {

    prompt: async (question) => {
      const p = {
        "contents": [
          {
            "parts": [
              {"text": question}
            ]
          }
        ]
      }

      const result = await model.generateContent(p, {timeout: 60000})
      return result.response;

    },

    longContext: async (question, pdfPath) => {

      const instructions = `
                            Você é uma IA especializada em análise de dados de comércio eletrônico. 
                            Seu objetivo é auxiliar na análise de um banco de dados de compras de usuários, fornecendo resumos, identificando padrões, detectando anomalias, ou respondendo perguntas específicas sobre pedidos, produtos, clientes e pagamentos.
      
                            instrução:
                            Query: ${question}

                            ` 

      const pdfBuffer = await fs.readFileSync(pdfPath)
      const pdfBase64 = pdfBuffer.toString('base64')

      const p = {
        "contents": [
          {
            "parts": [

              {"text": instructions},
              {"inline_data": {"mime_type": "application/pdf", "data": pdfBase64} }

            ]
          }
        ]
      }

      const result = await model.generateContent(p, {timeout: 60000})
      return result.response;

    }
  };
  
  export default AiService;
  