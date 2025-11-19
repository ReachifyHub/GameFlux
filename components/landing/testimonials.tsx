export function Testimonials() {
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Indie Game Developer',
      content: 'GameFlux AI cut my prototyping time by 80%. I went from concept to playable demo in hours instead of weeks.',
      avatar: '👨‍💻',
    },
    {
      name: 'Maya Patel',
      role: 'Creative Director, Studio X',
      content: 'The AI asset generation is incredible. Our team can focus on game design instead of getting bogged down in asset creation.',
      avatar: '👩‍🎨',
    },
    {
      name: 'James Wilson',
      role: 'Startup Founder',
      content: 'We validated our game idea and secured funding in 2 weeks. This tool is a game-changer for entrepreneurs.',
      avatar: '🧑‍💼',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-card/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Creators</h2>
          <p className="text-muted-foreground text-lg">
            Join hundreds of game developers building amazing experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
