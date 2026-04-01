import type { Metadata, Viewport } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Athlete Dashboard",
  description: "Wearable fitness platform dashboard for performance monitoring",
}

export const viewport: Viewport = {
  themeColor: "#0f1318",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
