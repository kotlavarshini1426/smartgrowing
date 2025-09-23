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

interface PesticideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const crops = [
  { value: 'rice', label: 'Rice' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'maize', label: 'Maize' },
  { value: 'tomato', label: 'Tomato' },
];

const pesticideData = {
  rice: {
    pesticide: 'Chlorpyrifos 50% + Cypermethrin 5% EC',
    pesticideAmount: '400ml per acre',
    fertilizer: 'NPK 20:20:0 + Urea',
    fertilizerAmount: '50kg NPK + 25kg Urea per acre',
    safetyTips: [
      'Wear protective clothing and mask during application',
      'Do not spray during windy conditions',
      'Maintain 15-day gap before harvest',
      'Store chemicals away from food and children'
    ]
  },
  wheat: {
    pesticide: 'Imidacloprid 17.8% SL',
    pesticideAmount: '200ml per acre',
    fertilizer: 'DAP + Urea + MOP',
    fertilizerAmount: '50kg DAP + 30kg Urea + 20kg MOP per acre',
    safetyTips: [
      'Apply early morning or late evening',
      'Use proper nozzles for uniform spray',
      'Follow prescribed waiting period',
      'Read label instructions carefully'
    ]
  },
  cotton: {
    pesticide: 'Acetamiprid 20% SP',
    pesticideAmount: '50g per acre',
    fertilizer: 'NPK 19:19:19 + Boron',
    fertilizerAmount: '60kg NPK + 1kg Boron per acre',
    safetyTips: [
      'Rotate different groups of pesticides',
      'Monitor for beneficial insects',
      'Use IPM practices',
      'Dispose empty containers safely'
    ]
  },
  maize: {
    pesticide: 'Thiamethoxam 25% WG',
    pesticideAmount: '100g per acre',
    fertilizer: 'Urea + SSP + MOP',
    fertilizerAmount: '40kg Urea + 60kg SSP + 25kg MOP per acre',
    safetyTips: [
      'Avoid application during flowering',
      'Use clean water for spray preparation',
      'Check equipment before use',
      'Maintain spray records'
    ]
  },
  tomato: {
    pesticide: 'Emamectin Benzoate 5% SG',
    pesticideAmount: '80g per acre',
    fertilizer: 'NPK 19:19:19 + Calcium Nitrate',
    fertilizerAmount: '40kg NPK + 20kg Calcium Nitrate per acre',
    safetyTips: [
      'Start application at early pest stage',
      'Ensure good coverage of plant parts',
      'Use sticker-spreader for better adhesion',
      'Follow resistance management strategy'
    ]
  }
};

export const PesticideModal = ({ isOpen, onClose }: PesticideModalProps) => {
  const { t } = useTranslation();
  const [cropType, setCropType] = useState('');
  const [fieldArea, setFieldArea] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const getRecommendation = () => {
    if (!cropType || !fieldArea) return;
    
    const data = pesticideData[cropType as keyof typeof pesticideData];
    const area = parseFloat(fieldArea);
    
    setRecommendation({
      crop: crops.find(c => c.value === cropType)?.label,
      area: area,
      ...data
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-farmer text-primary">
            {t('features.pesticide.modal.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-farmer">{t('features.pesticide.modal.cropType')}</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger className="border-primary/20">
                  <SelectValue placeholder={t('features.pesticide.modal.selectCrop')} />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary/20">
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-farmer">{t('features.pesticide.modal.fieldArea')}</Label>
              <Input
                type="number"
                placeholder="0"
                value={fieldArea}
                onChange={(e) => setFieldArea(e.target.value)}
                className="border-primary/20"
              />
            </div>
          </div>

          <Button 
            onClick={getRecommendation}
            disabled={!cropType || !fieldArea}
            className="w-full bg-gradient-primary hover:opacity-90 text-farmer"
          >
            {t('features.pesticide.modal.getRecommendation')}
          </Button>

          {recommendation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-farmer text-primary">
                    {t('features.pesticide.modal.pesticideRecommendation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold text-farmer">{recommendation.pesticide}</p>
                  <p className="text-muted-foreground">
                    <strong>Dosage:</strong> {recommendation.pesticideAmount}
                  </p>
                  <p className="text-muted-foreground">
                    <strong>For {recommendation.area} acres:</strong> {recommendation.pesticideAmount.split(' ')[0] * recommendation.area}{recommendation.pesticideAmount.split(' ')[1]}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-farmer text-primary">
                    {t('features.pesticide.modal.fertilizerRecommendation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold text-farmer">{recommendation.fertilizer}</p>
                  <p className="text-muted-foreground">
                    <strong>Dosage:</strong> {recommendation.fertilizerAmount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Apply in 2-3 split doses during the growing season
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 bg-destructive/10 border-destructive/30">
                <CardHeader>
                  <CardTitle className="text-farmer text-destructive">
                    {t('features.pesticide.modal.safetyTips')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recommendation.safetyTips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-farmer">
                        <span className="text-destructive font-bold">⚠</span>
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