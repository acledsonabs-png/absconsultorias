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
  userEmail.textContent = user?.email || "";
}

function showLogin() {
  telaLogin.style.display = "flex";
  telaDash.style.display = "none";
}

async function checkSession() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    showDashboard(data.session.user);
  } else {
    showLogin();
  }
}

checkSession();

supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    showDashboard(session.user);
  } else {
    showLogin();
  }
});

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = senhaInput.value;

  if (!email || !password) {
    alert("Informe e-mail e senha.");
    return;
  }

  loginBtn.disabled = true;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    showDashboard(data.session.user);
  } catch (err) {
    alert(err.message);
  } finally {
    loginBtn.disabled = false;
  }
});

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
});

async function sendMessage() {
  const message = chatInput.value.trim();

  if (!message) return;

  chatMsgs.innerHTML += `<div class="msg user">${message}</div>`;

  chatInput.value = "";
  chatBtn.disabled = true;

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

    if (!response.ok) {
      throw new Error("Erro ao consultar a IA.");
    }

    const data = await response.json();

    chatMsgs.innerHTML += `<div class="msg bot">${data.content || "Sem resposta."}</div>`;
    chatMsgs.scrollTop = chatMsgs.scrollHeight;

  } catch (err) {
    chatMsgs.innerHTML += `<div class="msg bot">Erro: ${err.message}</div>`;
  } finally {
    chatBtn.disabled = false;
    chatInput.focus();
  }
}

chatBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
