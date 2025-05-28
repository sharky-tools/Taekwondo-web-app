// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// interface GalleryItem {
//   id: number;
//   src: string;
//   alt: string;
//   category: string;
//   titleKey: string;
//   descriptionKey: string;
// }

// const Gallery: React.FC = () => {
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';

//   const [activeFilter, setActiveFilter] = useState('all');
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [visibleItems, setVisibleItems] = useState<number[]>([]);
//   const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0);

//   // Sample gallery data - replace with your actual images
//   const galleryItems: GalleryItem[] = [
//     {
//       id: 1,
//       src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23334155'/%3E%3Cpath d='M300,150 Q400,50 500,150 Q600,250 700,200' stroke='%234299e1' stroke-width='8' fill='none'/%3E%3Ccircle cx='400' cy='200' r='80' fill='%232563eb'/%3E%3Crect x='200' y='150' width='100' height='100' fill='%23818cf8'/%3E%3Cpolygon points='600,150 650,250 550,250' fill='%23f472b6'/%3E%3C/svg%3E",
//       alt: "Annual Championship Event",
//       category: "events",
//       titleKey: "gallery.items.championship.title",
//       descriptionKey: "gallery.items.championship.description"
//     },
//     {
//       id: 2,
//       src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23475569'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23f43f5e'/%3E%3Crect x='120' y='250' width='160' height='80' fill='%23fb7185'/%3E%3Cpath d='M50,200 Q200,50 350,200' stroke='%23fda4af' stroke-width='6' fill='none'/%3E%3C/svg%3E",
//       alt: "Morning Training Session",
//       category: "training",
//       titleKey: "gallery.items.morningTraining.title",
//       descriptionKey: "gallery.items.morningTraining.description"
//     },
//     {
//       id: 3,
//       src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23334155'/%3E%3Cpolygon points='200,50 300,200 100,200' fill='%238b5cf6'/%3E%3Ccircle cx='200' cy='280' r='80' fill='%23a78bfa'/%3E%3Cpath d='M50,100 Q200,150 350,100' stroke='%23c4b5fd' stroke-width='6' fill='none'/%3E%3C/svg%3E",
//       alt: "National Championship",
//       category: "competitions",
//       titleKey: "gallery.items.nationalChampionship.title",
//       descriptionKey: "gallery.items.nationalChampionship.description"
//     },
//     {
//       id: 4,
//       src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23374151'/%3E%3Ccircle cx='150' cy='150' r='70' fill='%230ea5e9'/%3E%3Crect x='220' y='100' width='120' height='120' fill='%2338bdf8'/%3E%3Cpath d='M50,300 Q200,250 350,300' stroke='%23bae6fd' stroke-width='8' fill='none'/%3E%3C/svg%3E",
//       alt: "Advanced Techniques Workshop",
//       category: "training",
//       titleKey: "gallery.items.advancedTechniques.title",
//       descriptionKey: "gallery.items.advancedTechniques.description"
//     },
//     {
//       id: 5,
//       src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23475569'/%3E%3Ccircle cx='200' cy='200' r='100' fill='%2314b8a6'/%3E%3Crect x='100' y='100' width='80' height='80' fill='%235eead4'/%3E%3Crect x='220' y='100' width='80' height='80' fill='%235eead4'/%3E%3Cpath d='M100,300 Q200,350 300,300' stroke='%2399f6e4' stroke-width='8' fill='none'/%3E%3C/svg%3E",
//       alt: "Annual Gala Dinner",
//       category: "events",
//       titleKey: "gallery.items.galaDinner.title",
//       descriptionKey: "gallery.items.galaDinner.description"
//     },
//     {
//       id: 6,
//       src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23334155'/%3E%3Cpolygon points='200,50 350,200 50,200' fill='%23f59e0b'/%3E%3Ccircle cx='200' cy='280' r='80' fill='%23fbbf24'/%3E%3Cpath d='M50,150 Q200,100 350,150' stroke='%23fcd34d' stroke-width='6' fill='none'/%3E%3C/svg%3E",
//       alt: "Regional Tournament",
//       category: "competitions",
//       titleKey: "gallery.items.regionalTournament.title",
//       descriptionKey: "gallery.items.regionalTournament.description"
//     },
//     {
//       id: 7,
//       src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23475569'/%3E%3Ccircle cx='200' cy='150' r='100' fill='%236366f1'/%3E%3Crect x='120' y='250' width='160' height='100' fill='%23818cf8'/%3E%3Cpath d='M50,200 Q200,150 350,200' stroke='%23c7d2fe' stroke-width='6' fill='none'/%3E%3C/svg%3E",
//       alt: "Youth Training Program",
//       category: "training",
//       titleKey: "gallery.items.youthProgram.title",
//       descriptionKey: "gallery.items.youthProgram.description"
//     },
//     {
//       id: 8,
//       src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23334155'/%3E%3Ccircle cx='200' cy='200' r='120' fill='%23ef4444'/%3E%3Crect x='150' y='150' width='100' height='100' fill='%23fca5a5'/%3E%3Cpath d='M100,100 Q200,50 300,100' stroke='%23fee2e2' stroke-width='8' fill='none'/%3E%3C/svg%3E",
//       alt: "Championship Finals",
//       category: "competitions",
//       titleKey: "gallery.items.championshipFinals.title",
//       descriptionKey: "gallery.items.championshipFinals.description"
//     }
//   ];

//   const carouselItems = galleryItems.filter(item => item.category === 'events').slice(0, 3);
//   const filters = ['training', 'events', 'competitions', 'all'];

//   // Auto-advance carousel
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentCarouselSlide((prev) => (prev + 1) % carouselItems.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [carouselItems.length]);

//   // Staggered animation on mount and filter change
//   useEffect(() => {
//     setVisibleItems([]);
//     const filteredItems = galleryItems.filter(item =>
//       activeFilter === 'all' || item.category === activeFilter
//     );

//     filteredItems.forEach((_, index) => {
//       setTimeout(() => {
//         setVisibleItems(prev => [...prev, index]);
//       }, index * 150);
//     });
//   }, [activeFilter]);

//   // Keyboard navigation for lightbox
//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       if (!lightboxOpen) return;

//       switch (e.key) {
//         case 'Escape':
//           setLightboxOpen(false);
//           break;
//         case 'ArrowLeft':
//           e.preventDefault();
//           navigateLightbox(-1);
//           break;
//         case 'ArrowRight':
//           e.preventDefault();
//           navigateLightbox(1);
//           break;
//       }
//     };

//     document.addEventListener('keydown', handleKeyPress);
//     return () => document.removeEventListener('keydown', handleKeyPress);
//   }, [lightboxOpen, currentImageIndex]);

//   const filteredItems = galleryItems.filter(item =>
//     activeFilter === 'all' || item.category === activeFilter
//   );

//   const openLightbox = (index: number) => {
//     setCurrentImageIndex(index);
//     setLightboxOpen(true);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeLightbox = () => {
//     setLightboxOpen(false);
//     document.body.style.overflow = 'unset';
//   };

//   const navigateLightbox = (direction: number) => {
//     const newIndex = (currentImageIndex + direction + filteredItems.length) % filteredItems.length;
//     setCurrentImageIndex(newIndex);
//   };

//   const handleFilterChange = (filter: string) => {
//     setActiveFilter(filter);
//   };

//   return (
//     <>
//       <section className="relative py-20 px-4 md:px-8 overflow-hidden max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
//         {/* Animated Background */}
//         <div className="absolute inset-0 bg-white">
//           {/* <div className="absolute inset-0 bg-[url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")] opacity-50"></div> */}
//         </div>

//         <div className="relative max-w-7xl mx-auto">
//           {/* Header Section */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-3 mb-6">

//               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//                 {t('gallery.title')}
//               </h2>
//             </div>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               {t('gallery.subtitle')}
//             </p>
//           </div>
//         </div>


//         {/* Option 2: Icon above buttons (if you prefer) */}

//         {/* <div className="text-center mb-16">
//           <div className="flex items-center justify-center w-12 h-12 bg-black rounded-xl mx-auto mb-6">
//             <Filter className="w-6 h-6 text-white" />
//           </div> */}
//         <div className={` m-20 flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               onClick={() => handleFilterChange(filter)}
//               className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${activeFilter === filter
//                   ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl shadow-blue-500/25'
//                   : 'bg-white/10 backdrop-blur-sm text-black hover:bg-gray-200/20 border border-black/20'
//                 } ${isRTL ? 'font-arabic' : ''}`}
//             >
//               <span className="relative z-10">{t(`gallery.filters.${filter}`)}</span>
//               {activeFilter === filter && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Gallery Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Featured Carousel */}
//           {(activeFilter === 'all' || activeFilter === 'events') && (
//             <div className="md:col-span-2 lg:col-span-2 h-96 rounded-3xl overflow-hidden shadow-2xl group">
//               <div className="relative h-full">
//                 {carouselItems.map((item, index) => (
//                   <div
//                     key={item.id}
//                     className={`absolute inset-0 transition-all duration-1000 ${index === currentCarouselSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
//                       }`}
//                   >
//                     <div
//                       className="relative h-full cursor-pointer"
//                       onClick={() => openLightbox(galleryItems.findIndex(gi => gi.id === item.id))}
//                     >
//                       <img
//                         src={item.src}
//                         alt={item.alt}
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
//                         <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>
//                           <h3 className={`text-3xl font-bold mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
//                             {t(item.titleKey)}
//                           </h3>
//                           <p className={`text-lg text-blue-200 ${isRTL ? 'font-arabic text-right' : ''}`}>
//                             {t(item.descriptionKey)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
//                         {index + 1} / {carouselItems.length}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Regular Gallery Items */}
//           {filteredItems.map((item, index) => {
//             if (activeFilter === 'all' && item.category === 'events' && carouselItems.some(ci => ci.id === item.id)) {
//               return null; // Skip items that are in the carousel
//             }

//             return (
//               <div
//                 key={item.id}
//                 className={`group rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 cursor-pointer ${visibleItems.includes(index)
//                   ? 'opacity-100 translate-y-0'
//                   : 'opacity-0 translate-y-8'
//                   }`}
//                 onClick={() => openLightbox(index)}
//               >
//                 <div className="relative h-96 overflow-hidden">
//                   <img
//                     src={item.src}
//                     alt={item.alt}
//                     className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
//                     <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>
//                       <h3 className={`text-2xl font-bold mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
//                         {t(item.titleKey)}
//                       </h3>
//                       <p className={`text-sm text-blue-200 ${isRTL ? 'font-arabic text-right' : ''}`}>
//                         {t(item.descriptionKey)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-3 py-1 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
//                     {t(`gallery.categories.${item.category}`)}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Enhanced Lightbox */}
//         {lightboxOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
//             <div className="relative max-w-6xl max-h-[90vh] mx-4">
//               <button
//                 onClick={closeLightbox}
//                 className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-200 z-10"
//               >
//                 <X size={32} />
//               </button>

//               <img
//                 src={filteredItems[currentImageIndex]?.src}
//                 alt={filteredItems[currentImageIndex]?.alt}
//                 className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
//               />

//               <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl p-6 ${isRTL ? 'text-right' : 'text-left'
//                 }`}>
//                 <h3 className={`text-2xl font-bold text-white mb-2 ${isRTL ? 'font-arabic' : ''}`}>
//                   {t(filteredItems[currentImageIndex]?.titleKey)}
//                 </h3>
//                 <p className={`text-blue-200 ${isRTL ? 'font-arabic' : ''}`}>
//                   {t(filteredItems[currentImageIndex]?.descriptionKey)}
//                 </p>
//               </div>

//               {/* Navigation Arrows */}
//               <button
//                 onClick={() => navigateLightbox(-1)}
//                 className={`absolute top-1/2 -translate-y-1/2  bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200 hover:scale-110`}
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <button
//                 onClick={() => navigateLightbox(1)}
//                 className={`absolute top-1/2 -translate-y-1/2  bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200 hover:scale-110`}
//               >
//                 <ChevronRight size={24} />
//               </button>

//               {/* Image Counter */}
//               <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
//                 {currentImageIndex + 1} / {filteredItems.length}
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </>
//   );
// };

// export default Gallery;


import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  titleKey: string;
  descriptionKey: string;
}

// Constants moved outside component to prevent recreation
const FILTERS = ['all', 'training', 'events', 'competitions'] as const;
const CAROUSEL_INTERVAL = 5000;
const ANIMATION_DELAY = 150;

const Gallery: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Memoized gallery data to prevent recreation on every render
  const galleryItems: GalleryItem[] = useMemo(() => [
    {
      id: 1,
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23334155'/%3E%3Cpath d='M300,150 Q400,50 500,150 Q600,250 700,200' stroke='%234299e1' stroke-width='8' fill='none'/%3E%3Ccircle cx='400' cy='200' r='80' fill='%232563eb'/%3E%3Crect x='200' y='150' width='100' height='100' fill='%23818cf8'/%3E%3Cpolygon points='600,150 650,250 550,250' fill='%23f472b6'/%3E%3C/svg%3E",
      alt: "Annual Championship Event",
      category: "events",
      titleKey: "gallery.items.championship.title",
      descriptionKey: "gallery.items.championship.description"
    },
    {
      id: 2,
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23475569'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23f43f5e'/%3E%3Crect x='120' y='250' width='160' height='80' fill='%23fb7185'/%3E%3Cpath d='M50,200 Q200,50 350,200' stroke='%23fda4af' stroke-width='6' fill='none'/%3E%3C/svg%3E",
      alt: "Morning Training Session",
      category: "training",
      titleKey: "gallery.items.morningTraining.title",
      descriptionKey: "gallery.items.morningTraining.description"
    },
    {
      id: 3,
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23334155'/%3E%3Cpolygon points='200,50 300,200 100,200' fill='%238b5cf6'/%3E%3Ccircle cx='200' cy='280' r='80' fill='%23a78bfa'/%3E%3Cpath d='M50,100 Q200,150 350,100' stroke='%23c4b5fd' stroke-width='6' fill='none'/%3E%3C/svg%3E",
      alt: "National Championship",
      category: "competitions",
      titleKey: "gallery.items.nationalChampionship.title",
      descriptionKey: "gallery.items.nationalChampionship.description"
    },
    {
      id: 4,
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23374151'/%3E%3Ccircle cx='150' cy='150' r='70' fill='%230ea5e9'/%3E%3Crect x='220' y='100' width='120' height='120' fill='%2338bdf8'/%3E%3Cpath d='M50,300 Q200,250 350,300' stroke='%23bae6fd' stroke-width='8' fill='none'/%3E%3C/svg%3E",
      alt: "Advanced Techniques Workshop",
      category: "training",
      titleKey: "gallery.items.advancedTechniques.title",
      descriptionKey: "gallery.items.advancedTechniques.description"
    },
    {
      id: 5,
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23475569'/%3E%3Ccircle cx='200' cy='200' r='100' fill='%2314b8a6'/%3E%3Crect x='100' y='100' width='80' height='80' fill='%235eead4'/%3E%3Crect x='220' y='100' width='80' height='80' fill='%235eead4'/%3E%3Cpath d='M100,300 Q200,350 300,300' stroke='%2399f6e4' stroke-width='8' fill='none'/%3E%3C/svg%3E",
      alt: "Annual Gala Dinner",
      category: "events",
      titleKey: "gallery.items.galaDinner.title",
      descriptionKey: "gallery.items.galaDinner.description"
    },
    {
      id: 6,
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23334155'/%3E%3Cpolygon points='200,50 350,200 50,200' fill='%23f59e0b'/%3E%3Ccircle cx='200' cy='280' r='80' fill='%23fbbf24'/%3E%3Cpath d='M50,150 Q200,100 350,150' stroke='%23fcd34d' stroke-width='6' fill='none'/%3E%3C/svg%3E",
      alt: "Regional Tournament",
      category: "competitions",
      titleKey: "gallery.items.regionalTournament.title",
      descriptionKey: "gallery.items.regionalTournament.description"
    },
    {
      id: 7,
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23475569'/%3E%3Ccircle cx='200' cy='150' r='100' fill='%236366f1'/%3E%3Crect x='120' y='250' width='160' height='100' fill='%23818cf8'/%3E%3Cpath d='M50,200 Q200,150 350,200' stroke='%23c7d2fe' stroke-width='6' fill='none'/%3E%3C/svg%3E",
      alt: "Youth Training Program",
      category: "training",
      titleKey: "gallery.items.youthProgram.title",
      descriptionKey: "gallery.items.youthProgram.description"
    },
    {
      id: 8,
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23334155'/%3E%3Ccircle cx='200' cy='200' r='120' fill='%23ef4444'/%3E%3Crect x='150' y='150' width='100' height='100' fill='%23fca5a5'/%3E%3Cpath d='M100,100 Q200,50 300,100' stroke='%23fee2e2' stroke-width='8' fill='none'/%3E%3C/svg%3E",
      alt: "Championship Finals",
      category: "competitions",
      titleKey: "gallery.items.championshipFinals.title",
      descriptionKey: "gallery.items.championshipFinals.description"
    }
  ], []);

  // Memoized filtered items to prevent recalculation
  const filteredItems = useMemo(() => 
    galleryItems.filter(item => activeFilter === 'all' || item.category === activeFilter),
    [galleryItems, activeFilter]
  );

  // Memoized carousel items
  const carouselItems = useMemo(() => 
    galleryItems.filter(item => item.category === 'events').slice(0, 3),
    [galleryItems]
  );

  // Memoized carousel item IDs for faster lookup
  const carouselItemIds = useMemo(() => 
    new Set(carouselItems.map(item => item.id)),
    [carouselItems]
  );

  // Auto-advance carousel with pause/resume functionality
  useEffect(() => {
    if (isCarouselPaused || carouselItems.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentCarouselSlide(prev => (prev + 1) % carouselItems.length);
    }, CAROUSEL_INTERVAL);
    
    return () => clearInterval(interval);
  }, [carouselItems.length, isCarouselPaused]);

  // Optimized staggered animation with batch updates
  useEffect(() => {
    setVisibleItems(new Set());
    
    const timeouts: number[] = [];
    
    filteredItems.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, index]));
      }, index * ANIMATION_DELAY);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [filteredItems]);

  // Memoized keyboard navigation handler
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        navigateImage('prev');
        break;
      case 'ArrowRight':
        e.preventDefault();
        navigateImage('next');
        break;
    }
  }, [lightboxOpen]);

  // Keyboard navigation effect
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Memoized navigation functions
  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    const step = direction === 'next' ? 1 : -1;
    setCurrentImageIndex(prev => 
      (prev + step + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    if (filter !== activeFilter) {
      setActiveFilter(filter);
    }
  }, [activeFilter]);

  // Carousel control handlers
  const pauseCarousel = useCallback(() => setIsCarouselPaused(true), []);
  const resumeCarousel = useCallback(() => setIsCarouselPaused(false), []);

  // Loading state for images
  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity = '1';
  }, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load image:', e.currentTarget.src);
    e.currentTarget.style.opacity = '0.5';
  }, []);

  return (
    <>
      <section className="relative py-20 px-4 md:px-8 overflow-hidden max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Background */}
        <div className="absolute inset-0 bg-white" />

        <div className="relative max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('gallery.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className={`m-20 flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl shadow-blue-500/25'
                    : 'bg-white/10 backdrop-blur-sm text-black hover:bg-gray-200/20 border border-black/20'
                } ${isRTL ? 'font-arabic' : ''}`}
                aria-pressed={activeFilter === filter}
                aria-label={`Filter by ${filter}`}
              >
                <span className="relative z-10">{t(`gallery.filters.${filter}`)}</span>
                {activeFilter === filter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                )}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Carousel */}
            {(activeFilter === 'all' || activeFilter === 'events') && carouselItems.length > 0 && (
              <div 
                className="md:col-span-2 lg:col-span-2 h-96 rounded-3xl overflow-hidden shadow-2xl group"
                onMouseEnter={pauseCarousel}
                onMouseLeave={resumeCarousel}
              >
                <div className="relative h-full">
                  {carouselItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        index === currentCarouselSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                    >
                      <div
                        className="relative h-full cursor-pointer"
                        onClick={() => openLightbox(galleryItems.findIndex(gi => gi.id === item.id))}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openLightbox(galleryItems.findIndex(gi => gi.id === item.id))}
                        aria-label={`View ${t(item.titleKey)} in lightbox`}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          style={{ opacity: 0 }}
                          onLoad={handleImageLoad}
                          onError={handleImageError}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>
                            <h3 className={`text-3xl font-bold mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                              {t(item.titleKey)}
                            </h3>
                            <p className={`text-lg text-blue-200 ${isRTL ? 'font-arabic text-right' : ''}`}>
                              {t(item.descriptionKey)}
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                          {index + 1} / {carouselItems.length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Gallery Items */}
            {filteredItems.map((item, index) => {
              // Skip carousel items when showing all
              if (activeFilter === 'all' && carouselItemIds.has(item.id)) {
                return null;
              }

              return (
                <div
                  key={item.id}
                  className={`group rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 cursor-pointer ${
                    visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                  aria-label={`View ${t(item.titleKey)} in lightbox`}
                >
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      style={{ opacity: 0 }}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>
                        <h3 className={`text-2xl font-bold mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {t(item.titleKey)}
                        </h3>
                        <p className={`text-sm text-blue-200 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {t(item.descriptionKey)}
                        </p>
                      </div>
                    </div>
                    <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-3 py-1 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      {t(`gallery.categories.${item.category}`)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {t('gallery.noResults')}
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Lightbox */}
        {lightboxOpen && filteredItems[currentImageIndex] && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <div className="relative max-w-6xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-200 z-10 p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>

              <img
                src={filteredItems[currentImageIndex]?.src}
                alt={filteredItems[currentImageIndex]?.alt}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />

              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl p-6 ${
                isRTL ? 'text-right' : 'text-left'
              }`}>
                <h3 
                  id="lightbox-title"
                  className={`text-2xl font-bold text-white mb-2 ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t(filteredItems[currentImageIndex]?.titleKey)}
                </h3>
                <p className={`text-blue-200 ${isRTL ? 'font-arabic' : ''}`}>
                  {t(filteredItems[currentImageIndex]?.descriptionKey)}
                </p>
              </div>

              {/* Navigation Arrows */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute top-1/2 -translate-y-1/2 left-4 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute top-1/2 -translate-y-1/2 right-4 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                {currentImageIndex + 1} / {filteredItems.length}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Gallery;