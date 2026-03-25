import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How does Gym Cafe work?', a: 'Pre-order your breakfast the night before, pick it up in under 2 minutes at your metro station exit. Fresh, gut-friendly, and ready to go.' },
  { q: 'When should I place my order?', a: 'Orders must be placed at least 24 hours in advance. This ensures freshly prepared meals at your chosen pickup time.' },
  { q: 'What metro stations do you serve?', a: 'We currently serve Rajiv Chowk, Huda City Centre, Kashmere Gate, Hauz Khas, and Noida Sector 18. More stations launching soon!' },
  { q: 'How do subscriptions work?', a: 'Choose from 10, 20, or 30 meals per month. Schedule your meals flexibly, pause anytime, and enjoy savings of up to 30% vs à la carte.' },
  { q: 'Can I pause or cancel my subscription?', a: 'Yes! You can pause your subscription anytime from your dashboard. Cancellations are processed with a pro-rated refund for unused meals.' },
  { q: 'What if I miss my pickup?', a: 'If you miss your pickup window, unfortunately the meal cannot be rescheduled. However, subscription meals roll over for 48 hours.' },
  { q: 'Is the food vegetarian?', a: 'Most of our menu is vegetarian. Non-veg items are clearly labeled. We also have vegan and gluten-free options.' },
  { q: 'How do referrals work?', a: 'Share your referral code. When a friend subscribes, you both get ₹50 credit. Top referrers earn bonus rewards each month.' },
  { q: 'What is the Beta Eater program?', a: 'Beta Eaters are selected food enthusiasts who get free meals in exchange for honest feedback and social media posts.' },
  { q: 'Do you have an FSSAI license?', a: 'Yes, we are fully FSSAI licensed. Our license number is displayed on all packaging and on our FSSAI License page.' },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12 max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-center mb-2">Frequently Asked Questions</h1>
        <p className="text-center text-muted-foreground mb-8">Everything you need to know about Gym Cafe.</p>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
              <AccordionTrigger className="font-display font-semibold text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
