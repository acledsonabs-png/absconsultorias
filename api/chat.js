export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "Você é um consultor especialista em operações de delivery no Brasil, com foco em iFood e 99Food. Responda de forma objetiva e prática sobre métricas, CMV, DRE, atendimento, cancelamentos e estratégias operacionais." },
        ...messages
      ]
    })
  });

  const data = await response.json();
  const texto = data.choices?.[0]?.message?.content || "Sem resposta.";
  res.status(200).json({ content: [{ text: texto }] });
}
