import { useEffect, useState } from 'react';
import { REPO_URL } from '../data/content';

function formatStars(count: number) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }

  return count.toLocaleString('en-US');
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden
      viewBox='0 0 16 16'
      className='size-4 fill-current'
      xmlns='http://www.w3.org/2000/svg'>
      <title>GitHub</title>
      <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden
      viewBox='0 0 16 16'
      className='size-3.5 fill-current'
      xmlns='http://www.w3.org/2000/svg'>
      <title>Stars</title>
      <path d='M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327 1.68A.75.75 0 0 1 8 .25Z' />
    </svg>
  );
}

export function GitHubStarsWidget() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://api.github.com/repos/t1m0n/react-air-transition', {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { stargazers_count?: number }) => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        setStars(null);
      });

    return () => controller.abort();
  }, []);

  return (
    <a
      href={REPO_URL}
      target='_blank'
      rel='noreferrer'
      aria-label='Star react-air-transition on GitHub'
      className='inline-flex h-9 items-center overflow-hidden rounded-full border border-border text-sm text-ink-secondary transition-[color,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent-soft hover:text-accent-text'>
      <span className='flex items-center gap-1.5 border-r border-border px-3 py-2'>
        <GitHubIcon />
        <span className='font-medium'>GitHub</span>
      </span>
      <span className='flex items-center gap-1 px-3 py-2'>
        <StarIcon />
        <span className='min-w-[2ch] tabular-nums'>
          {stars === null ? '—' : formatStars(stars)}
        </span>
      </span>
    </a>
  );
}
