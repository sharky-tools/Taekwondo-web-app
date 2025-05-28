import React from 'react';
import { useTranslation } from 'react-i18next';

const Programs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';

  const programs = [
    {
      id: 'little-dragons',
      image: '/public/programs/program-1.png',
      ageRange: '4-8',
      bgColor: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500',
      hoverBg: 'hover:from-yellow-500 hover:via-orange-500 hover:to-red-500'
    },
    {
      id: 'kids-taekwondo',
      image: '/programs/program-2.png',
      ageRange: '9-11',
      bgColor: 'bg-gradient-to-br from-green-400 via-green-500 to-emerald-600',
      hoverBg: 'hover:from-green-500 hover:via-emerald-600 hover:to-teal-600'
    },
    {
      id: 'youth-training',
      image: '/programs/program-3.png',
      ageRange: '11-13',
      bgColor: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700',
      hoverBg: 'hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700'
    },
    {
      id: 'mixed-kids',
      image: '/programs/program-4.png',
      ageRange: '6-12',
      bgColor: 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600',
      hoverBg: 'hover:from-purple-600 hover:via-pink-600 hover:to-rose-600'
    },
    {
      id: 'youth-adults',
      image: '/programs/program-5.png',
      ageRange: '13+',
      bgColor: 'bg-gradient-to-br from-red-500 via-red-600 to-rose-700',
      hoverBg: 'hover:from-red-600 hover:via-rose-700 hover:to-pink-700'
    }
  ];

  const handleProgramClick = (programId: string) => {
    window.location.href = `/programs/${programId}`;
  };

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('programs.title')}
          </h2>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t('programs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div 
              key={program.id}
              className="relative overflow-hidden h-96 rounded-2xl shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
              onClick={() => handleProgramClick(program.id)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Background Layer with Image and Gradient Overlay */}
              <div 
                className={`absolute inset-0 ${program.bgColor} ${program.hoverBg} transition-all duration-300`}
                style={{
                  backgroundImage: `url(${program.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Gradient Overlay to blend image with gradient colors */}
                <div className={`absolute inset-0 ${program.bgColor} ${program.hoverBg} opacity-60 group-hover:opacity-40 transition-opacity duration-300 mix-blend-multiply`}></div>
              </div>

              {/* Hover overlay for extra shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex flex-col justify-end p-6 z-20">
                {/* Age Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {t('programs.age')} {program.ageRange}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                  {t(`programs.${program.id}.title`)}
                </h3>
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <p className={`mb-4 text-sm leading-relaxed text-white ${isRTL ? 'text-right font-arabic' : 'text-left'}`}>
                    {t(`programs.${program.id}.description`)}
                  </p>
                  
                  {/* Learn More Indicator */}
                  <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    <span className={`text-sm font-medium text-white ${isRTL ? 'ml-2 font-arabic' : 'mr-2'}`}>
                      {t('programs.learnMore')}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-white transition-transform duration-300 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d={isRTL ? "M19 12H5m0 0l7 7m-7-7l7-7" : "M5 12h14m0 0l-7-7m7 7l-7 7"} 
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Fallback for broken images */}
              <div 
                className={`absolute inset-0 ${program.bgColor} ${program.hoverBg} flex items-center justify-center transition-all duration-300 group-hover:brightness-110`}
                style={{
                  backgroundImage: `url(${program.image})`,
                  backgroundSize: '0', // Initially hidden
                }}
                onError={() => {
                  // Show gradient fallback if image fails
                }}
              >
                {/* SVG Fallback Icon */}
                <div className="w-24 h-24 text-white opacity-30">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <circle cx="50" cy="25" r="15"/>
                    <rect x="35" y="40" width="30" height="45" rx="5"/>
                    <rect x="20" y="45" width="15" height="35" rx="5"/>
                    <rect x="65" y="45" width="15" height="35" rx="5"/>
                    <rect x="35" y="85" width="12" height="15" rx="2"/>
                    <rect x="53" y="85" width="12" height="15" rx="2"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
            opacity: 0;
          }

          .font-arabic {
            font-family: 'Noto Sans Arabic', 'Cairo', sans-serif;
          }
        `
      }} />
    </section>
  );
};

export default Programs;