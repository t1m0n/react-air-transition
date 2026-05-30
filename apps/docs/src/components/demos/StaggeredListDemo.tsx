import { useState } from 'react';
import { AirTransition } from 'react-air-transition';
import { AnimationSlot, DemoButton, DemoPreview } from '../ui';

const ITEMS = [
  { id: 'design', label: 'Design tokens' },
  { id: 'motion', label: 'Motion specs' },
  { id: 'ship', label: 'Ship to prod' },
] as const;

const ITEM_SLOT = 'h-10';

export function StaggeredListDemo() {
  const [showList, setShowList] = useState(true);

  return (
    <DemoPreview>
      <div className='flex w-full max-w-xs flex-col items-start'>
        <DemoButton className='mb-4' onClick={() => setShowList((value) => !value)}>
          {showList ? 'Hide list' : 'Show list'}
        </DemoButton>
        <AnimationSlot className='w-full'>
          <ul className='flex flex-col gap-2'>
            {ITEMS.map((item, index) => (
              <li key={item.id} className={`${ITEM_SLOT} overflow-hidden`}>
                <AirTransition
                  active={showList}
                  enterDelay={80}
                  delayIndex={index + 1}
                  duration={300}
                  enter={{ opacity: [0, 1], translateX: ['-12px', '0px'] }}
                  exit={{ opacity: 0, translateX: '-12px' }}>
                  <div
                    className={`flex ${ITEM_SLOT} items-center rounded-lg border border-border bg-white px-3 text-sm text-ink`}>
                    {item.label}
                  </div>
                </AirTransition>
              </li>
            ))}
          </ul>
        </AnimationSlot>
      </div>
    </DemoPreview>
  );
}
