import { useState, useEffect } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import { countryCodes } from './countryCodes';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}

function PhoneInput({ value, onChange, label, placeholder = "1234567890" }: PhoneInputProps) {
  const [selectedCode, setSelectedCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (value) {
      const match = countryCodes.find(country => value.startsWith(country.dialCode));
      if (match) {
        setSelectedCode(match.dialCode);
        setPhoneNumber(value.substring(match.dialCode.length));
      } else {
        setPhoneNumber(value);
      }
    }
  }, [value]);

  const handleCodeChange = (code: string) => {
    setSelectedCode(code);
    setIsDropdownOpen(false);
    setSearchTerm('');
    onChange(code + phoneNumber);
  };

  const handlePhoneChange = (num: string) => {
    const cleanNum = num.replace(/[^0-9]/g, '');
    setPhoneNumber(cleanNum);
    onChange(selectedCode + cleanNum);
  };

  const filteredCountries = countryCodes.filter(
    country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative flex gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all flex items-center gap-1 min-w-[90px]"
          >
            <span className="text-base font-medium text-gray-700">
              {selectedCode || 'None'}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-1 left-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[300px] overflow-hidden flex flex-col">
              <div className="p-2 border-b border-gray-200">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search country..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  autoFocus
                />
              </div>
              <div className="overflow-y-auto">
                <button
                  type="button"
                  onClick={() => handleCodeChange('')}
                  className="w-full px-3 py-2.5 text-left hover:bg-blue-50 border-b border-gray-100 text-sm transition-colors font-medium text-gray-600"
                >
                  No country code
                </button>
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCodeChange(country.dialCode)}
                    className="w-full px-3 py-2 text-left hover:bg-blue-50 flex items-center justify-between text-sm transition-colors"
                  >
                    <span className="text-gray-700">
                      {country.name}
                    </span>
                    <span className="text-gray-500 font-medium">{country.dialCode}</span>
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="px-3 py-4 text-center text-gray-500 text-sm">
                    No countries found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative flex-1">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-base"
          />
        </div>
      </div>
    </div>
  );
}

export default PhoneInput;
