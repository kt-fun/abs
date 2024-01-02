"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import './globals.css'
import { Theme } from '@radix-ui/themes'

import { UserPreferenceContext, useUserPreferenceStore } from '@/state/userPrefence'
import { Header } from '@/components/Header'
import { ClientOnly } from '@/components/ClientOnly'
import { useThemeMode } from '@/state/useThemeMode'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userPreference = useUserPreferenceStore((state) => state.userPreference)
  const {themeMode} = useThemeMode()
  return (
    <UserPreferenceContext.Provider value={userPreference}>
      <html lang={"en"} className={themeMode}>
        <body className={inter.className}>
        <Theme

        >
        <main className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-700">
            <ClientOnly>
              <Header />
              <section className='items-center justify-between px-24 xl:px-64 lg:px-48 py-4'>
                {children}
              </section>
            </ClientOnly>
          </main>
        </Theme>
        </body>
      </html>
    </UserPreferenceContext.Provider>
  )
}
