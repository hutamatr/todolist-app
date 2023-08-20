import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import useDarkMode from '@hooks/useDarkMode';

const ThemeSwitcher = ({ className }) => {
  const { colorTheme, setTheme } = useDarkMode();
  const [darkTheme, setDarkTheme] = useState(colorTheme === 'light');

  const toggleThemeHandler = (checked) => {
    setTheme(colorTheme);
    setDarkTheme(checked);
  };

  return (
    <div className={`${className}`}>
      <DarkModeSwitch
        checked={darkTheme}
        onChange={toggleThemeHandler}
        size={22}
        sunColor="#FDB813"
        moonColor="#FEFCD7"
      />
    </div>
  );
};

export default ThemeSwitcher;
