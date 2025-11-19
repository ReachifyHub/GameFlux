import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <span className="text-lg font-bold text-primary">⚡</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline">GameFlux AI</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/access">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
