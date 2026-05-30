import { useRef, useState } from 'react';
import { AirTransition } from 'react-air-transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { DemoButton, DemoPreview } from '../ui';

const COLORS = ['#4eb5e6', '#ff9a19', '#2b8cbd', '#c6760d', '#6ec8ef'] as const;
const SQUARE_SIZE = '48px';
const ITEM_MARGIN = '12px';
const MAX_ITEMS = 7;

const enterTransition = {
  opacity: [0, 1],
  scale: [0, 1],
  rotate: [45, 0],
  marginRight: ['0px', ITEM_MARGIN],
} as const;

const exitTransition = {
  opacity: 0,
  scale: 0,
  width: 0,
  rotate: 45,
  marginRight: '0px',
} as const;

type SquareItem = {
  id: string;
  color: (typeof COLORS)[number];
};

function createItem(id: number): SquareItem {
  return {
    id: String(id),
    color: COLORS[(id - 1) % COLORS.length],
  };
}

export function DynamicListDemo() {
  const nextId = useRef(4);
  const [items, setItems] = useState<SquareItem[]>(() => [
    createItem(1),
    createItem(2),
    createItem(3),
  ]);

  const addItem = () => {
    setItems((list) => {
      if (list.length >= MAX_ITEMS) return list;

      const id = nextId.current;
      nextId.current += 1;
      return [...list, createItem(id)];
    });
  };

  const removeItem = (id: string) => {
    setItems((list) => list.filter((item) => item.id !== id));
  };

  return (
    <DemoPreview>
      <div className='flex w-full flex-col items-start'>
        <DemoButton className='mb-4' disabled={items.length >= MAX_ITEMS} onClick={addItem}>
          Add square
        </DemoButton>
        <TransitionGroup
          component='ul'
          className='flex flex-nowrap [perspective:400px]'
          style={{ minWidth: `calc(${MAX_ITEMS} * (${SQUARE_SIZE} + ${ITEM_MARGIN}))` }}>
          {items.map((item) => (
            <AirTransition
              key={item.id}
              active
              unmountOnExit={false}
              duration={320}
              removeStylesOnEnter
              enter={enterTransition}
              exit={exitTransition}>
              <li className='mr-3 size-12 origin-center list-none overflow-hidden [transform-style:preserve-3d]'>
                <button
                  type='button'
                  onClick={() => removeItem(item.id)}
                  className='size-12 shrink-0 cursor-pointer rounded-xl shadow-card transition-[filter] hover:brightness-110 active:scale-95'
                  style={{ backgroundColor: item.color, boxShadow: 'var(--shadow-card)' }}
                  aria-label='Remove square'
                />
              </li>
            </AirTransition>
          ))}
        </TransitionGroup>
      </div>
    </DemoPreview>
  );
}
