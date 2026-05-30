import { useState } from 'react';
import { AirTransition } from 'react-air-transition';
import { AnimationSlot, DemoButton, DemoPreview } from '../ui';

export function QuickStartDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <DemoPreview>
      <div className='flex w-full max-w-md flex-col items-start'>
        <DemoButton className='mb-4' onClick={() => setVisible((value) => !value)}>
          Toggle
        </DemoButton>
        <AnimationSlot className='h-[4.5rem] w-full'>
          <AirTransition
            active={visible}
            duration={400}
            enter={{ opacity: [0, 1], translateY: ['16px', '0px'] }}
            exit={{ opacity: 0, translateY: '16px' }}>
            <div className='flex h-14 items-center rounded-xl border border-dashed border-accent px-4 text-sm text-ink'>
              Animated content
            </div>
          </AirTransition>
        </AnimationSlot>
      </div>
    </DemoPreview>
  );
}
