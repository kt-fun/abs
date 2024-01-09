
import { createContext } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

export interface UserPreference {
    userPreference: {
        themeColor: string;
        themeMode: ThemeMode;
        language: string;
    }
}

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
    System = 'system'
}
export interface UserPreferenceAction {
    updateThemeColor: (color:string) => void;
    updateI18N: (i18n:string) => void;
    updateThemeMode: (mode:ThemeMode) => void;
}



export const UserPreferenceContext = createContext<{
    themeColor: string;
    themeMode: ThemeMode;
    language: string;
}|null>(null)

export const useUserPreferenceStore = create<UserPreference & UserPreferenceAction>()(
    devtools(
        persist(
                (set, get) => ({
                userPreference: {
                    themeColor: 'blue',
                    language: 'zh-CN',
                    themeMode: ThemeMode.Light,
                },
                updateThemeColor: (color:string) => {
                    set((state) => ({
                        userPreference: {
                            ...state.userPreference,
                            themeColor: color
                        }
                    }))
                },
                updateI18N: (i18n:string) => {
                    set((state) => ({
                            userPreference: {
                                ...state.userPreference,
                                language: i18n
                            }
                    }))
                },
                updateThemeMode: (mode:ThemeMode) => {
                    set((state) => ({
                            userPreference: {
                                ...state.userPreference,
                                themeMode: mode
                            }
                    }))
                    const root = window.document.documentElement;
                    root.classList.remove("light", "dark");
                    if (mode === 'system') {
                    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                        .matches
                        ? "dark"
                        : "light";
                        root.classList.add(systemTheme);
                    }
                    root.classList.add(mode);
                  },
                }),
                {
                  name: 'user-preference',
                  storage: createJSONStorage(() => localStorage),
                }
        )
    )
)