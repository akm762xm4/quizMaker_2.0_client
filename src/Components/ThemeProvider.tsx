import { useEffect, useMemo, useState } from "react";
import { Theme, ThemeContext, ResolvedTheme } from "./themeContext";

const getSystemTheme = (): ResolvedTheme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem("quizmaker-theme") as Theme | null) || "system"
  );
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    theme === "system" ? getSystemTheme() : theme
  );

  useEffect(() => {
    const applyTheme = () => {
      const nextTheme = theme === "system" ? getSystemTheme() : theme;
      setResolvedTheme(nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
    };
    applyTheme();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [theme]);

  const updateTheme = (nextTheme: Theme) => {
    localStorage.setItem("quizmaker-theme", nextTheme);
    setTheme(nextTheme);
  };

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme: updateTheme }),
    [theme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
