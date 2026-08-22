import { Megaphone } from 'lucide-react';

export function AnnouncementBar({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <div className="flex items-center justify-center gap-2 bg-secondary/30 px-5 py-3 text-center text-sm font-medium text-foreground">
      <Megaphone className="size-4 shrink-0" />
      <span className="text-pretty">{text}</span>
    </div>
  );
}
