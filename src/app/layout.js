import './globals.css';

export const metadata = {
  title: 'Mining Dashboard',
  description: 'Cryptocurrency Mining Information Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 text-gray-800 font-sans antialiased">
        <header className="bg-blue-900 text-white py-4 flex justify-between items-center px-6">
          <h1>Mining Dashboard</h1>
          {/* Navigation can be added here */}
        </header>

        <main>{children}</main>

        <footer className="bg-blue-800 text-white py-4 text-center mt-auto px-6">
          &copy; 2023 Mining Dashboard. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
