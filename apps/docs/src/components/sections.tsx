import {
  ANIMEJS_URL,
  API_ROWS,
  EXAMPLES,
  INSTALL_COMMAND,
  QUICK_START_CODE,
  REACT_TRANSITION_GROUP_URL,
  REPO_URL,
  TRANSITION_DESCRIPTION_CODE,
} from '../data/content';
import { PACKAGE_VERSION } from '../data/packageMeta';
import {
  CollapsibleDemo,
  DynamicListDemo,
  FadeSlideDemo,
  InPlaceDemo,
  InterruptDemo,
  QuickStartDemo,
  StaggeredListDemo,
} from './demos';
import { CodeBlock, ExampleCard, LinkButton, Prose, Section, TextLink } from './ui';

const DEMO_BY_ID = {
  'fade-slide': FadeSlideDemo,
  collapsible: CollapsibleDemo,
  'dynamic-list': DynamicListDemo,
  staggered: StaggeredListDemo,
  'in-place': InPlaceDemo,
  interrupt: InterruptDemo,
} as const;

export function Hero() {
  return (
    <section id='overview' className='scroll-mt-20 space-y-4'>
      <span className='inline-flex rounded-full bg-accent-soft-orange px-2.5 py-1 font-mono text-[11px] text-accent-text-orange'>
        v{PACKAGE_VERSION} · React 19+ · ~1.44 kB gzip
      </span>

      <h1 className='max-w-3xl text-[clamp(1.75rem,4vw,2rem)] leading-tight font-bold text-ink'>
        React Air Transition — declarative{' '}
        <span className='inline-flex items-center rounded-xl bg-accent-soft-orange px-2.5 pt-0.5 pb-[8px] align-middle leading-none text-accent-orange'>
          enter/exit
        </span>{' '}
        animations for React
      </h1>

      <Prose>
        Thin wrapper around{' '}
        <TextLink href={REACT_TRANSITION_GROUP_URL}>react-transition-group</TextLink> and{' '}
        <TextLink href={ANIMEJS_URL}>anime.js v4</TextLink>. Configure show/hide transitions
        declaratively — the wrapper wires lifecycle hooks and animate() for you.
      </Prose>

      <div className='flex flex-wrap items-center gap-3 pt-1'>
        <LinkButton href='#quick-start'>Quick start</LinkButton>
        <LinkButton href={REPO_URL} variant='secondary' external>
          View on GitHub
        </LinkButton>
      </div>
    </section>
  );
}

export function ApiTable() {
  return (
    <div
      className='overflow-x-auto overflow-y-hidden rounded-2xl shadow-card'
      style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className='min-w-[640px]'>
        <div className='grid grid-cols-[minmax(7rem,1.1fr)_minmax(8rem,1.4fr)_minmax(5rem,0.9fr)_minmax(0,2fr)] bg-accent-soft'>
          {['Prop', 'Type', 'Default', 'Description'].map((label) => (
            <div
              key={label}
              className='px-3 py-2.5 font-mono text-xs font-semibold tracking-wide text-ink-muted uppercase'>
              {label}
            </div>
          ))}
        </div>
        {API_ROWS.map(([prop, type, def, description], index) => (
          <div
            key={prop}
            className={`grid grid-cols-[minmax(7rem,1.1fr)_minmax(8rem,1.4fr)_minmax(5rem,0.9fr)_minmax(0,2fr)] border-t border-border ${
              index % 2 === 0 ? 'bg-white' : 'bg-surface-muted'
            }`}>
            <div className='px-3 py-2.5 font-mono text-sm text-ink'>{prop}</div>
            <div className='px-3 py-2.5 font-mono text-sm text-ink'>{type}</div>
            <div className='px-3 py-2.5 font-mono text-sm text-ink'>{def}</div>
            <div className='px-3 py-2.5 text-base leading-relaxed text-ink-secondary'>
              {description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExamplesSection() {
  return (
    <Section id='examples' title='Examples' className='space-y-6'>
      <Prose>
        Each example runs live in the browser — toggle controls and watch React Air Transition in
        action.
      </Prose>
      {EXAMPLES.map((example) => {
        const Demo = DEMO_BY_ID[example.id];
        return (
          <ExampleCard
            key={example.id}
            title={example.title}
            description={example.description}
            demo={<Demo />}
            code={example.code}
          />
        );
      })}
    </Section>
  );
}

export function DocsSections() {
  return (
    <div className='space-y-10'>
      <Hero />

      <Section id='installation' title='Installation'>
        <CodeBlock language='bash'>{INSTALL_COMMAND}</CodeBlock>
      </Section>

      <Section id='quick-start' title='Quick start' className='space-y-4'>
        <Prose>
          children must be a single React element that accepts ref (native DOM or forwardRef). Wrap
          in a div if needed.
        </Prose>
        <QuickStartDemo />
        <CodeBlock>{QUICK_START_CODE}</CodeBlock>
      </Section>

      <Section id='api' title='API' className='space-y-4'>
        <ApiTable />
      </Section>

      <Section id='transition-description' title='TransitionDescription'>
        <Prose>
          Animation config compatible with <TextLink href={ANIMEJS_URL}>anime.js v4</TextLink>{' '}
          animate(). On enter use [from, to] arrays; on exit use single target values — anime
          animates from the current state.
        </Prose>
        <CodeBlock language='typescript'>{TRANSITION_DESCRIPTION_CODE}</CodeBlock>
      </Section>

      <ExamplesSection />
    </div>
  );
}
