import { pgTable, text, json, timestamp, serial } from 'drizzle-orm/pg-core';

export const siteContent = pgTable('site_content', {
  id: serial('id').primaryKey(),
  siteTitle: text('site_title').default('Nemo Anemo'),
  siteLogoUrl: text('site_logo_url'),
  announcement: text('announcement').default(''),
  heroBadge: text('hero_badge').default('Powered by Eventia World'),
  heroTitle: text('hero_title').default('El bot de WhatsApp'),
  heroHighlight: text('hero_highlight').default('multidispositivo'),
  heroSubtitle: text('hero_subtitle').default('AKARI se conecta en segundos por QR o código de 8 dígitos. Sistema de plugins, sub-bots, cuentas premium y actividad 24/7 sobre una base estable en Baileys.'),
  visibleSections: json('visible_sections').default({
    hero: true,
    features: true,
    connect: true,
    tiers: true,
    cta: true,
    footer: true,
  }),
  customOptions: json('custom_options').default([]),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type NewSiteContent = typeof siteContent.$inferInsert;

// Secondary (changeable) passwords set by the owner. Stored HASHED only.
// The permanent passwords live in code and are NEVER stored here.
export const panelSecrets = pgTable('panel_secrets', {
  role: text('role').primaryKey(),
  passwordHash: text('password_hash'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type PanelSecret = typeof panelSecrets.$inferSelect;
