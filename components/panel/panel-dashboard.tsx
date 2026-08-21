'use client';

import { useState } from 'react';
import useSWR from 'swr';
import {
  Crown,
  Megaphone,
  LayoutTemplate,
  PlusCircle,
  KeyRound,
  Server,
  LogOut,
  Save,
  Image as ImageIcon,
  Zap,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Permission =
  | 'site_settings'
  | 'announcements'
  | 'sections'
  | 'cards'
  | 'passwords'
  | 'system';

type Role = 'owner' | 'admin' | 'developer';

type CustomOption = {
  id: string;
  title: string;
  description: string;
  url?: string;
  imageUrl?: string;
  category?: string;
  price?: string;
  ctaLabel?: string;
  active?: boolean;
};

type Content = {
  siteTitle: string;
  siteLogoUrl: string | null;
  announcement: string;
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  visibleSections: Record<string, boolean>;
  customOptions: CustomOption[];
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ROLE_LABEL: Record<string, string> = {
  owner: 'Owner',
  admin: 'Admin',
  developer: 'Developer',
};

export function PanelDashboard({
  role,
  permissions,
  onLogout,
}: {
  role: string;
  permissions: Permission[];
  onLogout: () => void;
}) {
  const { data: content, mutate } = useSWR<Content>('/api/panel/content', fetcher);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const can = (p: Permission) => permissions.includes(p);

  // Password management (owner only)
  const { data: pwData, mutate: mutatePw } = useSWR<{
    status: Record<Role, boolean>;
  }>(can('passwords') ? '/api/panel/passwords' : null, fetcher);
  const [pwInputs, setPwInputs] = useState<Record<Role, string>>({
    owner: '',
    admin: '',
    developer: '',
  });

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  async function saveSecondaryPassword(targetRole: Role) {
    setSaving(`pw-${targetRole}`);
    try {
      const res = await fetch('/api/panel/passwords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole, password: pwInputs[targetRole] }),
      });
      if (res.ok) {
        const data = await res.json();
        mutatePw({ status: data.status }, false);
        setPwInputs((prev) => ({ ...prev, [targetRole]: '' }));
        showToast(
          pwInputs[targetRole].trim()
            ? `Contraseña secundaria de ${targetRole} actualizada`
            : `Contraseña secundaria de ${targetRole} eliminada`
        );
      }
    } finally {
      setSaving(null);
    }
  }

  async function save(patch: Partial<Content>, label: string) {
    setSaving(label);
    try {
      const res = await fetch('/api/panel/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        const updated = await res.json();
        mutate(updated, false);
        setToast('Cambios guardados');
        setTimeout(() => setToast(null), 2200);
      }
    } finally {
      setSaving(null);
    }
  }

  function createOption(): CustomOption {
    return {
      id: crypto.randomUUID(),
      title: 'Nueva opción',
      description: 'Describe aquí tu servicio, canal, suscripción o sitio web.',
      url: '',
      imageUrl: '',
      category: 'Servicio',
      price: '',
      ctaLabel: 'Ver más',
      active: true,
    };
  }

  async function uploadOptionImage(file: File, optionId: string) {
    if (!content) return;
    setUploading(`option-${optionId}`);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'custom');
      const res = await fetch('/api/panel/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      const customOptions = content.customOptions.map((option) =>
        option.id === optionId ? { ...option, imageUrl: url } : option
      );
      await save({ customOptions }, 'option-image');
    } finally {
      setUploading(null);
    }
  }

  async function uploadFile(file: File, type: 'logo' | 'announcement' | 'custom') {
    setUploading(type);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const res = await fetch('/api/panel/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        if (type === 'logo') {
          await save({ siteLogoUrl: url }, 'logo');
        }
        setToast('Imagen subida correctamente');
        setTimeout(() => setToast(null), 2200);
      }
    } finally {
      setUploading(null);
    }
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Cargando panel...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="glow-brand flex size-11 items-center justify-center rounded-xl bg-brand-gradient">
            <Crown className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Panel AKARI</h1>
            <p className="text-sm text-muted-foreground">
              {ROLE_LABEL[role]} • {content.siteTitle}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="mr-2 size-4" />
          Salir
        </Button>
      </div>

      {/* toast */}
      {toast && (
        <div className="mb-6 rounded-lg bg-green-500/20 border border-green-500/50 p-3 text-sm text-green-300">
          ✓ {toast}
        </div>
      )}

      <div className="space-y-8">
        {/* Owner: Site Settings */}
        {can('site_settings') && (
          <section className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Configuración del Sitio</h2>
            </div>

            <div className="space-y-4">
              {/* Site Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Nombre del Sitio</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={content.siteTitle}
                    onChange={(e) =>
                      mutate(
                        { ...content, siteTitle: e.target.value },
                        false
                      )
                    }
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  />
                  <Button
                    onClick={() => save({ siteTitle: content.siteTitle }, 'Nombre')}
                    disabled={saving === 'Nombre'}
                    size="sm"
                  >
                    <Save className="mr-2 size-4" />
                    Guardar
                  </Button>
                </div>
              </div>

              {/* Site Logo */}
              <div>
                <label className="block text-sm font-medium mb-2">Logo del Sitio</label>
                <div className="flex gap-2">
                  {content.siteLogoUrl && (
                    <img
                      src={content.siteLogoUrl}
                      alt="Logo"
                      className="size-12 rounded-lg border border-border object-cover"
                    />
                  )}
                  <label className="flex-1 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file) uploadFile(file, 'logo');
                      }}
                      disabled={uploading === 'logo'}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-background/50 p-4 cursor-pointer hover:border-primary transition-colors">
                      <div className="text-center">
                        <ImageIcon className="mx-auto size-5 text-muted-foreground mb-2" />
                        <p className="text-xs text-muted-foreground">
                          {uploading === 'logo' ? 'Subiendo...' : 'Haz clic para subir'}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Hero Settings */}
              <div className="pt-4 border-t border-border">
                <h3 className="font-semibold text-sm mb-3">Configuración del Hero</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Badge
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.heroBadge}
                        onChange={(e) =>
                          mutate({ ...content, heroBadge: e.target.value }, false)
                        }
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs"
                      />
                      <Button
                        onClick={() => save({ heroBadge: content.heroBadge }, 'Badge')}
                        disabled={saving === 'Badge'}
                        size="sm"
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Título
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.heroTitle}
                        onChange={(e) =>
                          mutate({ ...content, heroTitle: e.target.value }, false)
                        }
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs"
                      />
                      <Button
                        onClick={() => save({ heroTitle: content.heroTitle }, 'Título')}
                        disabled={saving === 'Título'}
                        size="sm"
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Palabra destacada
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={content.heroHighlight}
                        onChange={(e) =>
                          mutate(
                            { ...content, heroHighlight: e.target.value },
                            false
                          )
                        }
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs"
                      />
                      <Button
                        onClick={() =>
                          save({ heroHighlight: content.heroHighlight }, 'Palabra')
                        }
                        disabled={saving === 'Palabra'}
                        size="sm"
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Subtítulo
                    </label>
                    <div className="flex gap-2">
                      <textarea
                        value={content.heroSubtitle}
                        onChange={(e) =>
                          mutate(
                            { ...content, heroSubtitle: e.target.value },
                            false
                          )
                        }
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs resize-none"
                        rows={3}
                      />
                      <Button
                        onClick={() =>
                          save(
                            { heroSubtitle: content.heroSubtitle },
                            'Subtítulo'
                          )
                        }
                        disabled={saving === 'Subtítulo'}
                        size="sm"
                        className="self-start"
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Admin: Announcements */}
        {can('announcements') && (
          <section className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Anuncios</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Texto del anuncio
                </label>
                <textarea
                  value={content.announcement}
                  onChange={(e) =>
                    mutate({ ...content, announcement: e.target.value }, false)
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none"
                  rows={3}
                  placeholder="Escribe un anuncio para mostrar al inicio..."
                />
              </div>
              <Button
                onClick={() => save({ announcement: content.announcement }, 'Anuncio')}
                disabled={saving === 'Anuncio'}
                className="w-full"
              >
                <Save className="mr-2 size-4" />
                Guardar anuncio
              </Button>
            </div>
          </section>
        )}

        {/* Developer: Visible Sections */}
        {can('sections') && (
          <section className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <LayoutTemplate className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Visibilidad de Secciones</h2>
            </div>

            <div className="space-y-3">
              {Object.entries(content.visibleSections).map(([section, visible]) => (
                <label key={section} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => {
                      const updated = {
                        ...content.visibleSections,
                        [section]: e.target.checked,
                      };
                      mutate(
                        { ...content, visibleSections: updated },
                        false
                      );
                    }}
                    className="size-4 rounded border border-border"
                  />
                  <span className="text-sm capitalize">{section}</span>
                </label>
              ))}
              <Button
                onClick={() =>
                  save(
                    { visibleSections: content.visibleSections },
                    'Secciones'
                  )
                }
                disabled={saving === 'Secciones'}
                className="w-full"
              >
                <Save className="mr-2 size-4" />
                Guardar cambios
              </Button>
            </div>
          </section>
        )}

        {/* Admin/Owner: Custom options */}
        {can('cards') && (
          <section className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <PlusCircle className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Opciones personalizadas</h2>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Crea tarjetas para ventas, suscripciones, canales de WhatsApp,
                  comunidades, servicios o cualquier sitio externo.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  mutate(
                    { ...content, customOptions: [...content.customOptions, createOption()] },
                    false
                  )
                }
              >
                <PlusCircle className="mr-2 size-4" /> Añadir
              </Button>
            </div>

            <div className="space-y-4">
              {content.customOptions.length === 0 && (
                <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                  Aún no hay opciones. Añade la primera tarjeta.
                </div>
              )}
              {content.customOptions.map((option, index) => (
                <div key={option.id} className="rounded-xl border border-border bg-background/50 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tarjeta {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={option.active !== false}
                          onChange={(e) =>
                            mutate(
                              {
                                ...content,
                                customOptions: content.customOptions.map((item) =>
                                  item.id === option.id ? { ...item, active: e.target.checked } : item
                                ),
                              },
                              false
                            )
                          }
                        /> Visible
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          mutate(
                            {
                              ...content,
                              customOptions: content.customOptions.filter((item) => item.id !== option.id),
                            },
                            false
                          )
                        }
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {([
                      ['title', 'Nombre o título', 'Ej. Suscripción Premium'],
                      ['category', 'Categoría', 'Ej. Canal de WhatsApp'],
                      ['price', 'Precio o etiqueta', 'Ej. Desde $5 / Gratis'],
                      ['ctaLabel', 'Texto del botón', 'Ej. Comprar ahora'],
                      ['url', 'URL de destino', 'https://...'],
                    ] as const).map(([field, label, placeholder]) => (
                      <label key={field} className={field === 'url' ? 'sm:col-span-2' : ''}>
                        <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
                        <input
                          value={option[field] ?? ''}
                          placeholder={placeholder}
                          onChange={(e) =>
                            mutate(
                              {
                                ...content,
                                customOptions: content.customOptions.map((item) =>
                                  item.id === option.id ? { ...item, [field]: e.target.value } : item
                                ),
                              },
                              false
                            )
                          }
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                      </label>
                    ))}
                    <label className="sm:col-span-2">
                      <span className="mb-1 block text-xs font-medium text-muted-foreground">Descripción</span>
                      <textarea
                        value={option.description}
                        rows={3}
                        placeholder="Explica qué ofrece esta opción"
                        onChange={(e) =>
                          mutate(
                            {
                              ...content,
                              customOptions: content.customOptions.map((item) =>
                                item.id === option.id ? { ...item, description: e.target.value } : item
                              ),
                            },
                            false
                          )
                        }
                        className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </label>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border px-3 py-3">
                    <div className="flex items-center gap-3">
                      {option.imageUrl ? (
                        <img src={option.imageUrl} alt="Vista previa" className="size-12 rounded-lg object-cover" />
                      ) : (
                        <div className="flex size-12 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                          <ImageIcon className="size-5" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">Imagen de la tarjeta</p>
                        <p className="text-xs text-muted-foreground">Se guarda en Vercel Blob</p>
                      </div>
                    </div>
                    <label className="cursor-pointer rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-secondary">
                      {uploading === `option-${option.id}` ? 'Subiendo...' : 'Subir imagen'}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void uploadOptionImage(file, option.id);
                        }}
                      />
                    </label>
                  </div>

                  <Button
                    className="mt-4 w-full"
                    onClick={() => save({ customOptions: content.customOptions }, `option-${option.id}`)}
                    disabled={saving === `option-${option.id}`}
                  >
                    <Save className="mr-2 size-4" /> Guardar esta tarjeta
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Owner: Password management */}
        {can('passwords') && (
          <section className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-1">
              <KeyRound className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Contraseñas de acceso</h2>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Cada rol tiene una contraseña permanente (fija, no se puede cambiar)
              y una contraseña secundaria que puedes definir aquí. Ambas sirven
              para iniciar sesión. Deja el campo vacío y guarda para eliminar la
              secundaria.
            </p>

            <div className="space-y-4">
              {(['owner', 'admin', 'developer'] as Role[]).map((r) => (
                <div
                  key={r}
                  className="rounded-lg border border-border bg-background/50 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Lock className="size-3.5 text-muted-foreground" />
                      <span className="text-sm font-semibold">
                        {ROLE_LABEL[r]}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        pwData?.status?.[r]
                          ? 'bg-green-500/15 text-green-400'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {pwData?.status?.[r]
                        ? 'Secundaria activa'
                        : 'Sin secundaria'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={pwInputs[r]}
                      onChange={(e) =>
                        setPwInputs((prev) => ({ ...prev, [r]: e.target.value }))
                      }
                      placeholder="Nueva contraseña secundaria"
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <Button
                      onClick={() => saveSecondaryPassword(r)}
                      disabled={saving === `pw-${r}`}
                      size="sm"
                    >
                      <Save className="mr-2 size-4" />
                      Guardar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Owner/Developer: System */}
        {can('system') && (
          <section className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Server className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Sistema</h2>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>Base de datos: Neon (PostgreSQL)</p>
              <p>Almacenamiento: Vercel Blob</p>
              <p>Sesión: HMAC-SHA256 (httpOnly)</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
