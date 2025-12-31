import { useState, useEffect } from 'react';
import { User, Briefcase, MessageSquare, Phone, Mail, Linkedin, Globe, CreditCard, Key, Link2 } from 'lucide-react';

interface ProfileData {
  display_name: string | null;
  headline: string | null;
  micro_facts: string | null;
  whatsapp: string | null;
  phone: string | null;
  email_public: string | null;
  linkedin: string | null;
  website: string | null;
  payment_link: string | null;
  nfc_pin_hash: string | null;
  qr_link: string | null;
}

function EditProfile() {
  const [sessionCardId, setSessionCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<ProfileData>({
    display_name: '',
    headline: '',
    micro_facts: '',
    whatsapp: '',
    phone: '',
    email_public: '',
    linkedin: '',
    website: '',
    payment_link: '',
    nfc_pin_hash: '',
    qr_link: ''
  });

  useEffect(() => {
    loadSessionCard();
  }, []);

  const loadSessionCard = async () => {
    try {
      const response = await fetch('https://api.1secstory.com/get_session_card', {
        credentials: 'include'
      });
      const data = await response.json();

      if (!data.success) {
        window.location.href = '/login';
        return;
      }

      setSessionCardId(data.card_id);
      await loadProfile(data.card_id);
    } catch (error) {
      console.error('Failed to load session', error);
      window.location.href = '/login';
    }
  };

  const loadProfile = async (cardId: string) => {
    try {
      const response = await fetch('https://api.1secstory.com/get_public_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: cardId }),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success && data.data) {
        setFormData({
          display_name: data.data.display_name || '',
          headline: data.data.headline || '',
          micro_facts: data.data.micro_facts || '',
          whatsapp: data.data.whatsapp || '',
          phone: data.data.phone || '',
          email_public: data.data.email_public || '',
          linkedin: data.data.linkedin || '',
          website: data.data.website || '',
          payment_link: data.data.payment_link || '',
          nfc_pin_hash: data.data.nfc_pin_hash || '',
          qr_link: data.data.qr_link || ''
        });
      }
    } catch (error) {
      console.error('Failed to load profile', error);
      setMessage('Failed to load profile data');
    }
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getValueOrNull = (value: string) => {
    return value.trim() === '' ? null : value.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sessionCardId) {
      setMessage('Session expired. Please login again.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const payload = {
        card_id: sessionCardId,
        display_name: getValueOrNull(formData.display_name || ''),
        headline: getValueOrNull(formData.headline || ''),
        micro_facts: getValueOrNull(formData.micro_facts || ''),
        whatsapp: getValueOrNull(formData.whatsapp || ''),
        phone: getValueOrNull(formData.phone || ''),
        email_public: getValueOrNull(formData.email_public || ''),
        linkedin: getValueOrNull(formData.linkedin || ''),
        website: getValueOrNull(formData.website || ''),
        payment_link: getValueOrNull(formData.payment_link || ''),
        nfc_pin_hash: getValueOrNull(formData.nfc_pin_hash || ''),
        qr_link: getValueOrNull(formData.qr_link || '')
      };

      const response = await fetch('https://api.1secstory.com/change_public_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        if (payload.qr_link) {
          try {
            await fetch('https://api.1secstory.com/add_redirect', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ link: payload.qr_link }),
              credentials: 'include'
            });
          } catch (error) {
            console.error('Failed to update redirect', error);
          }
        }

        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to update profile', error);
      setMessage('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!sessionCardId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-8 px-4">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 rounded-full blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-tl from-blue-200 via-cyan-200 to-blue-100 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gray-300 mb-3 md:mb-4">
            <span className="text-xl md:text-2xl font-bold text-gray-700">1</span>
            <span className="text-[10px] md:text-xs text-gray-500">sec</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">Edit Profile</h1>
          <p className="text-gray-500 text-sm">Update your public card information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.display_name || ''}
                  onChange={(e) => handleChange('display_name', e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.headline || ''}
                  onChange={(e) => handleChange('headline', e.target.value)}
                  placeholder="Your Title"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Micro Facts</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={formData.micro_facts || ''}
                onChange={(e) => handleChange('micro_facts', e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.whatsapp || ''}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  placeholder="+1234567890"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1234567890"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Public Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email_public || ''}
                onChange={(e) => handleChange('email_public', e.target.value)}
                placeholder="public@example.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.linkedin || ''}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="yourwebsite.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Link</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.payment_link || ''}
                onChange={(e) => handleChange('payment_link', e.target.value)}
                placeholder="Payment link URL"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NFC PIN Hash</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.nfc_pin_hash || ''}
                  onChange={(e) => handleChange('nfc_pin_hash', e.target.value)}
                  placeholder="NFC PIN Hash"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">QR Link</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.qr_link || ''}
                  onChange={(e) => handleChange('qr_link', e.target.value)}
                  placeholder="QR redirect link"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base"
          >
            {isLoading ? 'Saving Changes...' : 'Save Changes'}
          </button>

          {message && (
            <div className={`text-center text-sm font-medium ${
              message.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
