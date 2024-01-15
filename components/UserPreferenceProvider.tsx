'use client'

import { UserPreferenceContext, useUserPreferenceStore } from '@/hooks/state/userPrefence'
import React from "react";

export function UserPreferenceProvider({ children }: { children: React.ReactNode }) {
  const userPreference = useUserPreferenceStore((state) => state.userPreference)
  return (
    <UserPreferenceContext.Provider value={userPreference}>
      {children}
    </UserPreferenceContext.Provider>
  )
}