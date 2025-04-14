const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: Gifted_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

const Techboy_Tech = Gifted_Tech;

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
};

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function MR_TECH_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Gifted_Tech = Techboy_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys),
                },
                printQRInTerminal: false,
                browser: Browsers.macOS("Mr Tech")
            });

            Pair_Code_By_Gifted_Tech.ev.on('creds.update', saveCreds);
            Pair_Code_By_Gifted_Tech.ev.on('connection.update', async (s) => {
                const { connection } = s;
                if (connection === "open") {
                    await delay(500);
                    const text = fs.readFileSync(`./temp/${id}/creds.json`);
                    const session = Buffer.from(text).toString('base64');
                    const paste = await pastebin.createPaste(session, "session", "javascript", 1, "1H");
                    removeFile(`./temp/${id}`);
                    return res.send({ status: true, link: paste, number: num });
                }
            });
        } catch (e) {
            return res.send({ status: false, message: e.message });
        }
    }

    MR_TECH_PAIR_CODE();
});

module.exports = router;
               
