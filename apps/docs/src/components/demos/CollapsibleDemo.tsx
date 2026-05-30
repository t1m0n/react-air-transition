import { useState } from 'react';
import { AirTransition } from 'react-air-transition';
import { DemoButton, DemoPreview } from '../ui';

export function CollapsibleDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <DemoPreview>
      <div className='flex w-full max-w-lg flex-col items-start'>
        <DemoButton className='mb-4' onClick={() => setExpanded((value) => !value)}>
          {expanded ? 'Collapse' : 'Expand'}
        </DemoButton>
        <AirTransition
          active={expanded}
          duration={350}
          enter={{ height: [0, 'auto'], opacity: [0, 1] }}
          exit={{ height: 0, opacity: 0 }}>
          <div className='overflow-hidden'>
            <div className='rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm leading-relaxed text-ink-secondary'>
              Height animates from 0 to auto using the element scrollHeight. Useful for FAQ
              sections, accordions, and expandable details.
            </div>
          </div>
        </AirTransition>
      </div>
    </DemoPreview>
  );
}
