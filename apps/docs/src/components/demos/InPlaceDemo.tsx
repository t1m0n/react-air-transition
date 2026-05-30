import { useState } from 'react';
import { AirTransition } from 'react-air-transition';
import { DemoButton, DemoPreview } from '../ui';

export function InPlaceDemo() {
  const [shifted, setShifted] = useState(false);

  return (
    <DemoPreview>
      <div className='flex flex-col items-start'>
        <DemoButton className='mb-4' onClick={() => setShifted((value) => !value)}>
          Toggle position
        </DemoButton>
        <AirTransition
          active
          duration={350}
          animation={shifted ? { translateX: '120px' } : { translateX: '0px' }}>
          <div className='inline-flex rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white'>
            Stays mounted
          </div>
        </AirTransition>
      </div>
    </DemoPreview>
  );
}
