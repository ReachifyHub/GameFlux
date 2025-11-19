'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'

interface Idea {
  id: string
  title: string
  description: string
}

export function IdeaEditor() {
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('gameflux_ideas')
    if (saved) {
      const ideas = JSON.parse(saved)
      if (ideas.length > 0) {
        setCurrentIdea(ideas[0])
        setTitle(ideas[0].title)
        setDescription(ideas[0].description)
      }
    }
  }, [])

  const handleGenerateAI = async () => {
    if (!description.trim()) return

    setIsGenerating(true)
    // Replace this with actual API call to your AI service
    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockResult = `🎮 Game Prototype: "${title}"

📋 Analysis:
- Game Concept: ${description.substring(0, 50)}...
- Recommended Engine: Unity 3D
- Estimated Dev Time (traditional): 3-4 weeks
- With GameFlux AI: 2-3 days

🎨 Generated Assets:
✓ 12 3D character models
✓ 8 environment sets
✓ 24 animation sequences
✓ 4 background music tracks

⚙️ Next Steps:
1. Export character models to Blender
2. Import environment into Unity
3. Set up game mechanics framework
4. Test multiplayer networking

💡 AI Suggestions:
- Consider adding a progression system
- Implement seasonal content updates
- Add social features for engagement`

    setAiResult(mockResult)
    setIsGenerating(false)
  }

  const handleSaveIdea = () => {
    if (!currentIdea) return

    const ideas = JSON.parse(localStorage.getItem('gameflux_ideas') || '[]')
    const updated = ideas.map((idea: Idea) =>
      idea.id === currentIdea.id
        ? { ...idea, title, description }
        : idea
    )
    localStorage.setItem('gameflux_ideas', JSON.stringify(updated))
    setCurrentIdea({ ...currentIdea, title, description })
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-sm font-medium mb-2">Game Idea Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Space Adventure RPG"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Describe Your Game Idea
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell me about your game... What's the setting? Genre? Mechanics? Characters?"
              className="w-full h-40 resize-none"
            />
          </div>

          <Button
            onClick={handleGenerateAI}
            disabled={isGenerating || !description.trim()}
            className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Generate AI Prototype'}
          </Button>

          <Button
            onClick={handleSaveIdea}
            variant="outline"
            className="w-full"
          >
            Save Idea
          </Button>
        </div>
      </div>

      {/* Output Section */}
      <div className="flex-1 flex flex-col bg-card/50 overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold">AI Generated Output</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {aiResult ? (
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
              {aiResult}
            </pre>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-muted-foreground">
              <div>
                <div className="text-4xl mb-4">🤖</div>
                <p>Generate an AI result to see the output here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
