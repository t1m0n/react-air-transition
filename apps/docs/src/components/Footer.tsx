import { ANIMEJS_URL, REACT_TRANSITION_GROUP_URL } from '../data/content';
import { TextLink } from './ui';

export function Footer() {
  return (
    <footer className='flex h-14 items-center justify-between border-t border-border px-6 text-xs sm:px-10'>
      <span className='font-mono text-ink-muted'>MIT License · react-air-transition</span>
      <span className='text-ink-secondary'>
        Built with <TextLink href={REACT_TRANSITION_GROUP_URL}>react-transition-group</TextLink> +{' '}
        <TextLink href={ANIMEJS_URL}>anime.js</TextLink>
      </span>
    </footer>
  );
}
