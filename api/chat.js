export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: "Você é um consultor especialista em operações de delivery no Brasil, com foco em iFood e 99Food. Responda de forma objetiva e prática sobre métricas, CMV, DRE, atendimento, cancelamentos e estratégias operacionais.",
      messages
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
