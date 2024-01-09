import { create } from "zustand";

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
    System = 'system'
}

interface ThemeModeState {
    themeMode: string
    updateThemeMode: (themeMode: ThemeMode) => void
  }
  
export const useThemeMode = create<ThemeModeState>()(
    (set) => ({
        themeMode: ThemeMode.System,
        updateThemeMode: (themeMode) => set((state) => {
            const root = window.document.documentElement;
            
                root.classList.remove("light", "dark");
            
                if (themeMode === ThemeMode.System) {
                  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                    .matches
                    ? "dark"
                    : "light";
                  root.classList.add(systemTheme);
                }
            
                root.classList.add(themeMode);
            return ({themeMode})
        }),
    })
)