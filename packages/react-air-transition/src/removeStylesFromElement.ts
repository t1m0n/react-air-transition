import type { TransitionDescription } from './types';

const transformRegExp = /translate\w?|scale\w?|rotate\w?|skew\w?|perspective/i;

export const removeStylesFromElement = <E extends HTMLElement>(
  el: E,
  styles: TransitionDescription,
) => {
  Object.keys(styles).forEach((key) => {
    let propName = key;
    if (transformRegExp.test(propName)) {
      propName = 'transform';
    }

    el.style.removeProperty(propName);
  });
};
