'use client'
import QueryClientProvider from "./QueryProvider";
import {ThemeProvider} from "@/components/providers/ThemeProvider";
import * as React from "react";
const Provider = (
  {
    children
  }:{
    children: React.ReactNode;
  }
) => {

  return (
    <QueryClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>

  )
}

export default Provider