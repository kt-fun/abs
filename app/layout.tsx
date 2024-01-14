import { Inter } from 'next/font/google'
import './globals.css'

import { Header } from '@/components/header/Header'
import * as React from "react";
import {ThemeProvider} from "@/components/ThemeProvider";
import {UserPreferenceProvider} from "@/components/UserPreferenceProvider";
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserPreferenceProvider>
      <html lang={"en"}>
      <body className={inter.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <main className="flex min-h-screen flex-col">
          <Header/>
          <section className='grow justify-center flex px-2 py-4'>
            {children}
          </section>
        </main>
      </ThemeProvider>
      </body>
    </html>
</UserPreferenceProvider>
)
}
