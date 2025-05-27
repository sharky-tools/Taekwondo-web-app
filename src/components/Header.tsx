// src/components/Header.tsx
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavLink {
  id: string;
  label: string;
}

interface ProgramOption {
  id: string;
  label: string;
}

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("home");
  const [programsOpen, setProgramsOpen] = useState<boolean>(false);

  // Get current language direction
  const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';

  // Handle scroll event to change header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  // Generate navigation links from i18n
  const getNavLinks = (): NavLink[] => {
    return [
      { id: "home", label: t("navigation.home") },
      { id: "about", label: t("navigation.about") },
      { id: "programs", label: t("navigation.programs") },
      { id: "schedule", label: t("navigation.schedule") },
      { id: "instructors", label: t("navigation.instructors") },
      { id: "contact", label: t("navigation.contact") }
    ];
  };

  // Generate program options from i18n
  const getProgramOptions = (): ProgramOption[] => {
    return [
      { id: "kids", label: t("programs-h.kids") },
      { id: "youth", label: t("programs-h.youth") },
      { id: "teens", label: t("programs-h.teens") },
      { id: "adults", label: t("programs-h.adults") },
      { id: "competition", label: t("programs-h.competition") }
    ];
  };

  return (
    <header 
      className={`
        fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm
        ${isScrolled 
          ? "bg-white/95 shadow-lg py-2" 
          : "bg-white/90 py-4"
        }
      `}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-6">
        
        {/* Logo - Always on the start side */}
        <div className="flex items-center">
          <img
            src="/alwifaq-logo.png"
            alt="AlWifaq Taekwondo Logo"
            className={`
              object-contain transition-all duration-300 
              ${isScrolled ? "h-12 w-auto" : "h-16 w-auto"}
            `}
          />
        </div>

        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 rtl:space-x-reverse">
          {getNavLinks().map((link) => (
            link.id === "programs" ? (
              <div 
                key={link.id} 
                className="relative group"
                onMouseEnter={() => setProgramsOpen(true)}
                onMouseLeave={() => setProgramsOpen(false)}
              >
                <button
                  className={`
                    flex items-center px-3 py-2 font-medium relative transition-all duration-200
                    text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600
                  `}
                  onClick={() => setActiveLink(link.id)}
                >
                  {link.label}
                  <ChevronDown 
                    size={16} 
                    className={`
                      ${isRTL ? 'mr-1' : 'ml-1'} transition-transform duration-200
                      ${programsOpen ? 'rotate-180' : ''}
                    `} 
                  />
                  {/* Active indicator */}
                  <span 
                    className={`
                      absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-full h-0.5 bg-red-600 
                      transform origin-center transition-transform duration-300
                      ${activeLink === link.id ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </button>
                
                {/* Programs Dropdown */}
                <div 
                  className={`
                    absolute top-full mt-2 w-56 bg-white shadow-xl rounded-lg 
                    border border-gray-100 overflow-hidden transition-all duration-300
                    ${isRTL ? 'right-0' : 'left-0'}
                    ${programsOpen 
                      ? 'opacity-100 visible transform translate-y-0' 
                      : 'opacity-0 invisible transform -translate-y-2'
                    }
                  `}
                >
                  {getProgramOptions().map((program) => (
                    <a
                      key={program.id}
                      href={`#${program.id}`}
                      className="
                        block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 
                        hover:text-red-600 transition-colors duration-150
                        border-b border-gray-50 last:border-b-0
                      "
                    >
                      {program.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`
                  px-3 py-2 font-medium relative transition-all duration-200
                  text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600
                `}
                onClick={() => setActiveLink(link.id)}
              >
                {link.label}
                {/* Active indicator */}
                <span 
                  className={`
                    absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-full h-0.5 bg-red-600 
                    transform origin-center transition-transform duration-300
                    ${activeLink === link.id ? "scale-x-100" : "scale-x-0"}
                  `}
                />
              </a>
            )
          ))}
        </nav>

        {/* Language Switcher & Mobile Menu - Always on the end side */}
        <div className="flex items-center gap-3">
          {/* Desktop Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <LanguageSwitcher isMobile={true} />
            
            {/* Mobile Menu Toggle */}
            <button
              className="
                p-2 text-gray-700 hover:text-red-600 focus:outline-none 
                focus:text-red-600 transition-colors duration-200
              "
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-80 max-w-[85vw] 
          bg-white z-50 transform transition-transform duration-300 ease-in-out
          ${isMenuOpen 
            ? "translate-x-0" 
            : isRTL ? "translate-x-full" : "-translate-x-full"
          } md:hidden
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <img
            src="/alwifaq-logo.png"
            alt="AlWifaq Taekwondo"
            className="h-10 w-auto"
          />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="py-4">
          {getNavLinks().map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="
                block px-6 py-4 text-gray-700 font-medium 
                hover:bg-red-50 hover:text-red-600 transition-colors duration-150
                border-b border-gray-100 last:border-b-0
              "
              onClick={() => {
                setIsMenuOpen(false);
                setActiveLink(link.id);
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Programs submenu */}
          <div className="px-6 py-4 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              {t("navigation.programs")}
            </h3>
            {getProgramOptions().map((program) => (
              <a
                key={program.id}
                href={`#${program.id}`}
                className="
                  block py-2 text-gray-600 hover:text-red-600 
                  transition-colors duration-150
                "
                onClick={() => setIsMenuOpen(false)}
              >
                {program.label}
              </a>
            ))}
          </div>

          {/* Mobile CTA Button */}
          <div className="px-6 py-6">
            <a
              href="#trial"
              className="
                block w-full bg-red-600 hover:bg-red-700 text-white text-center 
                font-medium px-6 py-3 rounded-lg transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              "
              onClick={() => setIsMenuOpen(false)}
            >
              {t("common.startFreeTrial")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;