import React, {
  type ReactElement,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { animate, utils } from 'animejs';
import type { AnimationParams, JSAnimation } from 'animejs';
import TransitionLib from 'react-transition-group/Transition';

import { getDelay, getDuration, getHeight } from './helpers';
import { removeStylesFromElement } from './removeStylesFromElement';
import type { TransitionDescription } from './types';
import type { AirTransitionProps } from './types';

const DEFAULT_ENTER: TransitionDescription = { opacity: [0, 1] };
const DEFAULT_EXIT: TransitionDescription = { opacity: 0 };
const DEFAULT_EASE = 'outCubic';

const ChildrenWithRef = ({
  children,
  ref,
}: {
  children: ReactElement;
  ref: RefObject<HTMLElement | null>;
}) => {
  if (!React.isValidElement(children)) {
    console.warn(`'${children}' is not a valid React element`);
    return null;
  }

  //@ts-expect-error We're hoping that the children have `ref` prop
  return React.cloneElement(children, { ref });
};

/**
 * Обёртка для добавления простых анимаций появления или скрытия других компонентов.
 * Использует anime.js v4 и react-transition-group.
 */
export const AirTransition = ({
  children,
  active,
  exit,
  exitDelay,
  exitEase = DEFAULT_EASE,
  enter,
  enterDelay,
  enterEase = DEFAULT_EASE,
  animateOnMount,
  animateOnUnmount = true,
  duration,
  removeStylesOnEnter,
  delayIndex = 1,
  animation,
  ...rest
}: AirTransitionProps) => {
  const $el = useRef<HTMLElement>(null);
  const isActive = useRef(false);
  const doneFunction = useRef<(() => void) | undefined>(undefined);
  const enterAnimation = useRef<JSAnimation | undefined>(undefined);
  const exitAnimation = useRef<JSAnimation | undefined>(undefined);
  const initialScrollHeight = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (active && animation && (!enterAnimation.current || enterAnimation.current.progress >= 1)) {
      const node = $el.current;
      if (!node) return;

      const { duration: animDuration, ease, ...animationProps } = animation;

      animate(node, {
        ...animationProps,
        ease: ease ?? DEFAULT_EASE,
        duration: getDuration(animDuration ?? duration),
        onComplete: () => {
          doneFunction.current?.();
        },
      } as AnimationParams);
    }
  }, [active, animation, duration]);

  const getEnterAnimations = useCallback(() => {
    const result: TransitionDescription = { duration, ...(enter ?? DEFAULT_ENTER) };

    // Если анимация прервала анимацию скрытия, не проигрываем появление заново с нуля,
    // а сразу выставляем целевые (последние) значения массивов.
    if (exitAnimation.current) {
      Object.keys(result).forEach((key) => {
        const currentValue = result[key];
        if (!Array.isArray(currentValue)) return;

        result[key] = currentValue.at(-1) as string | number;
      });
    }

    if ('height' in result && $el.current) {
      const exitProgress = exitAnimation.current?.progress ?? 0;
      // Небольшой костыль: если анимируем высоту в `auto`, то при прерывании анимации скрытия
      // в scrollHeight будет промежуточное значение. Поэтому используем высоту первой анимации.
      const fallbackHeight =
        exitProgress > 0 && exitProgress < 1 ? initialScrollHeight.current : undefined;

      result.height = getHeight(result.height as string, {
        el: $el.current,
        fallbackAutoHeight: fallbackHeight,
      });

      if (initialScrollHeight.current === undefined) {
        initialScrollHeight.current = $el.current.scrollHeight;
      }
    }

    if (enterDelay) {
      result.delay = getDelay(enterDelay, delayIndex);
    }

    return result;
  }, [duration, enter, enterDelay, delayIndex]);

  const getExitAnimations = useCallback(() => {
    const result: TransitionDescription = { duration, ...(exit ?? DEFAULT_EXIT) };

    if (exitDelay) {
      result.delay = getDelay(exitDelay, delayIndex);
    }

    return result;
  }, [duration, exit, exitDelay, delayIndex]);

  const patchedChildren = useMemo(() => {
    return <ChildrenWithRef ref={$el}>{children}</ChildrenWithRef>;
  }, [children]);

  const onEntering = useCallback(() => {
    const node = $el.current;

    if (enter === null || isActive.current || !node) {
      doneFunction.current?.();
      return;
    }

    const enterAnimations = getEnterAnimations();

    if (exitAnimation.current) {
      utils.remove(node);
    }

    enterAnimation.current = animate(node, {
      ease: enterEase,
      ...enterAnimations,
      duration: getDuration(enterAnimations.duration, exitAnimation.current?.progress),
      onComplete: () => {
        enterAnimation.current = undefined;
        isActive.current = true;
        if (removeStylesOnEnter && $el.current) {
          removeStylesFromElement($el.current, enterAnimations);
        }
        doneFunction.current?.();
      },
    } as AnimationParams);
  }, [enter, enterEase, getEnterAnimations, removeStylesOnEnter]);

  const onExiting = useCallback(() => {
    isActive.current = false;

    const node = $el.current;

    if (exit === null || !node) {
      doneFunction.current?.();
      return;
    }

    const exitAnimations = getExitAnimations();

    if (enterAnimation.current) {
      utils.remove(node);
    }

    exitAnimation.current = animate(node, {
      ease: exitEase,
      ...exitAnimations,
      duration: animateOnUnmount
        ? getDuration(exitAnimations.duration, enterAnimation.current?.progress)
        : 0,
      onComplete: () => {
        exitAnimation.current = undefined;
        doneFunction.current?.();
      },
    } as AnimationParams);
  }, [animateOnUnmount, exit, exitEase, getExitAnimations]);

  const onAnimationDone = useCallback((done: () => void) => {
    doneFunction.current = done;
  }, []);

  useEffect(() => {
    if (animateOnMount && $el.current) {
      onEntering();
    }
  }, [animateOnMount, onEntering]);

  const timeout = useMemo(() => {
    if (!animateOnUnmount) {
      return { exit: 0 };
    }
    return undefined;
  }, [animateOnUnmount]);

  return (
    <TransitionLib<HTMLElement>
      in={active}
      unmountOnExit
      nodeRef={$el}
      onEntering={onEntering}
      onExiting={onExiting}
      addEndListener={onAnimationDone}
      timeout={timeout}
      {...rest}>
      {patchedChildren}
    </TransitionLib>
  );
};
