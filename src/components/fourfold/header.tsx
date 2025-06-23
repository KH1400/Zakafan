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
        {/* Placeholder for Logo */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 7L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 7L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22V12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
           <path
            d="M17 4.5L7 9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-xl font-bold font-headline">Fourfold Portal</span>
      </Link>
      <Button variant="ghost" size="icon" onClick={onLanguageChangeClick} aria-label="Change Language">
        <Globe className="h-5 w-5" />
      </Button>
    </header>
  );
}
