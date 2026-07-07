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

    const data = await response.json();

    if (!response.ok) {
      chatMsgs.innerHTML += `<div class="msg bot">❌ ${JSON.stringify(data)}</div>`;
      return;
    }

    chatMsgs.innerHTML += `<div class="msg bot">${data.content}</div>`;

  } catch (err) {
    chatMsgs.innerHTML += `<div class="msg bot">❌ ${err.message}</div>`;
  }
}
