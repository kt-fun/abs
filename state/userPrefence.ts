import { UserPreference } from '@/interfaces/config'
import { createContext } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export const UserPreferenceContext = createContext<UserPreference|null>(null)

export const useUserPreferenceStore = create(
    persist(
      (set, get:()=>any) => ({
        userPreference: {
            themeColor: 'blue',
            language: 'zh-CN',
            themeMode: 'light',
        },
        updateThemeColor: (color:string) => {
            set((state:any) => {
                state.userPreference.themeColor = color
                return state
            })
        },
        updateI18N: (i18n:string) => {
            set((state:any) => {
                state.userPreference.language = i18n
                return state
            })
        },
        updateThemeMode: (mode:string) => {
            set((state:any) => {
                state.userPreference.themeMode = mode
                return state
            })
        },
      }),
      {
        name: 'user-preference',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )