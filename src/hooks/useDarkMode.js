import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState(localStorage?.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const rootElement = window.document.documentElement;
    rootElement.classList.remove(colorTheme);
    rootElement.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return { colorTheme, setTheme };
};

export default useDarkMode;
