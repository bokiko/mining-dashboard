'use client';

import CryptoTable from '../components/CryptoTable';
// Ensure global styles are imported
import '../src/styles/globals.css'; 

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 max-w-prose mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Cryptocurrency Mining Dashboard</h2>
        
        {/* CryptoTable is your main component, ensure it's styled well */}
        <CryptoTable />
      </div>
    </main>
  );
}
