'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AccessPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate validation
    setTimeout(() => {
      if (password === 'Mike') {
        localStorage.setItem('gameflux_access', 'true')
        router.push('/dashboard')
      } else {
        setError('Invalid password. Try again.')
        setPassword('')
      }
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="text-3xl font-bold text-primary mb-2">GameFlux AI</div>
            <p className="text-muted-foreground text-sm">Enter workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Access Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm p-3 bg-destructive/10 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Authenticating...' : 'Access Dashboard'}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Demo access • Password: Mike
          </p>
        </div>
      </div>
    </div>
  )
}
