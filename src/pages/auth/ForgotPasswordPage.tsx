import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!email) { toast.error('Please enter your email'); return; }
    setSent(true);
    toast.success('Reset link sent!');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-sunrise">
              <span className="text-xl font-bold text-primary-foreground">7</span>
            </div>
          </Link>
          <h1 className="font-display text-3xl font-bold">{sent ? 'Check Your Email' : 'Forgot Password?'}</h1>
          <p className="text-muted-foreground mt-1">
            {sent ? `We've sent a reset link to ${email}` : "No worries, we'll send you a reset link"}
          </p>
        </div>

        <Card className="shadow-card">
          <CardContent className="p-6">
            {sent ? (
              <div className="text-center space-y-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                  <CheckCircle className="h-16 w-16 text-secondary mx-auto" />
                </motion.div>
                <p className="text-sm text-muted-foreground">Didn't receive the email? Check your spam folder or</p>
                <Button variant="outline" className="w-full" onClick={() => { setSent(false); toast.success('Resent!'); }}>Resend Email</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Email Address</label>
                  <div className="relative">
                    <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="you@email.com" className="pl-9" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
                <Button variant="hero" className="w-full" onClick={handleSubmit}>
                  Send Reset Link <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center mt-6">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back to Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
