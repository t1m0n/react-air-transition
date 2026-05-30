export const DEFAULT_DURATION = 300;

/**
 * Возвращает длительность анимации.
 * Если передан `progress` (0...1) прерванной анимации, длительность пропорционально сокращается,
 * чтобы продолжить/развернуть анимацию плавно с текущей точки.
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
 * Превращает значение `auto` в реальный `scrollHeight` элемента,
 * чтобы анимировать высоту на конкретное число.
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
