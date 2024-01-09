"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import './globals.css'
import { Theme } from '@radix-ui/themes'

import { UserPreferenceContext, useUserPreferenceStore } from '@/hooks/state/userPrefence'
import { Header } from '@/components/header/Header'
import { ClientOnly } from '@/components/ClientOnly'
import { useThemeMode } from '@/hooks/state/useThemeMode'
import { UserSessionContext, useUserSessionStore } from '@/hooks/state/useSession'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //@ts-ignore
  // const {session} = useUserSessionStore((state) => state.session)
  const userPreference = useUserPreferenceStore((state) => state.userPreference)
  const {themeMode} = useThemeMode()
  return (
    // <UserSessionContext.Provider value={session}>
      <UserPreferenceContext.Provider value={userPreference}>
        <html lang={"en"} className={themeMode}>
          <body className={inter.className}>
          <Theme>
          <main className="flex min-h-screen flex-col">
                <Header />
                <section className='grow justify-center flex px-2 py-4'>
                  {children}
                </section>
            </main>
          </Theme>
          </body>
        </html>
      </UserPreferenceContext.Provider>
    // </UserSessionContext.Provider>
  )
}
