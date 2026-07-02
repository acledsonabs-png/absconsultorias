export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido"
    });
  }

  try {
    const { messages } = req.body;

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
                text: "Você é um consultor especialista em delivery, iFood, 99Food, CMV, DRE, gestão de restaurantes, marketing, estoque, precificação, ticket médio e aumento de vendas. Sempre responda em português do Brasil."
              }
            ]
          },
          ...(messages || []).map((m) => ({
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

    if (!response.ok) {
      const erro = await response.text();
      return res.status(response.status).json({
        error: erro
      });
    }

    const data = await response.json();

    const content =
      data.output?.[0]?.content?.find((c) => c.type === "output_text")?.text ||
      "Sem resposta.";

    return res.status(200).json({
      content
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
