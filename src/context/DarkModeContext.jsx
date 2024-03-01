import { useEffect } from "react";
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useLocalStorageState(false, "darkMode");
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const changeMode = () => setDarkMode(!isDarkMode);
  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        changeMode,
      }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  return context;
};

export { DarkModeProvider, useDarkMode };
