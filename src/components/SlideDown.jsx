import React, { useEffect, useRef, useState } from 'react';

export default function SlideDown({ children, threshold = 0.08, rootMargin = '0px', className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Fallback: ensure animation runs even if IntersectionObserver doesn't fire
  useEffect(() => {
    if (visible) return;
    // small delay to allow initial layout to settle
    const t = setTimeout(() => {
      // if IntersectionObserver didn't flip visible within 200ms, show anyway
      if (!visible) {
        console.debug('SlideDown: fallback -> set visible');
        setVisible(true);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div ref={ref} className={`slide-down ${visible ? 'slide-down--visible' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}
