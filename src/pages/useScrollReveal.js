
import { useEffect, useRef } from 'react';

const useScrollReveal = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    const observedElements = new WeakSet();
    const observeElements = (node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      const elements = [];
      if (node.matches('.reveal, .stagger-reveal')) {
        elements.push(node);
      }
      elements.push(...node.querySelectorAll('.reveal, .stagger-reveal'));

      elements.forEach((element) => {
        if (!observedElements.has(element)) {
          observedElements.add(element);
          observer.observe(element);
        }
      });
    };

    observeElements(page);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(observeElements);
      });
    });
    mutationObserver.observe(page, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return pageRef;
};

export default useScrollReveal;
