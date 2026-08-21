import "server-only"
import fs from "fs"
import path from "path"

export type Announcement = {
  id: string
  text: string
  tone: "info" | "success" | "warning"
  active: boolean
}

export type CustomCard = {
  id: string
  title: string
  description: string
}

export type SiteContent = {
  hero: {
    badge: string
    title: string
    highlight: string
    subtitle: string
  }
  announcements: Announcement[]
  sections: {
    features: boolean
    connect: boolean
    tiers: boolean
    cta: boolean
  }
  cards: CustomCard[]
}

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "Powered by Eventia World",
    title: "El bot de WhatsApp",
    highlight: "multidispositivo",
    subtitle:
      "AKARI se conecta en segundos por QR o código de 8 dígitos. Sistema de plugins, sub-bots, cuentas premium y actividad 24/7 sobre una base estable en Baileys.",
  },
  announcements: [],
  sections: {
    features: true,
    connect: true,
    tiers: true,
    cta: true,
  },
  cards: [],
}

const DATA_DIR = path.join(process.cwd(), "data")
const FILE = path.join(DATA_DIR, "site-content.json")

export function getContent(): SiteContent {
  try {
    if (!fs.existsSync(FILE)) return DEFAULT_CONTENT
    const raw = fs.readFileSync(FILE, "utf8")
    const parsed = JSON.parse(raw) as Partial<SiteContent>
    // Merge with defaults so missing keys never break the site.
    return {
      hero: { ...DEFAULT_CONTENT.hero, ...parsed.hero },
      announcements: parsed.announcements ?? DEFAULT_CONTENT.announcements,
      sections: { ...DEFAULT_CONTENT.sections, ...parsed.sections },
      cards: parsed.cards ?? DEFAULT_CONTENT.cards,
    }
  } catch {
    return DEFAULT_CONTENT
  }
}

export function saveContent(content: SiteContent): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(FILE, JSON.stringify(content, null, 2), "utf8")
}
