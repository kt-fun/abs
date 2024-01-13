'use client'

import { UserPreferenceContext, useUserPreferenceStore } from '@/hooks/state/userPrefence'

export function UserPreferenceProvider({ children }: { children: React.ReactNode }) {
  const userPreference = useUserPreferenceStore((state) => state.userPreference)
  return (
    <UserPreferenceContext.Provider value={userPreference}>
      {children}
    </UserPreferenceContext.Provider>
  )
}