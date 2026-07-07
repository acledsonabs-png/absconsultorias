export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido"
    });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "A variável OPENAI_API_KEY não foi configurada na Vercel."
      });
    }

    const { messages = [] } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.5",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: "Você é um consultor especialista em delivery, iFood, 99Food, CMV, DRE, gestão de restaurantes, estoque, marketing, ticket médio e aumento de vendas. Responda sempre em português do Brasil."
              }
            ]
          },
          ...messages.map((m) => ({
            role: m.role,
            content: [
              {
                type: "input_text",
                text: m.content
              }
            ]
          }))
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return res.status(response.status).json({
        error: data.error?.message || "Erro ao consultar a OpenAI."
      });
    }

    const content =
      data.output?.[0]?.content?.find(
        (item) => item.type === "output_text"
      )?.text || "Sem resposta.";

    return res.status(200).json({
        content
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message
    });
  }
}
