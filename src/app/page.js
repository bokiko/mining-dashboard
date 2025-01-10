import CryptoTable from '../components/CryptoTable'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-white">
      <Suspense fallback={<div>Loading...</div>}>
        <CryptoTable />
      </Suspense>
    </main>
  )
}
