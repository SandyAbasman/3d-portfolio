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
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

