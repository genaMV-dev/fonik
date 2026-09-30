import type { Metadata } from "next"
import { Lato, Poppins, Gothic_A1 } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header/Header"
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider"
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider"

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-family",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--second-family",
})

const gothicA1 = Gothic_A1({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--third-family",
})

export const metadata: Metadata = {
  title: "Fonik",
  description: "Buying and selling smartphones",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${poppins.variable} ${gothicA1.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TanStackProvider>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="light"
            enableSystem
          >
            <Header />
            {children}
          </ThemeProvider>
        </TanStackProvider>
      </body>
    </html>
  )
}