import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      description: 'Perfect for solo creators',
      features: [
        '10 AI game prototypes/month',
        'Basic asset generation',
        'Community support',
        'Standard export options',
      ],
    },
    {
      name: 'Pro',
      price: '$99',
      description: 'For growing studios',
      popular: true,
      features: [
        'Unlimited prototypes',
        'Advanced AI features',
        'Priority support',
        'All export formats',
        'Team collaboration',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large teams',
      features: [
        'Everything in Pro',
        'Custom AI models',
        'Dedicated support',
        'On-premise deployment',
        'API access',
      ],
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-muted-foreground text-lg">
            Start free, scale as you grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-8 border transition-all duration-300 ${
                plan.popular
                  ? 'border-primary bg-primary/5 md:scale-105 shadow-xl shadow-primary/20'
                  : 'border-border bg-card hover:border-accent/50'
              }`}
            >
              {plan.popular && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>

              <Button className="w-full mb-6" variant={plan.popular ? 'default' : 'outline'}>
                Get Started
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
