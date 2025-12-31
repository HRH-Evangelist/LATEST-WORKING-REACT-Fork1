import { useState, useEffect } from 'react';
import { Mail, Lock, Key, Hash } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [cardId, setCardId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const card = params.get('card_id');
    setCardId(card);

    if (!card) {
      setMessage('❌ Missing card_id in URL');
    }
  }, []);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[0-9]).{8,}$/.test(password);
  };

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      setMessage('❌ Enter a valid email');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('❌ Password must be 8+ characters and include a number');
      return;
    }

    if (!cardId) {
      setMessage('❌ Missing card_id in URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.1secstory.com/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, card_id: cardId })
      });

      const data = await response.json();
      setMessage(data.message || '✅ OTP Sent');
      setShowOtpFields(true);
    } catch {
      setMessage('❌ Server error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (secretKey.length !== 26) {
      setMessage('❌ Secret key must be exactly 26 characters');
      return;
    }

    if (!cardId) {
      setMessage('❌ Missing card_id in URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.1secstory.com/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          otp,
          secret_key: secretKey,
          card_id: cardId
        })
      });

      const data = await response.json();
      setMessage(data.message || '✅ Registration Complete');

      if (data.is_reg_complete === true) {
        let seconds = 5;
        const timer = setInterval(() => {
          setMessage(`✅ Registration Successful. Redirecting to login in ${seconds}...`);
          seconds--;

          if (seconds < 0) {
            clearInterval(timer);
            window.location.href = '/login';
          }
        }, 1000);
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
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gray-300 mb-3 md:mb-4">
            <span className="text-xl md:text-2xl font-bold text-gray-700">1</span>
            <span className="text-[10px] md:text-xs text-gray-500">sec</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">1SecStory</h1>
          <p className="text-gray-500 text-sm">Your story, One tap away</p>
        </div>

        {/* Form */}
        <div className="space-y-4 md:space-y-5">
          {/* Card ID - Read only display */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card ID</label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={cardId || ''}
                readOnly
                placeholder="Card ID from URL"
                className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 focus:outline-none text-base"
              />
            </div>
          </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
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
            <p className="mt-2 text-xs text-gray-500">
              Password must be 8+ characters & include at least 1 number
            </p>
          </div>

          {/* OTP Field - Shown after sending OTP */}
          {showOtpFields && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                  />
                </div>
              </div>

              {/* Secret Key Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter Secret Key (26 chars)"
                    maxLength={26}
                    className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Must be exactly 26 characters
                </p>
              </div>
            </>
          )}

          {/* Button */}
          {!showOtpFields ? (
            <button
              onClick={handleSendOtp}
              disabled={isLoading || !cardId}
              className="w-full py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base"
            >
              {isLoading ? 'Sending...' : 'Continue to Verification'}
            </button>
          ) : (
            <button
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          )}

          {/* Message */}
          {message && (
            <div className={`text-center text-sm font-medium ${
              message.includes('❌') ? 'text-red-600' : 'text-green-600'
            }`}>
              {message}
            </div>
          )}

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600">
            Already activated?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
