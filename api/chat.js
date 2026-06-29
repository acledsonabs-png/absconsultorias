export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${process.env.OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-5.5",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: `Você é um consultor especialista em delivery, iFood, 99Food,
CMV, DRE, gestão de restaurantes, marketing, estoque, precificação,
ticket médio e aumento de vendas.

Sempre responda em português do Brasil.`
              }
            ]
          },
          ...messages.map(m => ({
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

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
