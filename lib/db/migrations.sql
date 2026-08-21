-- Migration: Create site_content table for AKARI panel
-- This table stores all editable content for the public website

CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  site_title TEXT DEFAULT 'Nemo Anemo',
  site_logo_url TEXT,
  announcement TEXT DEFAULT '',
  hero_badge TEXT DEFAULT 'Powered by Eventia World',
  hero_title TEXT DEFAULT 'El bot de WhatsApp',
  hero_highlight TEXT DEFAULT 'multidispositivo',
  hero_subtitle TEXT DEFAULT 'AKARI se conecta en segundos por QR o código de 8 dígitos. Sistema de plugins, sub-bots, cuentas premium y actividad 24/7 sobre una base estable en Baileys.',
  visible_sections JSONB DEFAULT '{"hero": true, "features": true, "connect": true, "tiers": true, "cta": true, "footer": true}',
  custom_options JSONB DEFAULT '[]',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default row if table is empty
INSERT INTO site_content (id, site_title, site_logo_url, announcement, hero_badge, hero_title, hero_highlight, hero_subtitle, visible_sections, custom_options)
VALUES (
  1,
  'Nemo Anemo',
  NULL,
  '',
  'Powered by Eventia World',
  'El bot de WhatsApp',
  'multidispositivo',
  'AKARI se conecta en segundos por QR o código de 8 dígitos. Sistema de plugins, sub-bots, cuentas premium y actividad 24/7 sobre una base estable en Baileys.',
  '{"hero": true, "features": true, "connect": true, "tiers": true, "cta": true, "footer": true}',
  '[]'
)
ON CONFLICT (id) DO NOTHING;
