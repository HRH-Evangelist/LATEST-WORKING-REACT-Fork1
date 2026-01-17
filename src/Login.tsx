import { useState } from 'react';
import { Mail, Lock, CreditCard, Loader2 } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cardId, setCardId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setMessage('Enter a valid email address');
      return;
    }

    if (!password) {
      setMessage('Enter your password');
      return;
    }

    if (!cardId.startsWith('TS')) {
      setMessage('Invalid card ID format');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.1secstory.com/verify_login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, card_id: cardId })
      });

      const data = await response.json();

      if (data.is_login_success) {
        setMessage('Login successful!');
        setTimeout(() => {
          window.location.href = '/edit_profile';
        }, 1000);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch {
      setMessage('❌ Server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 rounded-full blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-tl from-blue-200 via-cyan-200 to-blue-100 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6 md:mb-8">
          {/* Logo */}
          <div className="inline-block mb-3 md:mb-4">
            <img src="/artboard_2_1.png" alt="1SecStory" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">1SecStory</h1>
          <p className="text-gray-500 text-sm">Welcome back! Sign in to continue</p>
        </div>

        {/* Form */}
        <div className="space-y-4 md:space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
              />
            </div>
          </div>

          {/* Card ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card ID</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                placeholder="Enter Card ID (ex: TS1234)"
                className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Card ID must start with "TS"
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98] text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md text-base flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Message */}
          {message && (
            <div className={`text-center text-sm font-medium ${
              message.includes('❌') || message.includes('Invalid') ? 'text-red-600' : 'text-green-600'
            }`}>
              {message}
            </div>
          )}

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Register here
            </a>
          </p>

          {/* Forgot Password Link */}
          <p className="text-center text-sm text-gray-600">
            Forgot your password?{' '}
            <a href="/reset-password" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Reset it here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
