import { useState } from 'react';
import { Mail, Lock, Key } from 'lucide-react';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[0-9]).{8,}$/.test(password);
  };

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      setMessage('Enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('Password must be 8+ characters and include a number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.1secstory.com/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      setMessage(data.message || 'OTP Sent to your email');
      setShowOtpField(true);
    } catch {
      setMessage('Server error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp) {
      setMessage('Enter the OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.1secstory.com/verify_pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          otp
        })
      });

      const data = await response.json();
      setMessage(data.message || 'Password Reset Complete');

      if (data.is_reset_complete === true) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch {
      setMessage('Server error');
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">Reset Password</h1>
          <p className="text-gray-500 text-sm">Enter your email and new password</p>
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
                disabled={showOtpField}
                className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={showOtpField}
                className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Password must be 8+ characters & include at least 1 number
            </p>
          </div>

          {/* OTP Field - Shown after sending OTP */}
          {showOtpField && (
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
          )}

          {/* Button */}
          {!showOtpField ? (
            <button
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base"
            >
              {isLoading ? 'Sending OTP...' : 'Get OTP'}
            </button>
          ) : (
            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          )}

          {/* Message */}
          {message && (
            <div className={`text-center text-sm font-medium ${
              message.includes('success') || message.includes('Complete') || message.includes('Sent') ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </div>
          )}

          {/* Back to Login Link */}
          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
