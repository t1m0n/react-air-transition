import { NAV_ITEMS } from '../data/content';
import { useScrollSpy } from '../hooks/useScrollSpy';

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Sidebar() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <aside className='hidden w-56 shrink-0 lg:sticky lg:top-8 lg:block lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto lg:self-start'>
      <div className='px-4 py-6'>
        <nav className='flex flex-col gap-0.5' aria-label='Page sections'>
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`block rounded-lg px-3 py-2.5 text-[15px] leading-snug transition-[color,background-color] duration-200 ease-out hover:bg-accent-soft ${
                  isActive
                    ? 'bg-accent-soft font-medium text-accent-text'
                    : 'text-ink-secondary hover:text-accent-text'
                }`}>
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
