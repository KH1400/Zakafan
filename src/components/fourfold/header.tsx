import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

type HeaderProps = {
  onLanguageChangeClick: () => void;
};

export function Header({ onLanguageChangeClick }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between px-6 md:px-8 bg-background border-b border-border/50 shrink-0">
      <Link href="/" className="flex items-center gap-3">
        <svg
          viewBox="0 0 250 60"
          className="h-10 w-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="0"
            y="30"
            fontSize="32"
            fontWeight="bold"
            fill="hsl(var(--primary))"
            className="font-headline"
          >
            Zakafan
          </text>
          <text
            x="0"
            y="50"
            fontSize="14"
            fontWeight="bold"
            fill="hsl(var(--foreground))"
            opacity="0.8"
            className="font-persian"
          >
            مرجع داینوگرافی
          </text>
          <g transform="translate(190, 0)">
            <rect width="60" height="60" rx="12" fill="hsl(var(--accent))" />
            <g
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <path d="M42,21 C42,26.5228475 37.5228475,31 32,31 L28,31 C22.4771525,31 18,26.5228475 18,21 C18,15.4771525 22.4771525,11 28,11 C33.5228475,11 37.8,15.4771525 37.8,21" />
              <path d="M28,31 L28,38 C28,39.1045695 27.1045695,40 26,40 L22,40" />
              <path d="M32,17 L38,17" />
              <circle cx="40" cy="17" r="2.5" />
              <path d="M35,24 L42,24" />
              <circle cx="44" cy="24" r="2.5" />
              <path d="M32,31 L36,31" />
              <circle cx="38" cy="31" r="2.5" />
              <path d="M28,11 L28,15" />
              <circle cx="28" cy="17" r="2.5" />
            </g>
          </g>
        </svg>
      </Link>
      <Button variant="ghost" size="icon" onClick={onLanguageChangeClick} aria-label="Change Language">
        <Globe className="h-5 w-5" />
      </Button>
    </header>
  );
}
