import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CropAdvisoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const soilTypes = [
  { value: 'clay', label: 'Clay Soil' },
  { value: 'sandy', label: 'Sandy Soil' },
  { value: 'loamy', label: 'Loamy Soil' },
  { value: 'black', label: 'Black Soil' },
  { value: 'red', label: 'Red Soil' },
];

const seasons = [
  { value: 'kharif', label: 'Kharif (Monsoon)' },
  { value: 'rabi', label: 'Rabi (Winter)' },
  { value: 'zaid', label: 'Zaid (Summer)' },
];

const advisoryData = {
  'clay-kharif': {
    crops: ['Rice', 'Sugarcane', 'Jute'],
    tips: ['Clay soil retains water well, perfect for rice cultivation', 'Ensure proper drainage to prevent waterlogging', 'Use organic matter to improve soil structure']
  },
  'sandy-kharif': {
    crops: ['Millet', 'Groundnut', 'Cotton'],
    tips: ['Sandy soil drains quickly, suitable for drought-resistant crops', 'Regular irrigation needed', 'Add compost to improve water retention']
  },
  'loamy-kharif': {
    crops: ['Maize', 'Soybean', 'Cotton', 'Sugarcane'],
    tips: ['Ideal soil for most crops', 'Maintains good moisture and drainage balance', 'Regular fertilization recommended']
  },
  'black-kharif': {
    crops: ['Cotton', 'Soybean', 'Maize', 'Sugarcane'],
    tips: ['Rich in nutrients, excellent for cotton', 'Good water retention capacity', 'Avoid excessive tillage']
  },
  'red-kharif': {
    crops: ['Millet', 'Groundnut', 'Cotton', 'Tobacco'],
    tips: ['Well-drained soil, good for dryland crops', 'May need lime treatment for acidity', 'Organic matter addition beneficial']
  }
};

export const CropAdvisoryModal = ({ isOpen, onClose }: CropAdvisoryModalProps) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [advisory, setAdvisory] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    if (!location.trim() || !soilType || !season) return;
    
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      const key = `${soilType}-${season}` as keyof typeof advisoryData;
      const data = advisoryData[key] || advisoryData['loamy-kharif'];
      
      setAdvisory({
        location,
        soilType: soilTypes.find(s => s.value === soilType)?.label,
        season: seasons.find(s => s.value === season)?.label,
        recommendedCrops: data.crops,
        tips: data.tips
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-farmer text-primary">
            {t('features.advisory.modal.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-farmer">{t('features.advisory.modal.location')}</Label>
              <Input
                placeholder={t('features.advisory.modal.enterLocation')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-farmer">{t('features.advisory.modal.soilType')}</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger className="border-primary/20">
                  <SelectValue placeholder={t('features.advisory.modal.selectSoil')} />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary/20">
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.value} value={soil.value}>
                      {soil.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-farmer">{t('features.advisory.modal.season')}</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger className="border-primary/20">
                  <SelectValue placeholder={t('features.advisory.modal.selectSeason')} />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary/20">
                  {seasons.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={getAdvice}
            disabled={loading || !location.trim() || !soilType || !season}
            className="w-full bg-gradient-primary hover:opacity-90 text-farmer"
          >
            {loading ? t('common.loading') : t('features.advisory.modal.getAdvice')}
          </Button>

          {advisory && (
            <div className="space-y-4 animate-fade-in">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-farmer text-primary">
                    {t('features.advisory.modal.recommendedCrops')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {advisory.recommendedCrops.map((crop: string, index: number) => (
                      <div key={index} className="bg-primary/10 text-primary text-center py-2 px-3 rounded-lg font-semibold">
                        {crop}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p><strong>Location:</strong> {advisory.location}</p>
                    <p><strong>Soil Type:</strong> {advisory.soilType}</p>
                    <p><strong>Season:</strong> {advisory.season}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/20 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-farmer text-accent-foreground">
                    {t('features.advisory.modal.tips')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {advisory.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-farmer">
                        <span className="text-accent-foreground font-bold">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};