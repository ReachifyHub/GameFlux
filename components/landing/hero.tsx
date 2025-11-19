import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-32 md:pt-32 md:pb-48">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
            <span className="text-xs font-semibold text-accent">NEW</span>
            <span className="text-xs text-muted-foreground">
              AI-Powered Game Prototyping
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
            Build Games With AI
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Like a Complete Studio
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Transform your game ideas into playable prototypes in minutes. 
            Powered by advanced AI to accelerate your creative vision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/access">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Enter Workspace
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          <div className="pt-8 grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold">50+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Active Builders</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">500+</div>
              <div className="text-xs md:text-sm text-muted-foreground">Games Created</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">10M+</div>
              <div className="text-xs md:text-sm text-muted-foreground">API Calls/Mo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
