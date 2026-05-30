export const REPO_URL = 'https://github.com/t1m0n/react-air-transition';
export const NPM_URL = 'https://www.npmjs.com/package/react-air-transition';
export const ANIMEJS_URL = 'https://animejs.com';
export const REACT_TRANSITION_GROUP_URL = 'https://github.com/reactjs/react-transition-group';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'api', label: 'API' },
  { id: 'transition-description', label: 'TransitionDescription' },
  { id: 'examples', label: 'Examples' },
] as const;

export const API_ROWS = [
  ['active', 'boolean', '—', 'When true, element is shown; false hides it'],
  ['children', 'ReactElement', '—', 'Element to animate (must accept ref)'],
  ['enter', 'TransitionDescription | null', '{opacity: [0, 1]}', 'Enter animation; null disables'],
  ['exit', 'TransitionDescription | null', '{opacity: 0}', 'Exit animation; null disables'],
  ['duration', 'number', '300', 'Duration in ms'],
  ['enterEase / exitEase', 'EasingParam', "'outCubic'", 'anime.js v4 easing'],
  ['enterDelay / exitDelay', 'number', '—', 'Base delay × delayIndex'],
  ['delayIndex', 'number', '1', 'Stagger multiplier for lists'],
  ['animateOnMount', 'boolean', 'false', 'Run enter on first mount'],
  ['animateOnUnmount', 'boolean', 'true', 'Run exit before unmount'],
  ['removeStylesOnEnter', 'boolean', 'false', 'Remove inline styles after enter'],
  ['animation', 'TransitionDescription', '—', 'In-place animation when object changes'],
] as const;

export const EXAMPLES = [
  {
    id: 'fade-slide',
    title: 'Fade and slide',
    description: 'Basic enter/exit with opacity and translateY.',
    code: `<AirTransition active={open} duration={400}
  enter={{opacity: [0, 1], translateY: ['16px', '0px']}}
  exit={{opacity: 0, translateY: '16px'}}>
  <div>Content</div>
</AirTransition>`,
  },
  {
    id: 'collapsible',
    title: 'Collapsible panel',
    description: 'Animate height to auto for expand/collapse patterns.',
    code: `<AirTransition active={expanded} duration={350}
  enter={{height: [0, 'auto'], opacity: [0, 1]}}
  exit={{height: 0, opacity: 0}}>
  <div style={{overflow: 'hidden'}}>Section</div>
</AirTransition>`,
  },
  {
    id: 'staggered',
    title: 'Staggered list',
    description: 'enterDelay and delayIndex create a cascade effect.',
    code: `{items.map((item, index) => (
  <AirTransition
    key={item.id}
    active={showList}
    enterDelay={80}
    delayIndex={index + 1}
    duration={300}
    enter={{opacity: [0, 1], translateX: ['-12px', '0px']}}
    exit={{opacity: 0, translateX: '-12px'}}>
    <div>{item.label}</div>
  </AirTransition>
))}`,
  },
  {
    id: 'dynamic-list',
    title: 'Dynamic list',
    description:
      'TransitionGroup from react-transition-group toggles enter/exit when items are added or removed.',
    code: `import TransitionGroup from 'react-transition-group/TransitionGroup';

// TransitionGroup keeps exiting items mounted and sets in={false}
// on each AirTransition when an item is removed from the array.
const enterTransition = {
  opacity: [0, 1],
  scale: [0, 1],
  rotate: [45, 0],
  marginRight: ['0px', '12px'],
};

const exitTransition = {
  opacity: 0,
  scale: 0,
  width: 0,
  rotate: 45,
  marginRight: '0px',
};

<TransitionGroup
  component="ul"
  className="flex flex-nowrap [perspective:400px]"
  style={{minWidth: 'calc(7 * (48px + 12px))'}}>
  {items.map(item => (
    <AirTransition
      key={item.id}
      active
      unmountOnExit={false}
      duration={320}
      removeStylesOnEnter
      enter={enterTransition}
      exit={exitTransition}>
      <li className="mr-3 size-12 origin-center list-none overflow-hidden [transform-style:preserve-3d]">
        <button onClick={() => removeItem(item.id)} />
      </li>
    </AirTransition>
  ))}
</TransitionGroup>`,
  },
  {
    id: 'in-place',
    title: 'In-place animation',
    description: 'Keep the element mounted and animate property changes.',
    code: `<AirTransition
  active
  duration={350}
  animation={shifted ? {translateX: '120px'} : {translateX: '0px'}}>
  <div>Slides without unmounting</div>
</AirTransition>`,
  },
  {
    id: 'interrupt',
    title: 'Interrupted transition',
    description:
      'Toggle active mid-animation — the new transition picks up from the current frame.',
    code: `<AirTransition
  active={active}
  duration={700}
  enter={{opacity: [0, 1], scale: [0.92, 1]}}
  exit={{opacity: 0, scale: 0.92}}>
  <div>Interrupt me mid-animation</div>
</AirTransition>`,
  },
] as const;

export const INSTALL_COMMAND = 'npm install react-air-transition';

export const QUICK_START_CODE = `import { useState } from 'react';
import { AirTransition } from 'react-air-transition';

function App() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <button onClick={() => setVisible(v => !v)}>Toggle</button>
      <AirTransition
        active={visible}
        duration={400}
        enter={{opacity: [0, 1], translateY: ['16px', '0px']}}
        exit={{opacity: 0, translateY: '16px'}}
      >
        <div>Animated content</div>
      </AirTransition>
    </>
  );
}`;

export const TRANSITION_DESCRIPTION_CODE = `enter: {opacity: [0, 1], translateY: ['20px', '0px'], duration: 500}
exit:  {opacity: 0, translateY: '20px'}`;
