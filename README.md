# react-air-transition


[https://t1m0n.github.io/react-air-transition/](https://t1m0n.github.io/react-air-transition/)

A thin React wrapper around [react-transition-group](https://github.com/reactjs/react-transition-group) and [anime.js v4](https://animejs.com) for enter/exit animations.

- **react-transition-group** — mounts/unmounts the child and runs enter/exit lifecycle hooks (`onEntering`, `onExiting`, …).
- **anime.js** — drives the actual CSS/transform animations via `animate()`.

You configure transitions declaratively; the wrapper wires both libraries together so you do not have to call them manually.

**Bundle size (wrapper only):** ~1.44 kB gzip (~3.8 kB minified).

## Features

- Declarative show/hide via the `active` prop
- Custom enter/exit animations (opacity, transforms, height, and any anime.js-supported properties)
- Interrupt handling: switching `active` mid-animation reverses smoothly
- `height: auto` support for expand/collapse patterns
- Staggered lists via `enterDelay` + `delayIndex`
- In-place updates on mounted elements via the `animation` prop
- TypeScript types included

## Installation

```bash
npm install react-air-transition
```

**Peer dependency:** React 19+

`animejs` and `react-transition-group` are installed automatically as dependencies of this package.

## Quick start

```tsx
import { useState } from 'react';
import { AirTransition } from 'react-air-transition';

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <button onClick={() => setVisible((v) => !v)}>Toggle</button>

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
}
```

### Ref requirement

`children` must be a single React element that can receive a `ref` (native DOM element or `forwardRef` component). If your component cannot take a ref, wrap it in a `<div>` (or another DOM element).

## API

### `AirTransition`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactElement` | — | Element to animate (must accept `ref`) |
| `active` | `boolean` | — | When `true`, the element is shown; when `false`, it is hidden |
| `enter` | `TransitionDescription \| null` | `{opacity: [0, 1]}` | Enter animation. `null` disables enter animation |
| `exit` | `TransitionDescription \| null` | `{opacity: 0}` | Exit animation. `null` disables exit animation |
| `duration` | `number` | `300` | Duration in ms; overridden by `duration` inside `enter` / `exit` / `animation` |
| `enterEase` | `EasingParam` | `'outCubic'` | Easing for enter (anime.js v4) |
| `exitEase` | `EasingParam` | `'outCubic'` | Easing for exit |
| `enterDelay` | `number` | — | Base delay before enter; multiplied by `delayIndex` |
| `exitDelay` | `number` | — | Base delay before exit; multiplied by `delayIndex` |
| `delayIndex` | `number` | `1` | Multiplier for staggered lists (`delay * delayIndex`) |
| `animateOnMount` | `boolean` | `false` | Run enter animation on first mount |
| `animateOnUnmount` | `boolean` | `true` | Run exit animation before unmount; `false` skips exit animation |
| `removeStylesOnEnter` | `boolean` | `false` | Remove inline styles applied during enter after it completes |
| `animation` | `TransitionDescription` | — | Animate an already-mounted element when this object changes |

Additional props are forwarded to the underlying `Transition` from `react-transition-group`.

### `TransitionDescription`

Animation config compatible with anime.js v4 `animate()`. Common fields:

| Field | Type | Description |
|-------|------|-------------|
| `duration` | `number` | Duration in ms |
| `delay` | `number` | Delay in ms |
| `ease` | `EasingParam` | Easing function name or custom easing |
| `*` | `string \| number \| Array` | Any animatable CSS/transform property. Use `[from, to]` on **enter**; on **exit**, prefer a single target value (anime.js animates from the current state) |

Example (enter + exit):

```ts
// enter — explicit from → to
enter: {
  opacity: [0, 1],
  translateY: ['20px', '0px'],
  duration: 500,
  ease: 'outQuad',
}

// exit — target values only
exit: {
  opacity: 0,
  translateY: '20px',
}
```

## Examples

### Fade and slide

```tsx
<AirTransition
  active={open}
  duration={400}
  enter={{opacity: [0, 1], translateY: ['16px', '0px']}}
  exit={{opacity: 0, translateY: '16px'}}
>
  <div>Content</div>
</AirTransition>
```

### Collapsible panel (`height: auto`)

```tsx
<AirTransition
  active={expanded}
  duration={350}
  enter={{height: [0, 'auto'], opacity: [0, 1]}}
  exit={{height: 0, opacity: 0}}
  enterEase="outQuad"
  exitEase="inQuad"
>
  <div style={{overflow: 'hidden'}}>Expandable section</div>
</AirTransition>
```

`auto` is resolved to the element’s `scrollHeight` at animation time.

### Staggered list

```tsx
{items.map((item, index) => (
  <AirTransition
    key={item.id}
    active={showList}
    enterDelay={80}
    delayIndex={index + 1}
    duration={300}
    enter={{opacity: [0, 1], translateX: ['-12px', '0px']}}
    exit={{opacity: 0, translateX: '-12px'}}
  >
    <div>{item.label}</div>
  </AirTransition>
))}
```

### In-place animation (mounted element)

Use when the element stays mounted and you only want to animate property changes:

```tsx
<AirTransition
  active
  animation={
    shifted
      ? {translateX: '48px'}
      : {translateX: '0px'}
  }
>
  <div>Slides without unmounting</div>
</AirTransition>
```

## License

MIT
