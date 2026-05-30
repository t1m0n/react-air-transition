import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { type CodeLanguage, highlightCode } from '../lib/highlightCode';

type CodeBlockProps = {
  children: string;
  language?: CodeLanguage;
};

export function CodeBlock({ children, language = 'tsx' }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    highlightCode(children, language).then((result) => {
      if (!cancelled) setHtml(result);
    });

    return () => {
      cancelled = true;
    };
  }, [children, language]);

  const shellClass = 'code-block overflow-x-auto rounded-2xl bg-code-bg p-4 shadow-code';
  const shellStyle = { boxShadow: 'var(--shadow-code)' };

  if (!html) {
    return (
      <pre className={shellClass} style={shellStyle}>
        <code className='block font-mono text-sm leading-relaxed whitespace-pre text-code-text'>
          {children}
        </code>
      </pre>
    );
  }

  return (
    <div className={shellClass} style={shellStyle} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 space-y-3 ${className}`}>
      <h2 className='text-3xl font-semibold text-ink'>{title}</h2>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <p className='max-w-3xl text-base leading-7 text-ink-secondary'>{children}</p>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='text-accent-text underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent'>
      {children}
    </a>
  );
}

const BTN_BASE =
  'inline-flex w-fit shrink-0 items-center justify-center rounded-full text-sm font-medium transition duration-150 ease-out select-none active:scale-[0.97] disabled:cursor-default disabled:opacity-40 disabled:saturate-50 disabled:active:scale-100';

const BTN_PRIMARY = `${BTN_BASE} bg-accent px-4 py-2 text-white shadow-[0_2px_8px_rgb(78_181_230/0.25)] hover:brightness-105 active:brightness-95 active:shadow-[0_1px_4px_rgb(78_181_230/0.2)] disabled:shadow-none disabled:hover:brightness-100 disabled:active:brightness-100`;

const BTN_SECONDARY = `${BTN_BASE} border border-accent bg-white px-4 py-2 text-ink hover:bg-accent-soft active:bg-accent-soft active:brightness-95 disabled:hover:bg-white disabled:active:bg-white`;

export function DemoButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}) {
  const styles = variant === 'primary' ? BTN_PRIMARY : BTN_SECONDARY;

  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className={`${styles} ${className}`.trim()}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = 'primary',
  external = false,
}: {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  external?: boolean;
}) {
  const className =
    variant === 'primary'
      ? `${BTN_BASE} bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_2px_10px_rgb(78_181_230/0.25)] hover:brightness-105 active:brightness-95 active:shadow-[0_1px_4px_rgb(78_181_230/0.2)]`
      : `${BTN_SECONDARY} px-5 py-3`;

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </a>
  );
}

export function DemoPreview({ children }: { children: ReactNode }) {
  return (
    <div
      className='rounded-2xl border border-border bg-white p-4'
      style={{ boxShadow: 'var(--shadow-card)' }}>
      {children}
    </div>
  );
}

/** Reserves layout space while AirTransition mounts/unmounts its child. */
export function AnimationSlot({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`overflow-hidden ${className}`}>{children}</div>;
}

export function ExampleCard({
  title,
  description,
  demo,
  code,
}: {
  title: string;
  description?: string;
  demo: ReactNode;
  code: string;
}) {
  return (
    <article className='space-y-3'>
      <div className='space-y-1'>
        <h3 className='text-xl font-semibold text-ink'>{title}</h3>
        {description ? (
          <p className='text-base leading-7 text-ink-secondary'>{description}</p>
        ) : null}
      </div>
      {demo}
      <CodeBlock>{code}</CodeBlock>
    </article>
  );
}
