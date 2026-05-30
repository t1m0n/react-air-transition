import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: readonly string[], offset = 120) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const updateActiveSection = () => {
      let nextActive = sectionIds[0] ?? '';

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        if (element.getBoundingClientRect().top - offset <= 0) {
          nextActive = id;
        }
      }

      setActiveId(nextActive);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sectionIds, offset]);

  return activeId;
}
