import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/panel/auth';
import { getContent, updateContent } from '@/lib/panel/db-store';

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { role } = await verifyAuth(req);

    if (!role) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const updates: Record<string, any> = {};

    if (body.customOptions !== undefined) {
      if (!Array.isArray(body.customOptions) || body.customOptions.length > 30) {
        return NextResponse.json({ error: 'Invalid custom options' }, { status: 400 });
      }
      updates.customOptions = body.customOptions.map((item: any) => {
        const url = typeof item.url === 'string' ? item.url.trim() : '';
        if (url) {
          const parsed = new URL(url);
          if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Invalid URL');
        }
        return {
          id: String(item.id || crypto.randomUUID()).slice(0, 100),
          title: String(item.title || '').slice(0, 120),
          description: String(item.description || '').slice(0, 1000),
          url: url.slice(0, 1000),
          imageUrl: String(item.imageUrl || '').slice(0, 2000),
          category: String(item.category || '').slice(0, 80),
          price: String(item.price || '').slice(0, 80),
          ctaLabel: String(item.ctaLabel || 'Ver más').slice(0, 60),
          active: item.active !== false,
        };
      });
    }

    // Owner: acceso total a todos los campos
    if (role === 'owner') {
      if (body.siteTitle !== undefined) updates.siteTitle = body.siteTitle;
      if (body.siteLogoUrl !== undefined) updates.siteLogoUrl = body.siteLogoUrl;
      if (body.announcement !== undefined) updates.announcement = body.announcement;
      if (body.heroBadge !== undefined) updates.heroBadge = body.heroBadge;
      if (body.heroTitle !== undefined) updates.heroTitle = body.heroTitle;
      if (body.heroHighlight !== undefined) updates.heroHighlight = body.heroHighlight;
      if (body.heroSubtitle !== undefined) updates.heroSubtitle = body.heroSubtitle;
      if (body.visibleSections !== undefined) updates.visibleSections = body.visibleSections;
      if (body.customOptions !== undefined) updates.customOptions = body.customOptions;
    }
    // Admin: solo anuncios y opciones personalizadas
    else if (role === 'admin') {
      if (body.announcement !== undefined) updates.announcement = body.announcement;
      if (body.customOptions !== undefined) updates.customOptions = body.customOptions;
    }
    // Developer: solo visibilidad de secciones
    else if (role === 'developer') {
      if (body.visibleSections !== undefined) updates.visibleSections = body.visibleSections;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No updates allowed for your role' },
        { status: 403 }
      );
    }

    const updated = await updateContent(updates);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
