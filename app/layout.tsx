import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sandy Abasman - Software Developer Portfolio',
  description: '3D Portfolio of Sandy Abasman, Software Developer and UI/UX Designer',
  icons: {
    icon: '/my-social-photo2.jpeg',
    shortcut: '/my-social-photo2.jpeg',
    apple: '/my-social-photo2.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/my-social-photo2.jpeg" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

