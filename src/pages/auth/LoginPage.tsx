import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailLogin = () => {
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    toast.success('Logged in successfully!');
    navigate('/dashboard');
  };

  const handlePhoneLogin = () => {
    if (!showOtp) { setShowOtp(true); toast.success('OTP sent!'); return; }
    toast.success('Logged in successfully!');
    navigate('/dashboard');
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
          <h1 className="font-display text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your Gym Cafe account</p>
        </div>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex gap-2 mb-6">
              <Button variant={mode === 'email' ? 'default' : 'outline'} className="flex-1" onClick={() => { setMode('email'); setShowOtp(false); }}>
                <Mail className="h-4 w-4 mr-2" /> Email
              </Button>
              <Button variant={mode === 'phone' ? 'default' : 'outline'} className="flex-1" onClick={() => { setMode('phone'); setShowOtp(false); }}>
                <Smartphone className="h-4 w-4 mr-2" /> Phone
              </Button>
            </div>

            {mode === 'email' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <div className="relative">
                    <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="you@email.com" className="pl-9" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Password</label>
                  <div className="relative">
                    <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input type={showPassword ? 'text' : 'password'} placeholder="Enter password" className="pl-9 pr-10" value={password} onChange={e => setPassword(e.target.value)} />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <Button variant="hero" className="w-full" onClick={handleEmailLogin}>
                  Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone Number</label>
                  <Input placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                {showOtp && (
                  <div>
                    <label className="text-sm font-medium mb-1 block">Enter OTP</label>
                    <Input placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} className="tracking-widest text-center text-lg" />
                  </div>
                )}
                <Button variant="hero" className="w-full" onClick={handlePhoneLogin}>
                  {showOtp ? 'Verify & Login' : 'Send OTP'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex items-center gap-3 my-6">
              <Separator className="flex-1" /><span className="text-xs text-muted-foreground">or</span><Separator className="flex-1" />
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => { toast.success('Google login'); navigate('/dashboard'); }}>
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
}
