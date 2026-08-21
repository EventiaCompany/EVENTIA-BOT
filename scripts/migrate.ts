import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

async function migrate() {
  try {
    const client = postgres(databaseUrl as string);
    const db = drizzle(client);

    console.log('Creating site_content table...');

    // Create table manually using raw SQL to ensure it exists
    await db.execute(sql`
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
    `);

    console.log('Inserting default content...');

    await db.execute(sql`
      INSERT INTO site_content (id, site_title, site_logo_url, announcement, hero_badge, hero_title, hero_highlight, hero_subtitle, panel_title, text_overrides, visible_sections, custom_options)
      VALUES (
        1,
        'Nemo Anemo',
        NULL,
        '',
        'Powered by Eventia World',
        'El bot de WhatsApp',
        'multidispositivo',
        'AKARI se conecta en segundos por QR o código de 8 dígitos. Sistema de plugins, sub-bots, cuentas premium y actividad 24/7 sobre una base estable en Baileys.',
        'Panel AKARI',
        '{}',
        '{"hero": true, "features": true, "connect": true, "tiers": true, "cta": true, "footer": true}',
        '[]'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log('Adding editable panel labels...');
    await db.execute(sql`ALTER TABLE site_content ADD COLUMN IF NOT EXISTS panel_title TEXT DEFAULT 'Panel AKARI'`);
    await db.execute(sql`ALTER TABLE site_content ADD COLUMN IF NOT EXISTS text_overrides JSONB DEFAULT '{}'`);

    console.log('Creating panel_secrets table...');

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS panel_secrets (
        role TEXT PRIMARY KEY,
        password_hash TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✓ Migration completed successfully');
    await client.end();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
