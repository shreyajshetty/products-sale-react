import { useState, useEffect } from 'react';
import { Switch, useColorMode } from '@chakra-ui/react';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDark, setIsDark] = useState(colorMode === 'dark');

  useEffect(() => {
    localStorage.setItem('theme', colorMode);
  }, [colorMode]);

  const handleToggle = () => {
    setIsDark(!isDark);
    toggleColorMode();
  };

  return (
    <Switch
      isChecked={isDark}
      onChange={handleToggle}
      colorScheme="teal"
    />
  );
};

export default ThemeToggle;
