// src/components/LanguageSwitcher.tsx
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

interface Language {
  code: string;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

const languages: Language[] = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' }
];

const LanguageSwitcher = ({ isMobile = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  const isRTL = currentLanguage.dir === 'rtl';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = async (languageCode: string) => {
    const selectedLanguage = languages.find(lang => lang.code === languageCode);
    
    if (selectedLanguage) {
      // Change language
      await i18n.changeLanguage(languageCode);
      
      // Update document direction
      document.documentElement.dir = selectedLanguage.dir;
      document.documentElement.lang = languageCode;
      
      // Close dropdown
      setIsOpen(false);
    }
  };

  if (isMobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600 transition-colors duration-200"
          aria-label="Change language"
        >
          <Globe size={20} />
        </button>

        {isOpen && (
          <div className={`
            absolute top-full mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-100 
            overflow-hidden z-50 ${isRTL ? 'right-0' : 'left-0'}
          `}>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`
                  w-full text-left px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600 
                  transition-colors duration-150 flex items-center gap-2
                  ${currentLanguage.code === language.code 
                    ? 'bg-red-50 text-red-600 font-medium' 
                    : 'text-gray-700'
                  }
                `}
              >
                <span className="text-base">{language.flag}</span>
                <span className="truncate">{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-600 
          focus:outline-none focus:text-red-600 transition-colors duration-200
          bg-white/80 hover:bg-white/90 rounded-lg border border-gray-200
        "
        aria-label="Change language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="font-medium text-sm">{currentLanguage.name}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className={`
          absolute top-full mt-2 w-40 bg-white shadow-xl rounded-lg 
          border border-gray-100 overflow-hidden z-50
          ${isRTL ? 'right-0' : 'left-0'}
        `}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`
                w-full text-left px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 
                transition-colors duration-150 flex items-center gap-3
                border-b border-gray-50 last:border-b-0
                ${currentLanguage.code === language.code 
                  ? 'bg-red-50 text-red-600 font-medium' 
                  : 'text-gray-700'
                }
              `}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;