import 'server-only';
import { db } from '@/lib/db';
import { siteContent } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const CONTENT_ID = 1;

export async function getContent() {
  try {
    const [content] = await db
      .select()
      .from(siteContent)
      .where(eq(siteContent.id, CONTENT_ID))
      .limit(1);

    if (!content) {
      return createDefaultContent();
    }
    return content;
  } catch (error) {
    console.error('Error fetching content from DB:', error);
    return createDefaultContent();
  }
}

export async function updateContent(updates: Record<string, any>) {
  try {
    const [updated] = await db
      .update(siteContent)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(siteContent.id, CONTENT_ID))
      .returning();

    return updated;
  } catch (error) {
    console.error('Error updating content in DB:', error);
    throw error;
  }
}

async function createDefaultContent() {
  try {
    const [created] = await db
      .insert(siteContent)
      .values({
        id: CONTENT_ID,
        siteTitle: 'Nemo Anemo',
        announcement: '',
        heroBadge: 'Powered by Eventia World',
        heroTitle: 'El bot de WhatsApp',
        heroHighlight: 'multidispositivo',
        heroSubtitle:
          'AKARI se conecta en segundos por QR o código de 8 dígitos. Sistema de plugins, sub-bots, cuentas premium y actividad 24/7 sobre una base estable en Baileys.',
        visibleSections: {
          hero: true,
          features: true,
          connect: true,
          tiers: true,
          cta: true,
          footer: true,
        },
        customOptions: [],
      })
      .onConflictDoNothing()
      .returning();

    return (
      created || {
        id: CONTENT_ID,
        siteTitle: 'Nemo Anemo',
        siteLogoUrl: null,
        announcement: '',
        heroBadge: 'Powered by Eventia World',
        heroTitle: 'El bot de WhatsApp',
        heroHighlight: 'multidispositivo',
        heroSubtitle:
          'AKARI se conecta en segundos por QR o código de 8 dígitos. Sistema de plugins, sub-bots, cuentas premium y actividad 24/7 sobre una base estable en Baileys.',
        visibleSections: {
          hero: true,
          features: true,
          connect: true,
          tiers: true,
          cta: true,
          footer: true,
        },
        customOptions: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      }
    );
  } catch (error) {
    console.error('Error creating default content:', error);
    return {
      id: CONTENT_ID,
      siteTitle: 'Nemo Anemo',
      siteLogoUrl: null,
      announcement: '',
      heroBadge: 'Powered by Eventia World',
      heroTitle: 'El bot de WhatsApp',
      heroHighlight: 'multidispositivo',
      heroSubtitle:
        'AKARI se conecta en segundos por QR o código de 8 dígitos. Sistema de plugins, sub-bots, cuentas premium y actividad 24/7 sobre una base estable en Baileys.',
      visibleSections: {
        hero: true,
        features: true,
        connect: true,
        tiers: true,
        cta: true,
        footer: true,
      },
      customOptions: [],
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  }
}
