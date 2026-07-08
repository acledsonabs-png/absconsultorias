async function sendMessage() {
  const message = chatInput.value.trim();

  if (!message) return;

  chatMsgs.innerHTML += `<div class="msg user">${message}</div>`;
  chatInput.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    console.log("Status:", response.status);
    console.log("URL:", response.url);

    const text = await response.text();

    console.log("Resposta:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      chatMsgs.innerHTML += `<div class="msg bot">❌ Resposta inválida do servidor:<br>${text}</div>`;
      return;
    }

    if (!response.ok) {
      chatMsgs.innerHTML += `<div class="msg bot">❌ ${data.error || "Erro desconhecido"}</div>`;
      return;
    }

    chatMsgs.innerHTML += `<div class="msg bot">${data.content}</div>`;

  } catch (err) {
    console.error(err);
    chatMsgs.innerHTML += `<div class="msg bot">❌ ${err.message}</div>`;
  }
}
