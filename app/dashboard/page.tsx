'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Sidebar } from '@/components/dashboard/sidebar'
import { IdeaEditor } from '@/components/dashboard/idea-editor'

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasAccess = localStorage.getItem('gameflux_access')
    if (hasAccess === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/access')
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <DashboardShell>
      <div className="flex gap-6 h-full">
        <Sidebar />
        <IdeaEditor />
      </div>
    </DashboardShell>
  )
}
