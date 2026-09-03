const API_URL = "http://localhost:5000/api/ai";

const promptInput = document.getElementById("prompt");
const sendBtn = document.getElementById("send");
const voiceBtn = document.getElementById("voice");
const log = document.getElementById("log");

function addLine(text, role = "user") {
  const div = document.createElement("div");
  div.textContent = (role === "user" ? "You: " : "Jarvis: ") + text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function sendPrompt(text) {
  if (!text.trim()) return;
  addLine(text, "user");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text })
  });

  const data = await res.json();
  addLine(data.reply, "jarvis");
  speak(data.reply);
}

sendBtn.onclick = () => sendPrompt(promptInput.value);

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "nl-NL";
  speechSynthesis.speak(utter);
}

voiceBtn.onclick = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice API niet beschikbaar in deze browser.");
    return;
  }
  const rec = new SpeechRecognition();
  rec.lang = "nl-NL";
  rec.onresult = e => {
    const text = e.results[0][0].transcript;
    promptInput.value = text;
    sendPrompt(text);
  };
  rec.start();
};
