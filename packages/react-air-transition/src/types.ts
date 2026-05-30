import type { EasingParam } from 'animejs';
import type { ReactElement } from 'react';

/**
 * A value that can be animated.
 * An array describes a `[from, to]` animation.
 */
export type TransitionValue = string | number | Array<string | number>;

/**
 * Animation description: animatable properties plus anime.js v4 options.
 * Properties match those accepted by `animate` from animejs.
 */
export type TransitionDescription = {
  duration?: number;
  delay?: number;
  ease?: EasingParam;
} & {
  [property: string]: TransitionValue | EasingParam | undefined;
};

export interface AirTransitionProps {
  /**
   * The element to animate. `children` must accept a ref;
   * if it cannot, wrap the target component in a `<div>`.
   */
  children: ReactElement;
  /**
   * When `true`, the element is shown.
   */
  active: boolean;
  /**
   * Alias for react-transition-group `in` (used by TransitionGroup).
   * When set, takes precedence over `active`.
   */
  in?: boolean;
  /**
   * Unmount after exit. Set to `false` when used inside TransitionGroup.
   */
  unmountOnExit?: boolean;
  /**
   * Whether to run the enter animation on mount.
   */
  animateOnMount?: boolean;
  /**
   * Whether to run the exit animation on unmount.
   */
  animateOnUnmount?: boolean;
  /**
   * Animation duration in milliseconds (default 300).
   * Overridden by `duration` in `enter` / `exit` / `animation`.
   */
  duration?: number;
  /**
   * Delay before the enter animation.
   */
  enterDelay?: number;
  /**
   * Delay before the exit animation.
   */
  exitDelay?: number;
  /**
   * Enter animation description.
   * `null` disables the enter animation.
   */
  enter?: TransitionDescription | null;
  /**
   * Exit animation description.
   * `null` disables the exit animation.
   */
  exit?: TransitionDescription | null;
  /**
   * Easing for the enter phase (anime.js v4).
   */
  enterEase?: EasingParam;
  /**
   * Easing for the exit phase (anime.js v4).
   */
  exitEase?: EasingParam;
  /**
   * When `true`, inline styles applied for the enter animation
   * are removed after it completes.
   */
  removeStylesOnEnter?: boolean;
  /**
   * When rendering multiple items in a loop with staggered timing,
   * pass the item index — delay is multiplied by this value.
   */
  delayIndex?: number;
  /**
   * Animation config for an already mounted element
   * when you need to smoothly move or transform it in place.
   */
  animation?: TransitionDescription;
  /** Called after the exit animation finishes (react-transition-group). */
  onExited?: () => void;
}
