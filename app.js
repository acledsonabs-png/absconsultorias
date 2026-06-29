import { supabase } from "./supabase.js";

const loginBtn = document.getElementById("btn-login");
const logoutBtn = document.getElementById("btn-logout");

const telaLogin = document.getElementById("tela-login");
const telaDash = document.getElementById("tela-dashboard");

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

const chatInput = document.getElementById("chat-pergunta");
const chatBtn = document.getElementById("btn-enviar");
const chatMsgs = document.getElementById("chat-msgs");

const userEmail = document.getElementById("user-email");

function showDashboard(user) {
  telaLogin.style.display = "none";
  telaDash.style.display = "block";
  userEmail.textContent = user.email;
}

function showLogin() {
  telaLogin.style.display = "flex";
  telaDash.style.display = "none";
}

async function checkSession() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    showDashboard(data.session.user);
  }
}

checkSession();

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = senhaInput.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  showDashboard(data.user);
});

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  showLogin();
});

async function sendMessage() {
  const message = chatInput.value;
  if (!message) return;

  chatMsgs.innerHTML += <div class="msg user">${message}</div>;
  chatInput.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await res.json();

  const text = data.content || "Sem resposta";

  chatMsgs.innerHTML += <div class="msg bot">${text}</div>;
}

chatBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
