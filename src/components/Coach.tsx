import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Award, Users, Calendar, ChevronRight } from 'lucide-react';

const Coach: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('coach-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { key: 'experience', icon: Calendar, value: '15+' },
    { key: 'students', icon: Users, value: '500+' },
    { key: 'awards', icon: Award, value: '25+' },
    { key: 'rating', icon: Star, value: '4.9' }
  ];

  const certifications = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <section
      id="coach-section"
      className={`py-20 bg-white overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t('coach.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Coach Image */}
          <div
            className={`lg:col-span-1 ${
              isVisible ? 'animate-fade-in-left' : 'opacity-0'
            } ${isRTL ? 'lg:order-2' : ''}`}
          >
            <div className="relative group max-w-sm mx-auto">
              {/* Main Coach Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105">
                <div className="aspect-[3/4] bg-gradient-to-br from-red-50 to-orange-50">
                  <img
                    src="/coach.png"
                    alt={t('coach.name')}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`;
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Floating Rating */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-900 text-sm">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coach Info */}
          <div
            className={`lg:col-span-2 space-y-8 ${
              isVisible ? 'animate-fade-in-right' : 'opacity-0'
            } ${isRTL ? 'lg:order-1' : ''}`}
          >
            {/* Name & Title */}
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t('coach.name')}
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-semibold">
                  {t('coach.title_main')}
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold">
                  {t('coach.title_secondary')}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {t('coach.description')}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.key}
                    className={`bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 animate-bounce-in border border-gray-100`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center">
                      <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg inline-flex mb-2">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">
                        {t(`coach.stats.${stat.key}`)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certifications */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {t('coach.certifications.title')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <div
                    key={cert}
                    className={`bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all duration-300 animate-fade-in-up border border-gray-100`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium text-sm">
                        {t(`coach.certifications.cert${cert}`)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="group bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                <span className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <span>{t('coach.cta_button')}</span>
                  <ChevronRight className={`w-5 h-5 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform duration-300`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>
        {`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(${isRTL ? '50px' : '-50px'});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(${isRTL ? '-50px' : '50px'});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
          opacity: 0;
        }
        `}
      </style>
    </section>
  );
};

export default Coach;