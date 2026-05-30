import { codeToHtml } from 'shiki/bundle/web';

export type CodeLanguage = 'tsx' | 'bash' | 'typescript';

const cache = new Map<string, Promise<string>>();

export function highlightCode(code: string, lang: CodeLanguage): Promise<string> {
  const key = `${lang}\0${code}`;

  let pending = cache.get(key);
  if (!pending) {
    pending = codeToHtml(code.trimEnd(), {
      lang,
      theme: 'github-light',
    });
    cache.set(key, pending);
  }

  return pending;
}
