export function Features() {
  const features = [
    {
      title: 'Natural Language to Game Prototypes',
      description: 'Describe your game idea in plain English and watch it become a playable prototype instantly.',
      icon: '🎮',
    },
    {
      title: 'AI-Assisted Blender Asset Creation',
      description: '3D models, textures, and animations generated automatically by AI.',
      icon: '🎨',
    },
    {
      title: 'Instant Unity/Unreal Setup Guidance',
      description: 'Export your creations with automatic integration guides for Unity and Unreal Engine.',
      icon: '⚙️',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-card/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to build professional games faster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border border-border bg-background/50 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
