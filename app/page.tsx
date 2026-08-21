import { SiteHeader } from '@/components/site-header';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Connect } from '@/components/connect';
import { Tiers } from '@/components/tiers';
import { Cta } from '@/components/cta';
import { SiteFooter } from '@/components/site-footer';
import { AnnouncementBar } from '@/components/announcement-bar';
import { CustomOptions } from '@/components/custom-options';
import { getContent } from '@/lib/panel/db-store';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const content = await getContent();
  const sections = (content.visibleSections ?? {}) as Record<string, boolean>;
  const customOptions = (content.customOptions ?? []) as Array<{
    id: string;
    title: string;
    description: string;
    url?: string;
    imageUrl?: string;
    category?: string;
    price?: string;
    ctaLabel?: string;
    active?: boolean;
  }>;

  return (
    <>
      {content.announcement && <AnnouncementBar text={content.announcement} />}
      <SiteHeader />
      <main>
        <Hero
          badge={content.heroBadge ?? undefined}
          title={content.heroTitle ?? undefined}
          highlight={content.heroHighlight ?? undefined}
          subtitle={content.heroSubtitle ?? undefined}
        />
        {sections.features && <Features />}
        {sections.connect && <Connect />}
        <CustomOptions cards={customOptions} />
        {sections.tiers && <Tiers />}
        {sections.cta && <Cta />}
      </main>
      <SiteFooter siteTitle={content.siteTitle ?? undefined} siteLogoUrl={content.siteLogoUrl} />
    </>
  );
}
