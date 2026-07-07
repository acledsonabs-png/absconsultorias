export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido"
    });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENAI_API_KEY não configurada na Vercel."
      });
    }

    const { messages } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-5-mini",
          input: [
            {
              role: "system",
              content: [
                {
                  type: "input_text",
                  text:
                    "Você é o assistente da AS Consultorias. Especialista em delivery, iFood, 99Food, CMV, DRE, estoque, gestão de restaurantes, marketing e aumento de vendas. Responda sempre em português do Brasil."
                }
              ]
            },
            ...(messages || []).map((msg) => ({
              role: msg.role,
              content: [
                {
                  type: "input_text",
                  text: msg.content
                }
              ]
            }))
          ]
        })
      }
    );

    const data = await response.json();

    console.log("RESPOSTA OPENAI:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "Erro retornado pela OpenAI."
      });
    }

    let resposta = "";

    if (data.output) {
      data.output.forEach((item) => {
        if (item.content) {
          item.content.forEach((c) => {
            if (c.text) {
              resposta += c.text;
            }
          });
        }
      });
    }

    return res.status(200).json({
      content: resposta || "Não consegui gerar uma resposta."
    });

  } catch (error) {
    console.error("ERRO API:", error);

    return res.status(500).json({
      error: error.message
    });
  }
}
