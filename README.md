<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=900&size=28&pause=1000&center=true&vCenter=true&multiline=true&width=700&height=80&lines=⚡+WhatsApp+Baileys+%7C+Next-Gen+Automation+Library" alt="Typing SVG" />
</h1>

<p align="center">
  <img src="https://files.catbox.moe/n6qvqj.jpeg" width="500" alt="Banner" />
</p>

<p align="center">
  <strong>🚀 Ultra-light, TypeScript-ready, WebSocket-powered WhatsApp Library</strong><br/>
  <em>No Puppeteer. No Headless Browser. Just pure, blazing WebSocket magic.</em>
</p>

<p align="center">
  <a href="https://github.com/whiskeysockets/baileys">
    <img src="https://img.shields.io/github/stars/MikaYelovich/baileys-wa?color=purple&style=for-the-badge" alt="GitHub Stars"/>
  </a>
  <a href="https://www.npmjs.com/package/@whiskeysockets/baileys">
    <img src="https://img.shields.io/npm/v/MikaYelovich/baileys-wa?color=crimson&style=for-the-badge" alt="NPM Version"/>
  </a>
  <a href="https://github.com/whiskeysockets/baileys/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/MikaYelovich/baileys-wa?style=for-the-badge&color=green" alt="License"/>
  </a>
</p>

<pre align="center"><code><b>👑 Build Next-Level Bots • Automate at Scale • Integrate Like a Pro</b></code></pre>

---

## ✨ Why WhatsApp Baileys?

**Baileys** is a battle-tested, elegant, and fully modular WhatsApp automation library.  
Forget bloated headless browser setups — this is the modern, scalable, and efficient way to interact with WhatsApp.

✅ TypeScript Supported  
✅ Session Management  
✅ Multi-Device Ready  
✅ Interactive Message Support  
✅ Custom Pairing Flows  
✅ Fast & Modular Architecture

---

## 🧠 Core Features

| Feature                 | Description                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| 🔌 **Direct WebSocket** | No browser dependency. Pure WebSocket protocol connection.           |
| 🔐 **Secure Pairing**   | Use your own pairing flow or auto-generate. No random session drops. |
| 🧠 **Interactive UI**   | Send buttons, lists, and quick replies with ease.                    |
| 📂 **Smart Sessions**   | Efficient session recovery — even across devices.                    |
| 🧩 **Easy Integration** | Plug-and-play with Express, Fastify, or your own stack.              |
| ⚡ **Lightweight Core** | Minimal, high-speed, and zero browser footprint.                     |

---

## 📦 Installation

```bash
npm install @MikaYelovich/baileys-wa

```

## 🚀 Quick Example

```ts
import makeWASocket from "@MikaYelovich/baileys-wa";

const sock = makeWASocket({
  printQRInTerminal: true,
});

sock.ev.on("messages.upsert", async ({ messages }) => {
  const msg = messages[0];
  if (!msg.key.fromMe) {
    await sock.sendMessage(msg.key.remoteJid!, {
      text: "Hello from Baileys ⚡",
    });
  }
});
```

## 💥 Don't Sell This Source Code!

<p align="center"> <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=3000&pause=1000&color=FF4C4C&center=true&vCenter=true&width=600&lines=🚫+Selling+open-source+code+is+not+cool.;⚠️+Be+ethical+or+get+named+and+shamed." alt="Warning Typing SVG" /></p>

## 👤 Credits & Dev

Created and maintained by the open-source community.
README customized by Mika Yelovich.

<p align="center"> <img src="https://github-readme-stats.vercel.app/api?username=mikayelovich&show_icons=true&theme=tokyonight" width="450" alt="GitHub Stats" /> </p>
<p align="center"> <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=900&size=20&pause=1000&color=00FFE0&center=true&vCenter=true&width=500&lines=Build.+Automate.+Scale.+Conquer+WhatsApp." /> </p>
