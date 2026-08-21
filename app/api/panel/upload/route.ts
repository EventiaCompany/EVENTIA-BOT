import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/panel/auth';
import { put } from '@vercel/blob';

export async function POST(req: NextRequest) {
  try {
    const { role, user } = await verifyAuth(req);

    if (!role) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'logo' | 'announcement' | 'custom'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const filename = `akari-${type}-${Date.now()}-${file.name}`;

    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: blob.pathname,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
