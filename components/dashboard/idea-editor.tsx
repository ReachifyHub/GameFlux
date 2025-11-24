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

  // Replace with your actual Hugging Face model name
  const HF_MODEL_NAME = "your-username/your-model-name"
  const HF_API_TOKEN = process.env.NEXT_PUBLIC_HF_TOKEN || "your_huggingface_token"

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

  const queryHuggingFace = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${HF_MODEL_NAME}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HF_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 500,
              temperature: 0.7,
              do_sample: true,
              return_full_text: false
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle different response formats from Hugging Face
      if (Array.isArray(result) && result[0] && result[0].generated_text) {
        return result[0].generated_text;
      } else if (result.generated_text) {
        return result.generated_text;
      } else {
        console.log('Raw response:', result);
        return "I couldn't generate a response. Please try again.";
      }
    } catch (error) {
      console.error('Error calling Hugging Face:', error);
      throw error;
    }
  };

  const handleGenerateAI = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    setAiResult('');

    try {
      // Create a detailed prompt for game development
      const prompt = `As a game development AI assistant, analyze this game idea and provide a comprehensive prototype plan:

Game Title: ${title}
Game Description: ${description}

Please provide a structured response with:
1. Game Concept Analysis
2. Recommended Game Engine and Tools
3. Development Timeline (traditional vs AI-assisted)
4. Required Assets and Resources
5. Technical Implementation Steps
6. Monetization and Marketing Suggestions
7. Potential Challenges and Solutions

Format the response in a clear, markdown-like structure that's easy to read.`;

      const result = await queryHuggingFace(prompt);
      setAiResult(result);
    } catch (error) {
      console.error('Generation failed:', error);
      setAiResult(`❌ Error generating response: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease check:\n1. Your Hugging Face token is valid\n2. The model is available and loaded\n3. Your internet connection`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveIdea = () => {
    if (!currentIdea) return;

    const ideas = JSON.parse(localStorage.getItem('gameflux_ideas') || '[]');
    const updated = ideas.map((idea: Idea) =>
      idea.id === currentIdea.id
        ? { ...idea, title, description }
        : idea
    );
    localStorage.setItem('gameflux_ideas', JSON.stringify(updated));
    setCurrentIdea({ ...currentIdea, title, description });
  };

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
            {isGenerating ? 'Generating with AI...' : 'Generate AI Prototype'}
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
          <p className="text-sm text-muted-foreground mt-1">
            Powered by your Hugging Face model
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isGenerating ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="text-muted-foreground">Generating AI response...</p>
              </div>
            </div>
          ) : aiResult ? (
            <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {aiResult}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-muted-foreground">
              <div>
                <div className="text-4xl mb-4">🤖</div>
                <p>Enter your game idea and generate AI-powered analysis</p>
                <p className="text-sm mt-2">Uses your custom Hugging Face model</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
    }
