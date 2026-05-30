export const DEFAULT_DURATION = 300;

/**
 * Returns the animation duration.
 * When `progress` (0...1) of an interrupted animation is provided, the duration is scaled
 * down proportionally so the animation can continue or reverse smoothly from the current point.
 */
export const getDuration = (duration: number = DEFAULT_DURATION, progress?: number) => {
  if (progress) {
    return duration * progress;
  }

  return duration;
};

export const getDelay = (delay: number, index: number) => {
  return delay * index;
};

/**
 * Converts `auto` to the element's actual `scrollHeight`
 * so height can be animated to a concrete number.
 */
export const getHeight = (
  height: number | string | Array<string | number>,
  { el, fallbackAutoHeight }: { el: HTMLElement; fallbackAutoHeight?: number },
) => {
  const newHeight = fallbackAutoHeight ?? el.scrollHeight;

  if (height === 'auto') {
    return newHeight;
  }

  if (Array.isArray(height)) {
    return height.map((h) => (h === 'auto' ? newHeight : h));
  }

  return height;
};
