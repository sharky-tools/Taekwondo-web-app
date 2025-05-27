// src/App.tsx
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Programs from './components/Programs';
import WeeklySchedule from './components/WeeklySchedule';
import { useTranslation } from 'react-i18next';
import WhoWeAre from './components/WhoWeAre'
import Coach from './components/Coach';
import Gallery from './components/Gallery';

function App() {
  const { t, i18n } = useTranslation();

  // Get current language direction
  const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';

  return (
    <div className={`${isRTL ? 'font-arabic' : ''} min-h-screen`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero section with background image */}
      <div className="relative">
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: "url('/hero-bg.jpeg')",
        }}>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Dark overlay */}
        </div>
        <Header />
        <HeroSection />
      </div>
      <WhoWeAre />
      <Programs />
      <WeeklySchedule />
      <Coach />
      <Gallery />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;