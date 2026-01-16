import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Share2, Bookmark, Briefcase, Phone, Mail, Linkedin, Globe, MessageCircle, CreditCard, Edit3, ChevronRight } from 'lucide-react';

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
  const [showFullBio, setShowFullBio] = useState(false);
  const cardId = searchParams.get('id');

  useEffect(() => {
    fetchProfile();
  }, [cardId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);

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
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
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
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 rounded-full blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-tl from-blue-200 via-cyan-200 to-blue-100 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No data available</h2>
          <p className="text-gray-600">Profile not found</p>
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
        {/* Logo at Top */}
        <div className="text-center mb-6">
          <img src="/artboard_2_copy_4.png" alt="1SecStory" className="h-12 mx-auto object-contain" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="text-center pt-8 pb-6 px-6">
            {/* Avatar */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white text-4xl font-bold mb-4">
              {getInitial(profile.display_name)}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mb-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all"
              >
                <Bookmark className="w-4 h-4" />
                Save Story
              </button>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {profile.display_name || 'No name'}
            </h1>

            {/* Headline */}
            <div className="flex items-center justify-center gap-1.5 text-blue-600 mb-2">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium">{formatValue(profile.headline)}</span>
            </div>
          </div>

          {/* Micro Facts Section */}
          <div className="px-6 pb-6">
            <div className="bg-gray-200 rounded-xl p-4 max-h-48 overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Micro Facts</h3>
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
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
            <div className="space-y-2">
              {profile.whatsapp && profile.whatsapp !== 'None' && (
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">WhatsApp</div>
                    <div className="text-sm font-medium text-gray-900">{profile.whatsapp}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              )}

              {profile.phone && profile.phone !== 'None' && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="text-sm font-medium text-gray-900">{profile.phone}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              )}

              {profile.email_public && profile.email_public !== 'None' && (
                <a
                  href={`mailto:${profile.email_public}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{profile.email_public}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              )}

              {profile.linkedin && profile.linkedin !== 'None' && (
                <a
                  href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-blue-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">LinkedIn</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{profile.linkedin}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              )}

              {profile.website && profile.website !== 'None' && (
                <a
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Website</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{profile.website}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              )}

              {profile.payment_link && profile.payment_link !== 'None' && (
                <a
                  href={profile.payment_link.startsWith('http') ? profile.payment_link : `https://${profile.payment_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Payment Link</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{profile.payment_link}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Action Buttons - Bottom */}
        <div className="flex gap-3 justify-between mt-6">
          <a
            href="https://1secstory.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
          >
            <Bookmark className="w-5 h-5" />
            Get yours
          </a>
          <a
            href="/edit_profile"
            className="flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all font-medium border border-gray-200/50"
          >
            <Edit3 className="w-5 h-5" />
            Edit Details
          </a>
        </div>
      </div>
    </div>
  );
}
