import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/LanguageSelector';
import { FeatureCard } from '@/components/FeatureCard';
import { WeatherModal } from '@/components/features/WeatherModal';
import { ProfitLossModal } from '@/components/features/ProfitLossModal';
import { MarketPricesModal } from '@/components/features/MarketPricesModal';
import { CropAdvisoryModal } from '@/components/features/CropAdvisoryModal';
import { PesticideModal } from '@/components/features/PesticideModal';
import { DiseaseDetectionModal } from '@/components/features/DiseaseDetectionModal';

// Import images
import heroImage from '@/assets/smart-farm-hero.jpg';
import weatherImage from '@/assets/weather-prediction.jpg';
import profitImage from '@/assets/profit-loss.jpg';
import marketImage from '@/assets/market-prices.jpg';
import advisoryImage from '@/assets/crop-advisory.jpg';
import pesticideImage from '@/assets/pesticide-fertilizer.jpg';
import diseaseImage from '@/assets/disease-detection.jpg';

const Index = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const features = [
    {
      id: 'weather',
      icon: '☀️🌧',
      image: weatherImage,
      title: t('features.weather.title'),
      description: t('features.weather.description'),
    },
    {
      id: 'profit',
      icon: '💰🌾',
      image: profitImage,
      title: t('features.profit.title'),
      description: t('features.profit.description'),
    },
    {
      id: 'market',
      icon: '📈🥕',
      image: marketImage,
      title: t('features.market.title'),
      description: t('features.market.description'),
    },
    {
      id: 'advisory',
      icon: '📋🌱',
      image: advisoryImage,
      title: t('features.advisory.title'),
      description: t('features.advisory.description'),
    },
    {
      id: 'pesticide',
      icon: '🧴🌿',
      image: pesticideImage,
      title: t('features.pesticide.title'),
      description: t('features.pesticide.description'),
    },
    {
      id: 'disease',
      icon: '🔬🍂',
      image: diseaseImage,
      title: t('features.disease.title'),
      description: t('features.disease.description'),
    },
  ];

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-primary/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🌱</span>
              </div>
              <div>
                <h1 className="text-farmer font-bold text-primary text-xl">
                  {t('appTitle')}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {t('appSubtitle')}
                </p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Smart Farming Hero" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-in">
            {t('appTitle')}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            {t('appSubtitle')} - Empowering farmers with technology for better yields and sustainable practices
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                image={feature.image}
                onClick={() => openModal(feature.id)}
                className="animate-bounce-in"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-primary/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Smart Farming Platform. Empowering farmers with technology.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <WeatherModal 
        isOpen={activeModal === 'weather'} 
        onClose={closeModal} 
      />
      <ProfitLossModal 
        isOpen={activeModal === 'profit'} 
        onClose={closeModal} 
      />
      <MarketPricesModal 
        isOpen={activeModal === 'market'} 
        onClose={closeModal} 
      />
      <CropAdvisoryModal 
        isOpen={activeModal === 'advisory'} 
        onClose={closeModal} 
      />
      <PesticideModal 
        isOpen={activeModal === 'pesticide'} 
        onClose={closeModal} 
      />
      <DiseaseDetectionModal 
        isOpen={activeModal === 'disease'} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Index;