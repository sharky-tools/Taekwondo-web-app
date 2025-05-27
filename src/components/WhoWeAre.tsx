// src/components/WhoWeAre.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Users, Target, Heart, Star, Trophy, Zap, Shield } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  number: number;
  labelKey: string;
  suffix?: string;
}

interface ValueItem {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  color: string;
}

const WhoWeAre: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    {
      icon: <Users className="w-8 h-8" />,
      number: 100,
      labelKey: 'whoWeAre.stats.students',
      suffix: '+'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      number: 10,
      labelKey: 'whoWeAre.stats.years',
      suffix: '+'
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: 50,
      labelKey: 'whoWeAre.stats.medals',
      suffix: '+'
    },
    {
      icon: <Star className="w-8 h-8" />,
      number: 98,
      labelKey: 'whoWeAre.stats.satisfaction',
      suffix: '%'
    }
  ];

  const values: ValueItem[] = [
    {
      icon: <Shield className="w-8 h-8" />,
      titleKey: 'whoWeAre.values.discipline.title',
      descriptionKey: 'whoWeAre.values.discipline.description',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      titleKey: 'whoWeAre.values.respect.title',
      descriptionKey: 'whoWeAre.values.respect.description',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      titleKey: 'whoWeAre.values.excellence.title',
      descriptionKey: 'whoWeAre.values.excellence.description',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <Target className="w-8 h-8" />,
      titleKey: 'whoWeAre.values.perseverance.title',
      descriptionKey: 'whoWeAre.values.perseverance.description',
      color: 'from-green-500 to-green-600'
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate stats when visible
          stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.number;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              setAnimatedStats(prev => {
                const newStats = [...prev];
                newStats[index] = Math.floor(start);
                return newStats;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award size={16} />
            {t('whoWeAre.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            {t('whoWeAre.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('whoWeAre.subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : `${isRTL ? 'translate-x-10' : '-translate-x-10'} opacity-0`
          }`}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {t('whoWeAre.mission.title')}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('whoWeAre.mission.description')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('whoWeAre.mission.details')}
              </p>
              
              {/* CTA Button */}
              <div className="pt-6">
                <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <span className="flex items-center gap-2">
                    {t('whoWeAre.joinUs')}
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : `${isRTL ? '-translate-x-10' : 'translate-x-10'} opacity-0`
          }`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 ">
                <img 
                  src="/public/test.jpg" 
                  alt={t('whoWeAre.imageAlt')}
                  className="w-full h-97 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-bounce">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-pulse">
                <Star className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mb-20 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {animatedStats[index]}{stat.suffix}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {t(stat.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`transform transition-all duration-1000 delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('whoWeAre.values.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('whoWeAre.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-r ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {t(value.titleKey)}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {t(value.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;