import type { EasingParam } from 'animejs';
import type { ReactElement } from 'react';

/**
 * Значение, которое можно анимировать.
 * Массив описывает анимацию `[from, to]`.
 */
export type TransitionValue = string | number | Array<string | number>;

/**
 * Описание анимации: набор анимируемых свойств + опции anime.js v4.
 * Свойства соответствуют тем, что принимает `animate` из animejs.
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
   * Что будем анимировать? Children обязательно должен принимать ref,
   * если сложно или невозможно добавить ref, то целевой компонент можно обернуть в <div>
   */
  children: ReactElement;
  /**
   * Если true, то элемент будет показан
   */
  active: boolean;
  /**
   * Нужно ли анимировать компонент на стадии mount
   */
  animateOnMount?: boolean;
  /**
   * Нужно ли анимировать компонент на стадии unMount
   */
  animateOnUnmount?: boolean;
  /**
   * Продолжительность анимации в миллисекундах (по умолчанию 300).
   * Переопределяется `duration` в `enter` / `exit` / `animation`.
   */
  duration?: number;
  /**
   * Задержка перед анимацией появления
   */
  enterDelay?: number;
  /**
   * Задержка перед анимацией скрытия
   */
  exitDelay?: number;
  /**
   * Описание анимации появления.
   * `null` — отключить анимацию появления.
   */
  enter?: TransitionDescription | null;
  /**
   * Описание анимации скрытия.
   * `null` — отключить анимацию скрытия.
   */
  exit?: TransitionDescription | null;
  /**
   * Функция смягчения на этапе появления компонента (anime.js v4)
   */
  enterEase?: EasingParam;
  /**
   * Функция смягчения на этапе скрытия компонента (anime.js v4)
   */
  exitEase?: EasingParam;
  /**
   * Если true, то после проигрывания анимации появления стили,
   * которые были применены для этой анимации, будут удалены.
   */
  removeStylesOnEnter?: boolean;
  /**
   * Если нужно отобразить несколько элементов в цикле с небольшой задержкой,
   * то можно передать индекс компонента и задержка будет автоматически добавлена
   */
  delayIndex?: number;
  /**
   * Настройки анимации для уже смонтированного компонента,
   * когда требуется плавно подвинуть или перевернуть его.
   */
  animation?: TransitionDescription;
}
