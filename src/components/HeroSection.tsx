// src/components/HeroSection.tsx
import React, { useEffect, useState } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeroSectionProps {
  backgroundImageUrl?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImageUrl = '/kid-move.jpg',
  primaryButtonLink = '#classes',
  secondaryButtonLink = '#schedule',
}) => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // Get current language direction - same as Header component
  const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden  mt-24"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-1000"
        style={{ 
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-red-900/30" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-red-400/5 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

        {/* Main Heading */}
        <h1 
          className={`
            text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6
            transform transition-all duration-1000 delay-300
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
          `}
        >
          <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent p-10">
            {t('herosection.heroTitle')}
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`
            text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed
            transform transition-all duration-1000 delay-500
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          {t('herosection.heroSubtitle')}
        </p>

        {/* CTA Buttons */}
        <div 
          className={`
            flex flex-col sm:flex-row justify-center items-center gap-4 mb-8
            transform transition-all duration-1000 delay-700
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          {/* Primary CTA */}
          <a
            href={primaryButtonLink}
            className="
              group relative inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 
              text-white font-semibold px-8 py-4 rounded-xl shadow-2xl
              transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/25
              focus:outline-none focus:ring-4 focus:ring-red-500/50
              overflow-hidden
            "
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10">{t('herosection.exploreClasses')}</span>
            <ChevronRight 
              size={20} 
              className={`relative z-10 transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform duration-300`} 
            />
          </a>

          {/* Secondary CTA */}
          <a
            href={secondaryButtonLink}
            className="
              group inline-flex items-center gap-2 border-2 border-white/50 backdrop-blur-sm
              text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 
              rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-white/30
            "
          >
            <Play size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
            <span>{t('herosection.viewSchedule')}</span>
          </a>
        </div>

        {/* Stats or Features */}
        <div 
          className={`
            flex flex-wrap justify-center items-center gap-8 text-white/80
            transform transition-all duration-1000 delay-1000
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">{t('herosection.features.allAges')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-200" />
            <span className="text-sm font-medium">{t('herosection.features.expertInstructors')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-400" />
            <span className="text-sm font-medium">{t('herosection.features.flexibleSchedule')}</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Top corner decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 border border-white/10 rounded-full" />
        <div className="absolute -top-32 -right-32 w-64 h-64 border border-white/5 rounded-full" />
        
        {/* Bottom corner decoration */}
        <div className="absolute -bottom-24 -left-24 w-48 h-48 border border-red-500/20 rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 border border-red-500/10 rounded-full" />
      </div>
    </section>
  );
};

export default HeroSection;