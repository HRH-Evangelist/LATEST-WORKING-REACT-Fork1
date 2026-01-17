import { useState, useEffect } from 'react';
import { User, Briefcase, MessageSquare, Mail, Linkedin, Globe, CreditCard, Link2, Loader2, Eye, X, Phone, MessageCircle, ChevronRight, Share2, Bookmark } from 'lucide-react';
import PhoneInput from './PhoneInput';

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
  const [showPreview, setShowPreview] = useState(false);
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
    nfc_pin_hash: null,
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
        nfc_pin_hash: formData.nfc_pin_hash,
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
        setTimeout(() => {
          window.location.href = `/user-nfc?id=${sessionCardId}`;
        }, 1000);
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
          <div className="inline-block mb-3 md:mb-4">
            <img src="/artboard_2_1.png" alt="1SecStory" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">Edit Story</h1>
          <p className="text-gray-500 text-sm">your identity in 1 sec</p>
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
                <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
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
            <label className="block text-sm font-medium text-gray-700 mb-2">My Story</label>
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
            <PhoneInput
              value={formData.whatsapp || ''}
              onChange={(value) => handleChange('whatsapp', value)}
              label="WhatsApp"
              placeholder="1234567890"
            />

            <PhoneInput
              value={formData.phone || ''}
              onChange={(value) => handleChange('phone', value)}
              label="Phone"
              placeholder="1234567890"
            />
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

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex-1 py-3.5 md:py-4 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 active:scale-[0.98] text-white font-medium rounded-lg transition-all shadow-sm hover:shadow-md text-base flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98] text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md text-base flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLoading ? 'Saving Changes...' : 'Save Story'}
            </button>
          </div>

          {message && (
            <div className={`text-center text-sm font-medium ${
              message.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl my-8">
            {/* Close Button */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-2 -right-2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Preview Content */}
            <div className="bg-white rounded-2xl shadow-xl">
              {/* Profile Header */}
              <div className="text-center pt-8 pb-6 px-6">
                {/* Avatar */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white text-4xl font-bold mb-4">
                  {formData.display_name ? formData.display_name.charAt(0).toUpperCase() : '?'}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center mb-4">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-sm font-medium cursor-default">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-sm font-medium cursor-default">
                    <Bookmark className="w-4 h-4" />
                    Save Story
                  </button>
                </div>

                {/* Name */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {formData.display_name || 'No name'}
                </h1>

                {/* Headline */}
                <div className="flex items-start justify-center gap-1.5 text-blue-600 mb-2">
                  <Briefcase className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-center">
                    {formData.headline || <span className="text-gray-400">-</span>}
                  </span>
                </div>
              </div>

              {/* Micro Facts Section */}
              <div className="px-6 pb-6">
                <div className="bg-gray-200 rounded-xl p-4 max-h-48 overflow-y-auto">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">My story</h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                    {formData.micro_facts || <span className="text-gray-400">-</span>}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="px-6 pb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  {formData.whatsapp && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500">WhatsApp</div>
                        <div className="text-sm font-medium text-gray-900">{formData.whatsapp}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  {formData.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500">Phone</div>
                        <div className="text-sm font-medium text-gray-900">{formData.phone}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  {formData.email_public && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500">Email</div>
                        <div className="text-sm font-medium text-gray-900 truncate">{formData.email_public}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  {formData.linkedin && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Linkedin className="w-5 h-5 text-blue-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500">LinkedIn</div>
                        <div className="text-sm font-medium text-gray-900 truncate">{formData.linkedin}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  {formData.website && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500">Website</div>
                        <div className="text-sm font-medium text-gray-900 truncate">{formData.website}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}

                  {formData.payment_link && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500">Payment Link</div>
                        <div className="text-sm font-medium text-gray-900 truncate">{formData.payment_link}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
