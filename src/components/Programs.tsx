import React from 'react';
import { useTranslation } from 'react-i18next';

const Programs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';

  const programs = [
    {
      id: 'kids_4_8',
      name: t('programs.kids_4_8.name'),
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500',
      image: '/program-kids-4-8.jpg',
      description: t('programs.kids_4_8.description'),
    },
    {
      id: 'kids_9_11',
      name: t('programs.kids_9_11.name'),
      color: 'bg-green-500',
      textColor: 'text-green-500',
      image: '/program-kids-9-11.jpg',
      description: t('programs.kids_9_11.description'),
    },
    {
      id: 'kids_11_13',
      name: t('programs.kids_11_13.name'),
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      image: '/program-kids-11-13.jpg',
      description: t('programs.kids_11_13.description'),
    },
    {
      id: 'kids_6_12',
      name: t('programs.kids_6_12.name'),
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      image: '/program-kids-6-12.jpg',
      description: t('programs.kids_6_12.description'),
    },
    {
      id: 'youth_adults',
      name: t('programs.youth_adults.name'),
      color: 'bg-red-600',
      textColor: 'text-red-600',
      image: '/program-youth-adults.jpg',
      description: t('programs.youth_adults.description'),
    },
  ];

  return (
    <section id="programs" className={`py-20 bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center section-title mx-auto">
          {t('programs.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className="program-card h-96 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`h-1/2 ${program.color} flex items-center justify-center overflow-hidden`}>
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to Unsplash placeholder if image not found
                    target.src = `https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`;
                  }}
                />
              </div>
              <div className="program-card-content bg-white text-black p-4 h-1/2 flex flex-col justify-between">
                <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                <p className="text-sm text-gray-600 flex-grow">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;