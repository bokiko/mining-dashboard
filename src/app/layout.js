import './globals.css'

export const metadata = {
  title: 'Mining Dashboard',
  description: 'Cryptocurrency Mining Information Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
