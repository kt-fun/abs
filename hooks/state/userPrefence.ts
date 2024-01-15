
import { createContext } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

export interface UserPreference {
    userPreference: {
        themeColor: string;
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
}



export const UserPreferenceContext = createContext<{
    themeColor: string;
    language: string;
}|null>(null)


// todo replace with useContext
export const useUserPreferenceStore = create<UserPreference & UserPreferenceAction>()(
    devtools(
        persist(
                (set, get) => ({
                userPreference: {
                    themeColor: 'blue',
                    language: 'zh-CN',
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
                }),
                {
                  name: 'user-preference',
                  storage: createJSONStorage(() => localStorage),
                }
        )
    )
)