import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const quickReplies: Record<string, string> = {
  'what is gym cafe': 'Gym Cafe is a metro-adjacent healthy breakfast platform. We serve gut-friendly, persona-matched breakfasts at metro exits across Delhi NCR. Pre-order by 10 PM, pick up in 2 minutes the next morning! 🚇🥗',
  'how to order': 'Ordering is simple! 1) Browse our menu at /menu 2) Add items to cart 3) Choose your pickup station & time 4) Pay via UPI/card 5) Show QR at the counter next morning. Done in 2 mins! ⚡',
  'subscription': 'We have 5 plans: Sprout Saver (₹899/10 meals), Regular Fix (₹1599/20 meals), Munch Legend (₹2099/30 meals), Breakfast Freak (₹2799/30 premium), and Crazy People Club (₹3999/unlimited). All include pause/cancel anytime!',
  'stations': 'We currently serve at 5 metro stations: Rajiv Chowk, Huda City Centre, Kashmere Gate, Hauz Khas, and Noida Sector 18. More coming soon! 🚉',
  'beta eater': 'Beta Eaters are our food-testing community! Apply at /beta/apply. You get 3 free meals/month, early access to new items, and can vote on upcoming menu additions. Must post 2x/week on Instagram. 📸',
  'refund': 'Refunds are processed within 3-5 business days. For orders cancelled 24+ hours before pickup, you get a full refund. Within 24 hours, you receive store credit. For quality issues, we refund 100% + a free meal on us!',
  'partner': 'Want to run a Gym Cafe station? Visit /partner to apply! Investment starts at ₹2L with 40% margins and full brand support. We handle tech, menu, and supply chain.',
  'default': "Thanks for your message! 😊 I'm a demo chatbot with limited knowledge. For detailed help, please visit our Help Center at /help or contact us at hello@7amclub.in. Our team usually responds within 24 hours!",
};

function getBotReply(msg: string): string {
  const lower = msg.toLowerCase();
  for (const [key, reply] of Object.entries(quickReplies)) {
    if (key === 'default') continue;
    if (lower.includes(key) || key.split(' ').some(w => w.length > 3 && lower.includes(w))) {
      return reply;
    }
  }
  return quickReplies.default;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi! 👋 I'm the Gym Cafe assistant. Ask me about our menu, subscriptions, stations, or anything else!", sender: 'bot' },
  ]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    const reply = getBotReply(input);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
    }, 800);
  };

  return (
    <>
      {/* Chat Bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-sunrise flex items-center justify-center shadow-elevated hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-elevated flex flex-col overflow-hidden" style={{ height: '480px' }}>
          {/* Header */}
          <div className="gradient-sunrise p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary-foreground" />
              <div>
                <p className="text-sm font-bold text-primary-foreground">7AM Assistant</p>
                <p className="text-[10px] text-primary-foreground/70">Usually replies instantly</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}><X className="h-5 w-5 text-primary-foreground" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 flex gap-1 overflow-x-auto">
            {['Menu', 'Subscription', 'Stations', 'Refund'].map(q => (
              <button key={q} onClick={() => { setInput(q); }}
                className="px-3 py-1 text-xs bg-muted rounded-full hover:bg-muted/80 whitespace-nowrap shrink-0">{q}</button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              className="flex-1"
            />
            <Button variant="hero" size="icon" onClick={send}><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </>
  );
}
