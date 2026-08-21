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

  return (
    <>
      {content.announcement && <AnnouncementBar text={content.announcement} />}
      <SiteHeader />
      <main>
        <Hero
          badge={content.heroBadge}
          title={content.heroTitle}
          highlight={content.heroHighlight}
          subtitle={content.heroSubtitle}
        />
        {content.visibleSections.features && <Features />}
        {content.visibleSections.connect && <Connect />}
        <CustomOptions cards={content.customOptions} />
        {content.visibleSections.tiers && <Tiers />}
        {content.visibleSections.cta && <Cta />}
      </main>
      <SiteFooter siteTitle={content.siteTitle} siteLogoUrl={content.siteLogoUrl} />
    </>
  );
}
