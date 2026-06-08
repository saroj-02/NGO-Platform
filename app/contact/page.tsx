import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHeader } from '@/components/page-header'
import { ContactForm } from '@/components/contact-form'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata = {
  title: 'Contact — HFS',
  description:
    'Get in touch with the HFS (Help For Smile) team. We respond within one business day.',
}

const contactMethods = [
  {
    icon: Mail,
    title: 'Email us',
    value: 'hello@helpforsmile.org',
    detail: 'For general questions and support',
  },
  {
    icon: Phone,
    title: 'Call us',
    value: '+91 98765 43210',
    detail: 'Mon–Fri, 9am–6pm IST',
  },
  {
    icon: MapPin,
    title: 'Visit us',
    value: 'SG Road, Ahmedabad, Gujarat, India',
    detail: 'By appointment',
  },
]

const faqs = [
  {
    q: 'How much of my donation reaches the field?',
    a: '94% of every rupee goes directly to program delivery. The remaining 6% covers essential operations and is fully disclosed in our annual report.',
  },
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes. HFS is a registered nonprofit. You will receive an instant tax receipt by email for every gift.',
  },
  {
    q: 'Can I choose which campaign my gift supports?',
    a: 'Absolutely. You can give to a specific campaign or to our general fund, where we direct resources to the greatest needs.',
  },
  {
    q: 'How do I volunteer or partner with you?',
    a: 'Visit our Volunteer page to sign up, or email partnerships@helpforsmile.org for organizational collaborations.',
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <PageHeader
          eyebrow="Contact"
          title="We would love to hear from you"
          description="Questions, partnerships, press, or just want to say hello? Reach out and our team will respond within one business day."
        />

        <section className="py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="grid gap-4 sm:grid-cols-1">
                {contactMethods.map((method) => (
                  <div
                    key={method.title}
                    className="flex items-start gap-4 rounded-2xl bg-card p-5 ring-1 ring-border"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <method.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">
                        {method.title}
                      </h3>
                      <p className="text-sm font-medium text-foreground">
                        {method.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {method.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
                  <MessageCircle className="size-5 text-brand" />
                  Frequently asked
                </h2>
                <Accordion className="mt-4">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left font-medium text-foreground">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
