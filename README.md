# ⚡ WhatsApp Baileys | Next-Gen WhatsApp Automation Library

<p align="center">
  <img src="https://files.catbox.moe/96tgfd.jpeg" width="600" alt="Banner WhatsApp Baileys"/>
</p>

## 🔥 Revolutionize Your WhatsApp Bots — The Modern Way

Welcome to the future of WhatsApp automation — **no browsers, no headless hacks, just pure WebSocket speed**.  
**`mika-automate`** is the next-generation TypeScript-powered automation library built on the battle-tested Baileys core.  
Say goodbye to bloated setups. Say hello to clean, elegant, and **scalable WhatsApp automation**.

---

## ✨ Key Advantages

✔️ **Pure WebSocket-Based**: Connect directly to WhatsApp with blazing fast performance — zero Puppeteer, zero Chromium.  
✔️ **Ultra Lightweight**: Minimal dependencies, rapid deployment, ideal for cloud/serverless environments.  
✔️ **Full TypeScript Support**: Autocomplete, typings, and robust error handling baked in.  
✔️ **Multi-Device Compatible**: Designed for modern WhatsApp Multi-Device infrastructure.  
✔️ **Modular Architecture**: Flexible for all kinds of automation — from chatbots to CRM integrations.  
✔️ **Open-Source Freedom**: MIT-licensed. Fork it, customize it, scale it.

---

## 🚀 Core Features Overview

| 💡 Feature               | 📝 Description                                                       |
| ------------------------ | -------------------------------------------------------------------- |
| 🔌 **WebSocket Native**  | Built directly on WhatsApp’s socket protocol.                        |
| 🔐 **Secure Pairing**    | Seamless pairing flows, including custom QR-based authentication.    |
| 🧠 **Rich Message UI**   | Send interactive elements: buttons, lists, quick replies & more.     |
| 📂 **Session Recovery**  | Smart session handling across restarts, devices, and environments.   |
| 🔧 **Easy Integration**  | Plug into frameworks like Express, Fastify, or your custom backend.  |
| ⚡ **Minimal Footprint** | Runs even on low-resource servers — perfect for scale and stability. |

---

## 📦 Installation

Getting started is just one command away:

```bash
npm install mika-automate@latest
```

---

## 💻 Example: Your First WhatsApp Echo Bot

Here’s how simple it is to set up a listener and send replies:

```ts
import makeWASocket, {
  proto,
  DisconnectReason,
  makeInMemoryStore,
  useSingleFileAuthState,
} from "mika-automate";
import { Boom } from "@hapi/boom";
import pino from "pino";
import * as fs from "fs";

// Toggle silent mode via environment: SILENT=true
const isSilent = process.env.SILENT === "true";

const logger = pino({
  level: isSilent ? "silent" : "info",
  transport: isSilent
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: true,
        },
      },
});

const SESSION_FILE = "./auth_info.json";
const { state, saveState } = useSingleFileAuthState(SESSION_FILE);

const store = makeInMemoryStore({ logger });
store.readFromFile("./store.json");
setInterval(() => {
  store.writeToFile("./store.json");
}, 10_000);

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger,
    version: [2, 2323, 4],
    syncFullHistory: false,
  });

  store.bind(sock.ev);

  sock.ev.process(async (ev) => {
    if (ev["connection.update"]) {
      const { connection, lastDisconnect } = ev["connection.update"];

      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut;

        logger.warn({ shouldReconnect }, "Connection closed.");
        if (shouldReconnect) startBot();
      } else if (connection === "open") {
        logger.info("✅ WhatsApp connection established.");
      }
    }

    if (ev["messages.upsert"]) {
      const upsert = ev["messages.upsert"];
      if (upsert.type !== "notify") return;

      for (const msg of upsert.messages) {
        try {
          await handleIncomingMessage(sock, msg);
        } catch (err) {
          logger.error({ err }, "❌ Failed to handle message");
        }
      }
    }
  });

  sock.ev.on("creds.update", saveState);
}

async function handleIncomingMessage(
  sock,
  msg
) /** @type {proto.IWebMessageInfo} */
{
  const sender = msg.key.remoteJid;
  const isFromMe = msg.key.fromMe;
  const messageContent =
    msg.message?.conversation || msg.message?.extendedTextMessage?.text;

  if (!messageContent || isFromMe) return;

  logger.info({ sender, messageContent }, "📩 Incoming message");

  if (messageContent.toLowerCase().startsWith("hi")) {
    await sock.sendMessage(sender, { text: "👋 Hello! Mika is here." });
  } else {
    await sock.sendMessage(sender, { text: "🤖 Mika received your message." });
  }
}

startBot().catch((err) => {
  logger.fatal({ err }, "💥 Bot initialization failed");
});
```

---

## 🍃 New Features on update v1.0.1

Here’s a quick example of a basic implementation to get you started.

**function SendButtonMessage()**

> 🍀 **important**: This feature should not be confused with a button list. It utilizes basic interactive buttons without hierarchical grouping or list formatting.

```ts
/** other logic in here */

// Contoh membalas pesan (reply) dengan tombol
// 'm' adalah objek pesan masuk (WebMessageInfo)
const reply_buttons = [
  { id: "reply1", text: "Ya" },
  { id: "reply2", text: "Tidak" },
];
await sock.sendButtonMessage(
  m.key.remoteJid,
  "Anda yakin?",
  "Pilih satu",
  reply_buttons,
  { quoted: m }
);
```

**function getBuffer()**

```ts
async function main() {
  console.log("🚀 Menjalankan contoh implementasi getBuffer...\n");

  try {
    // --- Contoh 1: Mengambil Buffer dari URL ---
    console.log("1. Mengambil buffer dari URL...");
    const imageUrl = "https://placehold.co/600x400.png";
    const bufferFromUrl = await sock.getBuffer(imageUrl);
    console.log(
      `✅ Berhasil! Ukuran buffer dari URL: ${bufferFromUrl.length} bytes.\n`
    );

    // --- Contoh 2: Mengambil Buffer dari File Lokal ---
    console.log("2. Mengambil buffer dari file lokal...");
    const filePath = path.join(__dirname, "contoh_file.txt");
    const fileContent = "Ini adalah konten file untuk demonstrasi.";

    await fs.writeFile(filePath, fileContent);
    console.log(`(File sementara "${path.basename(filePath)}" dibuat)`);

    const bufferFromFile = await sock.getBuffer(filePath);
    console.log(
      `✅ Berhasil! Ukuran buffer dari file: ${bufferFromFile.length} bytes.`
    );
    console.log(`Isi buffer: "${bufferFromFile.toString()}"\n`);

    await fs.unlink(filePath);
    console.log(`(File sementara "${path.basename(filePath)}" dihapus)`);

    // --- Contoh 3: Menggunakan Buffer yang Sudah Ada ---
    console.log("3. Menggunakan buffer yang sudah ada...");
    const existingBuffer = Buffer.from("Halo dari Buffer!");
    const bufferFromBuffer = await sock.getBuffer(existingBuffer);
    console.log(
      `✅ Berhasil! Ukuran buffer: ${bufferFromBuffer.length} bytes.`
    );
    console.log(`   Isi buffer: "${bufferFromBuffer.toString()}"\n`);
  } catch (error) {
    console.error("❌ Terjadi kesalahan dalam proses:", error.message);
  } finally {
    console.log("🏁 Selesai.");
  }
}

// Jalankan fungsi utama
main();
```

**function sleep()**

> 🧀 **Why is a sleep() function included, even though it's simple to implement?**
> Because not everyone is familiar with how to create a reliable delay mechanism — especially developers new to asynchronous JavaScript.

```ts
// Fungsi utama untuk demonstrasi
async function main() {
  console.log("Mulai proses...");
  console.log("Langkah 1: Melakukan tugas pertama.");
  console.log("Sekarang, kita akan jeda selama 3 detik...");
  // note; wajib menggunakan async/await agar work
  await sock.sleep(3000); // Menjeda eksekusi selama 3000 milidetik (3 detik)

  console.log("Langkah 2: Jeda selesai, melanjutkan tugas kedua.");
  console.log("Proses selesai. ✅");
}

// Jalankan fungsi utama
main();
```

**function fetchJSON()**

> 🥟 **Why include fetchJSON when fetch already exists?**
> Because fetchJSON simplifies JSON data handling and abstracts away repetitive logic. It also includes built-in retry capabilities, making it more resilient for unstable network environments.

```ts
async function getPublicData() {
  try {
    const data = await sock.fetchJSON(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log("Post:", data);
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

// Example 2: Request with custom headers and retry config
async function getUserWithAuth() {
  try {
    const user = await sock.fetchJSON(
      "https://jsonplaceholder.typicode.com/users/1",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer fake_token_123",
        },
      },
      {
        timeout: 3000,
        retries: 2,
        retryDelay: 1000,
        expectedContentType: "application/json",
      }
    );
    console.log("User:", user);
  } catch (err) {
    console.error("Auth fetch failed:", err.message);
  }
}

getPublicData();
getUserWithAuth();
```

**function sendSingleSelectButton()**

> 🥬 **Disclaimer**
> This release is currently in beta. While we’ve tested core functionality, bugs may still occur. Please don’t hesitate to open an issue or submit a report if you find any problems.

```ts
const prefix = "/"; // example command prefix

await sock.sendSingleSelectButton(m.chat, {
  text: "👋 Hai! Pilih layanan yang kamu butuhkan di bawah ini:",
  footer: "MikaBot • 2025",
  buttonText: "📋 Buka Menu",
  title: "✨ Menu Utama",
  thumbnail: "https://example.com/banner.jpg",
  sections: [
    {
      title: "🔹 Layanan",
      rows: [
        {
          header: "🎁 Semua Fitur",
          title: "Lihat semua fitur keren yang tersedia! 🌟",
          id: `${prefix}menu`,
        },
        {
          header: "🛡️ Daftar Premium",
          title: "Gabung untuk akses eksklusif 🎟️",
          id: `${prefix}daftar`,
        },
        {
          header: "📞 Hubungi Owner",
          title: "Butuh bantuan? Klik untuk kontak 💬",
          id: `${prefix}owner`,
        },
      ],
    },
  ],
});
```

---

## ❗ Ethics Reminder

> ⚠️ **This is an open-source project. Selling this code is strictly discouraged.**  
> Be a part of the open web — build, don’t exploit.

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=3000&pause=1000&color=FF4C4C&center=true&vCenter=true&width=600&lines=🚫+Selling+open-source+code+is+not+cool.;⚠️+Be+ethical+or+get+named+and+shamed." />
</p>

---

## 👨‍💻 Developer & Community

Created by passionate developers, led by [Mika Yelovich](https://github.com/MikaYelovich).  
Actively maintained and open for contributions!

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=mikayelovich&show_icons=true&theme=tokyonight" width="450" alt="GitHub Stats" />
</p>

---

## 🧠 Final Thoughts

Whether you're building a chatbot, a smart reply engine, or a full-blown automation suite —  
**`mika-automate`** gives you the tools to do it faster, cleaner, and with total control.

> 💬 Build smarter. Automate deeper. Scale wider.

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=900&size=20&pause=1000&color=00FFE0&center=true&vCenter=true&width=500&lines=Build.+Automate.+Scale.+Conquer+WhatsApp." />
</p>
