import { useState } from 'react';
import { AirTransition } from 'react-air-transition';
import { AnimationSlot, DemoButton, DemoPreview } from '../ui';

export function FadeSlideDemo() {
  const [open, setOpen] = useState(true);

  return (
    <DemoPreview>
      <div className='flex w-full max-w-md flex-col items-start'>
        <DemoButton className='mb-4' onClick={() => setOpen((value) => !value)}>
          {open ? 'Hide panel' : 'Show panel'}
        </DemoButton>
        <AnimationSlot className='h-14 w-full'>
          <AirTransition
            active={open}
            duration={400}
            enter={{ opacity: [0, 1], translateY: ['16px', '0px'] }}
            exit={{ opacity: 0, translateY: '16px' }}>
            <div className='flex h-14 items-center rounded-xl border border-border bg-accent-soft px-4 text-sm text-ink'>
              Panel fades in and slides up from 16px below.
            </div>
          </AirTransition>
        </AnimationSlot>
      </div>
    </DemoPreview>
  );
}
