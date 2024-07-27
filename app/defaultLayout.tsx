import { Inter } from 'next/font/google'
import './globals.css'

import Header from './(header)'
import * as React from "react";
import {ThemeProvider} from "@/components/providers/ThemeProvider";
import {UserPreferenceProvider} from "@/components/providers/UserPreferenceProvider";
import {getLocale} from "@/app/i18n/server";
import LocaleProvider from '@/components/providers/i18nProvider';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  const locale = getLocale();
  return (
    <UserPreferenceProvider>
      <html lang={locale}>
      <body className={inter.className}>
      <LocaleProvider value={locale}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <main className="flex min-h-screen flex-col bg-base-light dark:bg-base-dark">
            <Header/>
            <section className='grow justify-center flex'>
              {children}
            </section>
          </main>
        </ThemeProvider>
      </LocaleProvider>
      </body>
      </html>
    </UserPreferenceProvider>

  )
}
