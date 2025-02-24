import { useEffect, useState } from 'react';

import { SvgDarkTheme } from '@/shared/ui/icons/dark-theme';

export const ThemeToggle = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  return (
    <button
      className='mr-2 text-[#333] hover:text-[#333]/50 transition-colors dark:text-[#ECF0F1] dark:hover:text-[#ECF0F1]/50'
      onClick={() => setDarkTheme(!darkTheme)}
    >
      <SvgDarkTheme />
    </button>
  );
};
