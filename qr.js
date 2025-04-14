const express = require("express");
const app = express();
const pino = require("pino");
let { toBuffer } = require("qrcode");
const fs = require("fs-extra");
const { Boom } = require("@hapi/boom");

const PORT = process.env.PORT || 5000;
const MESSAGE = process.env.MESSAGE || `
┌───⭓『
❒ *MR-TECH*
❒ _NOW DEPLOY IT_
└────────────⭓
┌───⭓
❒  • Chat with owner •
❒ *GitHub:* __https://github.com/Wa-Bot-
❒ *Author:* _wa.me/254759006509_
❒ *YT:* _ *coming soon*
└────────────⭓
`;

app.use("/", async (req, res) => {
    const {
        default: WasiWASocket,
        useMultiFileAuthState,
        Browsers,
        delay,
        DisconnectReason,
        makeInMemoryStore,
    } = require("@whiskeysockets/baileys");

    const store = makeInMemoryStore({
        logger: pino().child({ level: "silent", stream: "store" }),
    });

    try {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/qrcode-session');

        const socket = WasiWASocket({
            auth: state,
            printQRInTerminal: true,
            browser: Browsers.macOS("Mr Tech"),
        });

        socket.ev.on("creds.update", saveCreds);

        res.send({ status: true, message: MESSAGE });
    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
});

module.exports = app;
