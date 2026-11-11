import { useEffect } from 'react';

const LAYOUT_FIX_CSS = `
  /* Padding lives on the section (outer), matching the main site pattern */
  .home-redesign-page section,
  .home-better-content-page section,
  .home-animated-page section {
    padding-left: 50px !important;
    padding-right: 50px !important;
  }

  /* Inner container: max-width + centering only, no horizontal padding */
  .home-redesign-page section > div[class*="max-w-7xl"],
  .home-better-content-page section > div[class*="max-w-7xl"],
  .home-animated-page section > div[class*="max-w-7xl"] {
    max-width: 1360px !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  @media (max-width: 1439px) {
    .home-redesign-page section,
    .home-better-content-page section,
    .home-animated-page section {
      padding-left: 30px !important;
      padding-right: 30px !important;
    }
  }

  @media (max-width: 767px) {
    .home-redesign-page section,
    .home-better-content-page section,
    .home-animated-page section {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }
  }

  /* Prevent browser-default blue on a:hover; explicit Tailwind hover:text-* still wins */
  :where(.home-redesign-page, .home-better-content-page, .home-animated-page) a {
    color: inherit;
  }
  :where(.home-redesign-page, .home-better-content-page, .home-animated-page) a:hover {
    color: inherit;
  }
`;

const useRedesignStyles = () => {
  useEffect(() => {
    if (!document.getElementById('redesign-layout-fix')) {
      const fix = document.createElement('style');
      fix.id = 'redesign-layout-fix';
      fix.textContent = LAYOUT_FIX_CSS;
      document.head.appendChild(fix);
    }

    if (!document.getElementById('redesign-font-1')) {
      const l1 = document.createElement('link');
      l1.id = 'redesign-font-1';
      l1.rel = 'stylesheet';
      l1.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
      document.head.appendChild(l1);
    }
    if (!document.getElementById('redesign-font-2')) {
      const l2 = document.createElement('link');
      l2.id = 'redesign-font-2';
      l2.rel = 'stylesheet';
      l2.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap';
      document.head.appendChild(l2);
    }

  }, []);
};

export default useRedesignStyles;
