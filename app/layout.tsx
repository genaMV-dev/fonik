import type { Metadata } from "next"
import { Lato, Poppins, Gothic_A1 } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header/Header"

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
  title: "Fomik",
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
    >
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
