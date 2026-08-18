import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath } from 'url'
import fs from 'fs'
const chalk = { redBright: text => `\x1b[91m${text}\x1b[0m` }
import axios from './src/library/http.js'


global.botNumber = ''


global.owner = [

  ['5491136214717', 'AIKO', true],
]


global.mods = []
global.suittag = ['']
global.prems = []


global.libreria = 'Baileys'
global.baileys = 'V 6.7.16'
global.languaje = 'Español'
global.vs = '2.2.0'
global.nameqr = 'nemo anemobot'
global.namebot = '𝐍ємσ 𝐀ηємσ - вσт'
global.sessions = 'Sessions'

const envBool = (name, fallback) => {
  const value = process.env[name]
  if (typeof value === 'undefined') return fallback
  return !/^(?:0|false|no|off)$/i.test(String(value).trim())
}

global.baileysSocketConfig = {
  connectTimeoutMs: 20000,
  keepAliveIntervalMs: 30000,
  retryRequestDelayMs: 250,
  defaultQueryTimeoutMs: 60000,
  markOnlineOnConnect: true,
  syncFullHistory: true,
  fireInitQueries: true,
  emitOwnEvents: true,
  reconnectBaseDelayMs: 5000,
  reconnectMaxDelayMs: 120000,
  reconnectJitterMs: 5000
}

global.rubyPluginWatch = envBool('ANEMO_PLUGIN_WATCH', process.env.NODE_ENV !== 'production')

global.messageQueueMaxConcurrency = Number(process.env.MESSAGE_QUEUE_MAX_CONCURRENCY || 8)
global.messageQueueMaxUserQueue = Number(process.env.MESSAGE_QUEUE_MAX_USER_QUEUE || 100)
global.messageQueueMaxTotalQueue = Number(process.env.MESSAGE_QUEUE_MAX_TOTAL_QUEUE || 3000)
global.messageQueueUserRateWindowMs = Number(process.env.MESSAGE_QUEUE_USER_RATE_WINDOW_MS || 10000)
global.messageQueueUserRateMax = Number(process.env.MESSAGE_QUEUE_USER_RATE_MAX || 8)
global.messageQueueChatRateWindowMs = Number(process.env.MESSAGE_QUEUE_CHAT_RATE_WINDOW_MS || 10000)
global.messageQueueChatRateMax = Number(process.env.MESSAGE_QUEUE_CHAT_RATE_MAX || 40)
global.messageQueueTaskTimeoutMs = Number(process.env.MESSAGE_QUEUE_TASK_TIMEOUT_MS || 120000)
global.messageQueueEntryMaxAgeMs = Number(process.env.MESSAGE_QUEUE_ENTRY_MAX_AGE_MS || 60000)
global.rubyMetricsLogMs = Number(process.env.RUBY_METRICS_LOG_MS || 300000)
global.chatActivityMaxUsers = Number(process.env.CHAT_ACTIVITY_MAX_USERS || 500)
global.chatActivityTtlDays = Number(process.env.CHAT_ACTIVITY_TTL_DAYS || 30)
global.strictParticipantMetadata = envBool('RUBY_STRICT_PARTICIPANT_METADATA', false)
global.participantIndexTtlMs = Number(process.env.RUBY_PARTICIPANT_INDEX_TTL_MS || 30000)


global.packname = '⏤̛̣̣̣̣̣̣̣̣̣̣̣͟͟͞͞⏤͟͟͞͞𝐍ємσ 𝐀ηємσ - вσт૮(˶ᵔᵕᵔ˶)ა'
global.botname = ' ࣪☀ ࣭𝐍ємσ 𝐀ηємσ - вσт 𝟹𝟹 ✿'
global.wm = '‧˚꒰🍷꒱ ፝͜⁞𝐍ємσ 𝐀ηємσ - вσт-𝑴𝑫✰⃔⃝🦋'
global.author = 'Made By 「𝐄νєηтια 𝐂σмραηу」`
global.dev = '⌬ Modified by: Dev Aiko ⚙️💻 '
global.textbot = '⏤͟͞ू⃪ 𝐍ємσ 𝐀ηємσ - вσт🪄𖤐 • 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆 Aiko'
global.etiqueta = 'ˑ 𓈒 𐔌 AIKO ͡꒱ ۫'


global.catalogo = fs.readFileSync('./src/catalogo.jpg')


global.gp1 = 'https://whatsapp.com/channel/0029Vb8ZwzM8V0th0XjKfX3w'
global.comunidad1 = 'https://whatsapp.com/channel/0029Vb8ZwzM8V0th0XjKfX3w'
global.channel = 'https://whatsapp.com/channel/0029Vb8ZwzM8V0th0XjKfX3w'
global.channel2 = 'https://whatsapp.com/channel/0029Vb8ZwzM8V0th0XjKfX3w'
global.md = 'mo disponible'
global.correo = 'no disponible'
global.cn = 'https://whatsapp.com/channel/0029Vb8ZwzM8V0th0XjKfX3w'
global.ch = { ch1: '120363428758114365@newsletter
' }


global.estilo = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

global.getBuffer = global.getBuffer || async function getBuffer(url, options = {}) {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        DNT: 1,
        'User-Agent': 'GoogleBot',
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    })
    return res.data
  } catch (e) {
    console.log(`Error : ${e}`)
    return null
  }
}

global.fakeIconUrls = [
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://files.catbox.moe/ilkgfh.webp',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg', 'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg',
  'https://raw.githubusercontent.com/JTxs00/uploads/main/1787011542549.jpeg'
]


global.creador = 'Wa.me/5491136214717'
global.asistencia = 'Wa.me/5491136214717'
global.namechannel = '⏤͟͞ू⃪፝͜⁞⟡『 𝐍ємσ 𝐀ηємσ - вσт 𝐂𝐡𝐚𝐧𝐧𝐞𝐥』࿐⟡'
global.namechannel2 = '⟡『 𝐓𝐞𝐚𝐦 𝐂𝐡𝐚𝐧𝐧𝐞𝐥: 𝐍ємσ 𝐀ηємσ - вσт 』⟡'
global.namegrupo = '⏤͟͞ू⃪ 𝐍ємσ 𝐀ηємσ - вσт ⌬⃝𓆩⚘𓆪 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥'
global.namecomu = '⏤͟͞ू⃪ 𝐍ємσ 𝐀ηємσ - вσт ✦⃝𖤐 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚'
global.listo = '❀ *Aquí tienes ฅ^•ﻌ•^ฅ*'
global.fotoperfil = global.avatar || 'https://files.catbox.moe/xr2m6u.jpg'
global.canalIdM = ['120363428758114365@newsletter
', '120363426539192817@newsletter']
global.canalNombreM = [global.namechannel, global.namechannel2]

global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'
global.msm = '⚠︎'
global.emoji = '🍨'
global.emoji2 = '🍭'
global.emoji3 = '🌺'
global.emoji4 = '💗'
global.emoji5 = '🍡'
global.emojis = global.emoji
global.wait = '⚘𖠵⃕❖𖥔 𝑪𝒂𝒓𝒈𝒂𝒏𝒅𝒐...ꪶꪾ❍̵̤̂ꫂ\n❝ 𝐴𝑔𝑢𝑎𝑟𝑑𝑒 𝑢𝑛 𝑚𝑜𝑚𝑒𝑛𝑡𝑜 ❞'

global.redesList = [global.channel, global.channel2, '120363426539192817@newsletter', global.md, global.correo].filter(Boolean)
global.redes = global.redesList[0]
global.icono = global.catalogo
global.icons = global.catalogo
global.readMore = String.fromCharCode(8206).repeat(850)
global.packsticker = global.packsticker || global.botname
global.packsticker2 = '𝐍ємσ 𝐀ηємσ - вσт ˃ 𖥦 ˂'


global.getRandomChannel = function getRandomChannel() {
  const ids = global.canalIdM || []
  const names = global.canalNombreM || []
  const index = Math.floor(Math.random() * Math.max(ids.length, 1))
  return { id: ids[index] || global.channel, name: names[index] || global.namechannel }
}

global.createFakeContact = function createFakeContact(sender = '0@s.whatsapp.net') {
  const number = String(sender || '0@s.whatsapp.net').split('@')[0]
  return {
    key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
    message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${number}:${number}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } },
    participant: '0@s.whatsapp.net'
  }
}

global.getSaludo = function getSaludo(date = new Date()) {
  const hour = date.getHours()
  if ([0, 1, 2].includes(hour)) return 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'
  if ([3, 4, 5, 6, 8, 9].includes(hour)) return 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'
  if (hour === 7) return 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅'
  if ([10, 11, 12, 13].includes(hour)) return 'Lɪɴᴅᴏ Dɪᴀ 🌤'
  if ([14, 15, 16, 17].includes(hour)) return 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'
  return 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'
}

global.updateMessageGlobals = async function updateMessageGlobals(m = {}, conn = {}) {
  const sender = m.sender || m.key?.participant || m.key?.remoteJid || '0@s.whatsapp.net'
  const now = new Date(Date.now() + 3600000)
  global.fkontak = global.createFakeContact(sender)
  global.ofcbot = conn.user?.jid?.split('@')[0] || conn.user?.id?.split('@')[0] || global.botNumber || ''
  global.channelRD = global.getRandomChannel()
  global.d = now
  global.locale = 'es'
  global.dia = now.toLocaleDateString(global.locale, { weekday: 'long' })
  global.fecha = now.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
  global.mes = now.toLocaleDateString('es', { month: 'long' })
  global.año = now.toLocaleDateString('es', { year: 'numeric' })
  global.tiempo = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
  global.emojis = [global.emoji, global.emoji2, global.emoji3, global.emoji4][Math.floor(Math.random() * 4)]
  global.redes = global.redesList[Math.floor(Math.random() * global.redesList.length)] || global.md
  global.saludo = global.getSaludo(now)
  global.nombre = m.pushName || 'Anónimo'
  global.taguser = '@' + String(sender).split('@')[0]
}


const imagenes = [
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%F0%9F%A4%8D%20(1).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%F0%9F%8C%9FRuby%20Hoshino%F0%9F%8C%9F.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%F0%9D%97%8B%F0%9D%97%8E%F0%9D%6BB%F0%9D%97%92%20%F0%9D%97%81%F0%9D%97%88%F0%9D%97%8C%F0%9D%97%81%F0%9D%97%82%F0%9D%97%87%F0%9D%97%88.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%F0%9D%93%A1%F0%9D%93%BE%F0%9D%93%AB%F0%9D%14%82%20%F0%9D%93%98%F0%9D%93%AC%F0%9D%93%B8%F0%9D%93%B7%F0%9D%93%BC%20%E2%AD%90%F0%9F%92%AB.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%F0%9D%91%B9%F0%9D%92%96%F0%9D%92%83%F0%9D%92%9A%20%F0%9D%91%AF%F0%9D%92%90%F0%9D%92%94%F0%9D%92%89%F0%9D%92%8A%F0%9D%92%8F%F0%9D%92%90.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%E2%9D%A4.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%E2%98%86Hoshino%20Ruby%E2%98%86.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%E2%98%85%20!!%20(2).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%E2%98%85%20!!%20(1).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%CB%9A%20%E0%BC%98%E2%99%A1%20%E2%8B%86%EF%BD%A1%CB%9A%20Hoshino%20Ruby.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/ruby%20hoshino%20(9).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/ruby%20hoshino%20(11).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/_%20(15).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/_%20(14).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/_%20(13).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20hoshino%20%F0%9F%A7%A1.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20_%20oshi%20no%20ko%20_.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20Hoshino%20-%20%F0%9F%8C%9F%5BOshi%20no%20Ko%5D%F0%9F%8C%9F%20icons.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20Hoshino%20(10).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20Hoshino%20%23oshinokk.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Hoshino%20Ruby%20(3).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%23oshinoko%20%23%EC%B5%9C%EC%95%A0%EC%9D%98%EC%95%84%EC%9D%B4.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%F0%9D%99%8D%F0%9D%99%AA%F0%9D%99%97%F0%9D%99%AE%20%F0%9D%99%83%F0%9D%99%A4%F0%9D%99%A8%F0%9D%99%9D%F0%9D%99%A4%F0%9D%99%9E%F0%9D%99%A3%F0%9D%99%A4.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%F0%9F%8E%80%20%E2%8B%AE%20%F0%9D%91%B9%F0%9D%92%96%F0%9D%92%83%F0%9D%92%9A%20%F0%9D%92%8A%F0%9D%92%84%F0%9D%92%90%F0%9D%92%8F.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%E2%98%85%20!!%20(3).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%E2%9D%A4%EF%B8%8F%F0%9D%91%AF%F0%9D%92%90%F0%9D%92%94%F0%9D%92%89%F0%9D%92%8A%F0%9D%92%8F%F0%9D%92%90%20%F0%9D%91%B9%F0%9D%92%96%F0%9D%92%83%F0%9D%92%9A%E2%9D%A4%EF%B8%8F.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/%E0%AD%A8%E0%A7%8E.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/_%20(19).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/_%20(18).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/_%20(17).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/_%20(16).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20Hoshino%20(16).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20Hoshino%20(15).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20Hoshino%20(14).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20Hoshino%20(13).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Ruby%20Hoshino%20(12).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Hoshino%20Ruby%20%E2%99%A1.jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/Hoshino%20Ruby%20(4).jpeg",
  "https://raw.githubusercontent.com/Dioneibi-rip/imagenes/refs/heads/main/(%F0%9F%8E%80)%20%20%E2%80%A6%20%20%E2%97%9E%20ruby%20%E2%97%9F%20%E2%98%86.jpeg"
]

const fallbackImage = 'https://files.catbox.moe/xr2m6u.jpg'
const matchedUrl = 'https://whatsapp.com/channel/0029Vb8ZwzM8V0th0XjKfX3w'

global.rcanal = async (textoDelMensaje, m) => {
  const randomUrl = imagenes[Math.floor(Math.random() * imagenes.length)] || fallbackImage
  let rimg

  try {
    const response = await fetch(randomUrl)
    if (response.ok) {
      rimg = Buffer.from(await response.arrayBuffer())
    } else {
      throw new Error()
    }
  } catch (error) {
    try {
      const fallbackRes = await fetch(fallbackImage)
      rimg = Buffer.from(await fallbackRes.arrayBuffer())
    } catch {
      rimg = null
    }
  }

  return {
    extendedTextMessage: {
      text: `${matchedUrl}\n\n${textoDelMensaje}`,
      matchedText: matchedUrl,
      canonicalUrl: matchedUrl,
      title: '⏤͟͞ू⃪  ̸̷͢𝐍ємσ 𝐀ηємσ - вσт˚₊·—̳͟͞͞♡̥',
      description: '꒰ 🧺 ᑲіᥱᥒ᥎ᥱᥒіძ᥆ ᥲᥣ sᥙ́ρᥱr ᑲ᥆𝗍 ძᥱ ᥕһᥲ𝗍sᥲρρ ꒱',
      previewType: 'shadow',
      jpegThumbnail: rimg,
      contextInfo: {
        quotedMessage: m ? m.message : undefined,
        participant: m ? m.sender : undefined,
        stanzaId: m ? m.id : undefined,
        remoteJid: m ? m.chat : undefined,
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.channelRD?.id || '120363426539192817@newsletter',
          newsletterName: global.channelRD?.name || '⧼⏤͟͟͞͞💫𝐄ѵҽղ𝗍іᥲ - 𝐂һᥲᥒᥒᥱᥣ ⧽',
          serverMessageId: -1
        }
      }
    }
  }
}

global.fkontak = global.createFakeContact()
global.channelRD = global.getRandomChannel()
global.saludo = global.getSaludo()
global.nombre = 'Anónimo'
global.taguser = '@0'


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
