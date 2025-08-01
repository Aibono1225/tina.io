import React from 'react';

interface Heading {
  id?: string;
  offset?: number;
  level?: string;
}

function createHeadings(
  contentRef: React.RefObject<HTMLDivElement>,
): Heading[] {
  const headings = [];
  const htmlElements = contentRef.current.querySelectorAll(
    'h1, h2, h3, h4, h5, h6',
  );

  htmlElements.forEach((heading: HTMLHeadingElement) => {
    headings.push({
      id: heading.id,
      offset: heading.offsetTop,
      level: heading.tagName,
    });
  });
  return headings;
}

export function createTocListener(
  contentRef: React.RefObject<HTMLDivElement>,
  setActiveIds: (activeIds: string[]) => void,
): () => void {
  let tick = false;
  const headings = createHeadings(contentRef);
  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

  const relativePositionHeadingMap = headings.map((heading) => {
    return {
      ...heading,
      relativePagePosition: heading.offset / contentRef.current.scrollHeight,
    };
  });

  const handleScroll = () => {
    const scrollPos = window.scrollY;
    const newActiveIds = [];
    const relativeScrollPosition = scrollPos / maxScrollY;
    const activeHeadingCandidates = relativePositionHeadingMap.filter(
      (heading) => {
        return relativeScrollPosition >= heading.relativePagePosition;
      },
    );

    const activeHeading =
      activeHeadingCandidates.length > 0
        ? activeHeadingCandidates.reduce((prev, current) =>
            prev.offset > current.offset ? prev : current,
          )
        : (headings[0] ?? {});
    newActiveIds.push(activeHeading.id);

    if (activeHeading.level !== 'H2') {
      const activeHeadingParentCandidates =
        activeHeadingCandidates.length > 0
          ? activeHeadingCandidates.filter((heading) => {
              return heading.level === 'H2';
            })
          : [];
      const activeHeadingParent =
        activeHeadingParentCandidates.length > 0
          ? activeHeadingParentCandidates.reduce((prev, current) =>
              prev.offset > current.offset ? prev : current,
            )
          : null;

      if (activeHeadingParent?.id) {
        newActiveIds.push(activeHeadingParent.id);
      }
    }

    setActiveIds(newActiveIds);
  };

  return () => {
    if (!tick) {
      window.requestAnimationFrame(() => {
        handleScroll();
        tick = false;
      });
      tick = true;
    }
  };
}

export function useHookWithRefCallback() {
  const ref = React.useRef(null);
  const setRef = React.useCallback((node) => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
    }

    // Save a reference to the node
    ref.current = node;
  }, []);

  return [setRef, ref];
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState<{
    width: number;
    height: number;
  }>();

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    });
  }, []);

  if (typeof window !== 'undefined') {
    return { width: 1200, height: 800 };
  }

  return windowSize;
}

export function useTocListener(_data) {
  const [activeIds, setActiveIds] = React.useState([]);
  const [setRef, ref] = useHookWithRefCallback();

  const _windowSize = useWindowSize();

  React.useEffect(() => {
    if (typeof window === `undefined` || !(ref as any).current) {
      return;
    }

    const activeTocListener = createTocListener(ref as any, setActiveIds);
    window.addEventListener('scroll', activeTocListener, { passive: true });

    return () => window.removeEventListener('scroll', activeTocListener);
  }, [ref]);

  return { contentRef: setRef, activeIds };
}
