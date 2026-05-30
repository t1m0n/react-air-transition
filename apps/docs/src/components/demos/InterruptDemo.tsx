import { useState } from 'react';
import { AirTransition } from 'react-air-transition';
import { AnimationSlot, DemoButton, DemoPreview } from '../ui';

export function InterruptDemo() {
  const [active, setActive] = useState(true);

  return (
    <DemoPreview>
      <div className='flex w-full max-w-sm flex-col items-start'>
        <p className='mb-4 text-base leading-7 text-ink-secondary'>
          Toggle quickly while the animation is running — the next transition continues from the
          current visual state.
        </p>
        <div className='mb-4 flex flex-wrap gap-2'>
          <DemoButton onClick={() => setActive(true)}>Show</DemoButton>
          <DemoButton variant='secondary' onClick={() => setActive(false)}>
            Hide
          </DemoButton>
        </div>
        <AnimationSlot className='h-12 w-full'>
          <AirTransition
            active={active}
            duration={700}
            enter={{ opacity: [0, 1], scale: [0.92, 1] }}
            exit={{ opacity: 0, scale: 0.92 }}>
            <div className='flex h-12 items-center rounded-xl bg-accent-orange px-4 text-sm font-medium text-white'>
              Interrupt me mid-animation
            </div>
          </AirTransition>
        </AnimationSlot>
      </div>
    </DemoPreview>
  );
}
