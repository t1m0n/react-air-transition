const FRAMES = [
  { left: 'left-0', opacity: 'opacity-[0.22]' },
  { left: 'left-2', opacity: 'opacity-[0.52]' },
  { left: 'left-4', opacity: 'opacity-100' },
] as const;

export function Logo() {
  return (
    <div className='relative h-8 w-11 shrink-0' aria-hidden>
      {FRAMES.map((frame) => (
        <span
          key={frame.left}
          className={`absolute top-1/2 size-[18px] -translate-y-1/2 rounded-full bg-accent ${frame.left} ${frame.opacity}`}
        />
      ))}
    </div>
  );
}
