import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Share2, Bookmark, Briefcase, Phone, Mail, Linkedin, Globe, MessageCircle, CreditCard, UserCog, ChevronRight } from 'lucide-react';

interface UserProfile {
  card_id: string;
  display_name: string;
  headline: string | null;
  micro_facts: string | null;
  whatsapp: string | null;
  phone: string | null;
  email_public: string | null;
  linkedin: string | null;
  website: string | null;
  payment_link: string | null;
}

export default function UserNFC() {
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const cardId = searchParams.get('id');

  useEffect(() => {
    fetchProfile();
  }, [cardId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(false);

      if (!cardId) {
        console.error('No id provided');
        setLoading(false);
        return;
      }

      const response = await fetch('https://api.1secstory.com/get_public_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: cardId })
      });

      const result = await response.json();

      if (result.success && result.data) {
        setProfile(result.data);
      } else {
        console.error('Failed to fetch profile:', result.message);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `${profile?.display_name || 'Profile'} - 1SecStory`,
      text: `Check out ${profile?.display_name || 'this profile'} on 1SecStory`,
      url: url
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for devices that don't support Web Share API
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      // User cancelled share or error occurred
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Error sharing:', err);
        // Fallback to clipboard
        try {
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        } catch (clipboardErr) {
          alert('Unable to share. Please copy the URL manually.');
        }
      }
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    const cleanValue = (value: string | null | undefined) => {
      if (!value || value === 'None' || value === 'null') return '';
      return value;
    };

    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profile.display_name || 'Contact'}`,
      cleanValue(profile.phone) ? `TEL;TYPE=CELL:${cleanValue(profile.phone)}` : '',
      cleanValue(profile.email_public) ? `EMAIL:${cleanValue(profile.email_public)}` : '',
      cleanValue(profile.headline) ? `TITLE:${cleanValue(profile.headline)}` : '',
      cleanValue(profile.website) ? `URL:${cleanValue(profile.website)}` : '',
      cleanValue(profile.linkedin) ? `URL;type=LinkedIn:${cleanValue(profile.linkedin)}` : '',
      cleanValue(profile.whatsapp) ? `TEL;TYPE=WhatsApp:${cleanValue(profile.whatsapp)}` : '',
      cleanValue(profile.micro_facts) ? `NOTE:${cleanValue(profile.micro_facts).replace(/\n/g, '\\n')}` : '',
      cleanValue(profile.payment_link) ? `URL;type=Payment:${cleanValue(profile.payment_link)}` : '',
      'END:VCARD'
    ].filter(line => line !== '').join('\n');

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.display_name || 'contact'}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatValue = (value: string | null | undefined) => {
    if (!value || value === 'None' || value === 'null') {
      return <span className="text-gray-400">-</span>;
    }
    return value;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 rounded-full blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-tl from-blue-200 via-cyan-200 to-blue-100 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>
        <div className="relative z-10 text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    if (!error && cardId) {
      window.location.href = `https://1secstory.com/register?card_id=${cardId}`;
      return null;
    }

    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 rounded-full blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-tl from-blue-200 via-cyan-200 to-blue-100 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{error ? 'Server Error' : 'No data available'}</h2>
          <p className="text-gray-600">{error ? 'Unable to connect to server. Please try again later.' : 'Profile not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-8 px-4">
      {/* Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 rounded-full blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-tl from-blue-200 via-cyan-200 to-blue-100 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>

      <div className="relative z-10 max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="pt-8 pb-6 px-6">
            <div className="flex items-start gap-4 mb-6">
              {/* Avatar */}
              <div className="flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white text-4xl font-bold flex-shrink-0">
                {getInitial(profile.display_name)}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 flex-1">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all w-full"
                >
                  <Share2 className="w-4 h-4" />
                  Share Story
                </button>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-black text-black rounded-full text-sm font-medium hover:bg-gray-50 transition-all flex-1"
                  >
                    <Bookmark className="w-4 h-4" />
                    Save Story
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 bg-white border-2 border-black rounded-full hover:bg-gray-50 transition-all">
                    <UserCog className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-left">
              {profile.display_name || 'No name'}
            </h1>

            {/* Headline */}
            <div className="flex items-center gap-1.5 text-purple-600 mb-2">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium">{formatValue(profile.headline)}</span>
            </div>
          </div>

          {/* Micro Facts Section */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-xl p-4 max-h-48 overflow-y-auto border border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-2">My Story</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                {profile.micro_facts && profile.micro_facts !== 'None' ? (
                  profile.micro_facts
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="px-6 pb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">My Contact</h3>
            <div className="space-y-2">
              {profile.whatsapp && profile.whatsapp !== 'None' && (
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Whatsapp</div>
                    <div className="text-sm font-medium text-gray-900">{profile.whatsapp}</div>
                  </div>
                </a>
              )}

              {profile.email_public && profile.email_public !== 'None' && (
                <a
                  href={`mailto:${profile.email_public}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{profile.email_public}</div>
                  </div>
                </a>
              )}

              {profile.linkedin && profile.linkedin !== 'None' && (
                <a
                  href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Socials</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{profile.linkedin}</div>
                  </div>
                </a>
              )}

              {profile.website && profile.website !== 'None' && (
                <a
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Website</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{profile.website}</div>
                  </div>
                </a>
              )}

              {profile.payment_link && profile.payment_link !== 'None' && (
                <a
                  href={profile.payment_link.startsWith('http') ? profile.payment_link : `https://${profile.payment_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Payment</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{profile.payment_link}</div>
                  </div>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Action Buttons - Bottom */}
        <div className="flex gap-3 justify-center items-center mt-6">
          <a
            href="https://1secstory.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
          >
            <Bookmark className="w-5 h-5" />
            Get Yours
          </a>
          <a
            href="/edit_profile"
            className="flex items-center justify-center w-12 h-12 bg-white border-2 border-black rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <UserCog className="w-5 h-5 text-black" />
          </a>
        </div>

        {/* Logo at Bottom */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-2 text-purple-400">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium tracking-wider">1 SEC STORY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
