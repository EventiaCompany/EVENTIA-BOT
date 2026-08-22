import Link from 'next/link';
import { Bot } from 'lucide-react';

type SiteFooterProps = {
  siteTitle?: string;
  siteLogoUrl?: string | null;
};

export function SiteFooter({ siteTitle = 'Nemo Anemo', siteLogoUrl }: SiteFooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row">
        <div className="flex items-center gap-2.5">
          {siteLogoUrl ? (
            <img
              src={siteLogoUrl}
              alt="Logo"
              className="size-8 rounded-lg object-cover"
            />
          ) : (
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-gradient">
              <Bot className="size-4 text-primary-foreground" />
            </span>
          )}
          <span className="font-display font-bold tracking-tight">{siteTitle}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {`© ${new Date().getFullYear()} ${siteTitle} · Powered by Eventia World`}
        </p>
      </div>

      {/* Acceso interno oculto */}
      <div className="flex justify-center pb-4">
        <Link
          href="/panel"
          aria-label="Acceso interno"
          className="select-none text-[10px] tracking-widest text-muted-foreground/15 transition-colors hover:text-muted-foreground/40"
        >
          {'⪻💫⪼⪨Acceso Interno⪩⪻🌑⪼'}
        </Link>
      </div>
    </footer>
  );
}
