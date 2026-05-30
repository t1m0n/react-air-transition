import { GitHubStarsWidget } from './GitHubStarsWidget';
import { Logo } from './Logo';

export function Header() {
  return (
    <header className='flex h-16 items-center justify-between border-b border-border px-6 sm:px-10'>
      <div className='flex items-center gap-3'>
        <Logo />
        <span className='text-base font-semibold text-ink'>react-air-transition</span>
      </div>
      <GitHubStarsWidget />
    </header>
  );
}
