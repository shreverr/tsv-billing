import { ThemeProvider } from '@/components/providers/ThemeProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import NavBar from '@/components/NavBar'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TSV Billing',
  description: 'TSV Billing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        // disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
