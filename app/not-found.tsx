import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest mb-6">404</p>
        <h1 className="brutal-display text-7xl sm:text-9xl">
          <span className="brutal-marker">Not Here.</span>
        </h1>
        <p className="mt-8 max-w-md mx-auto">The page you’re looking for doesn’t exist.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center font-display uppercase text-sm tracking-tight px-6 py-3 bg-ink text-cream brutal-border brutal-shadow brutal-press"
        >
          Go home
        </Link>
      </div>
    </main>
  )
}
