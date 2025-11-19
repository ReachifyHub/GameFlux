'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Settings } from 'lucide-react'

interface Idea {
  id: string
  title: string
  description: string
}

interface SidebarProps {
  onSelectIdea?: (idea: Idea) => void
}

export function Sidebar({ onSelectIdea }: SidebarProps) {
  const [ideas, setIdeas] = useState<Idea[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('gameflux_ideas')
    if (saved) {
      setIdeas(JSON.parse(saved))
    }
  }, [])

  const handleNewIdea = () => {
    const newIdea: Idea = {
      id: Date.now().toString(),
      title: 'New Idea',
      description: '',
    }
    const updated = [newIdea, ...ideas]
    setIdeas(updated)
    localStorage.setItem('gameflux_ideas', JSON.stringify(updated))
    onSelectIdea?.(newIdea)
  }

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border">
        <Button
          onClick={handleNewIdea}
          className="w-full gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          New Idea
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="p-2 space-y-1">
          <div className="px-3 py-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Saved Ideas</span>
            {ideas.length > 0 && (
              <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                {ideas.length}
              </span>
            )}
          </div>

          {ideas.map((idea) => (
            <div
              key={idea.id}
              onClick={() => onSelectIdea?.(idea)}
              className="px-3 py-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors text-sm truncate"
            >
              {idea.title}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-2 border-t border-border">
        <div className="px-3 py-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
        </div>
      </div>
    </div>
  )
}
