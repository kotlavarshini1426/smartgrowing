import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MarketPricesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const marketData = {
  rice: {
    currentPrice: 25,
    yesterdayPrice: 24,
    weeklyTrend: '+4.2%',
    history: [21, 22, 23, 24, 25, 24, 25]
  },
  wheat: {
    currentPrice: 22,
    yesterdayPrice: 23,
    weeklyTrend: '-2.1%',
    history: [24, 23, 22, 23, 22, 23, 22]
  },
  tomato: {
    currentPrice: 40,
    yesterdayPrice: 35,
    weeklyTrend: '+14.3%',
    history: [35, 36, 38, 37, 40, 35, 40]
  },
  onion: {
    currentPrice: 30,
    yesterdayPrice: 32,
    weeklyTrend: '-6.3%',
    history: [32, 31, 30, 32, 30, 32, 30]
  },
  potato: {
    currentPrice: 18,
    yesterdayPrice: 17,
    weeklyTrend: '+5.9%',
    history: [17, 16, 17, 18, 17, 17, 18]
  }
};

const crops = [
  { value: 'rice', label: 'Rice' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'onion', label: 'Onion' },
  { value: 'potato', label: 'Potato' },
];

export const MarketPricesModal = ({ isOpen, onClose }: MarketPricesModalProps) => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState('rice');

  const currentData = marketData[selectedCrop as keyof typeof marketData];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-farmer text-primary">
            {t('features.market.modal.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="border-primary/20">
                <SelectValue placeholder={t('features.market.modal.selectCrop')} />
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

          {currentData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-farmer text-primary">
                    {t('features.market.modal.currentPrice')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">₹{currentData.currentPrice}</p>
                  <p className="text-muted-foreground text-sm">per kg</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-farmer text-primary">
                    {t('features.market.modal.yesterdayPrice')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-muted-foreground">₹{currentData.yesterdayPrice}</p>
                  <p className="text-muted-foreground text-sm">per kg</p>
                </CardContent>
              </Card>

              <Card className={`border ${currentData.weeklyTrend.startsWith('+') ? 'bg-success/10 border-success/30' : 'bg-destructive/10 border-destructive/30'}`}>
                <CardHeader>
                  <CardTitle className="text-farmer">
                    {t('features.market.modal.weeklyTrend')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${currentData.weeklyTrend.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {currentData.weeklyTrend}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {currentData && (
            <Card className="bg-accent/20 border-accent/30">
              <CardHeader>
                <CardTitle className="text-farmer text-accent-foreground">
                  {t('features.market.modal.priceHistory')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end h-32 gap-2">
                  {currentData.history.map((price, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="bg-primary/70 w-full rounded-t transition-all duration-300"
                        style={{ 
                          height: `${(price / Math.max(...currentData.history)) * 100}%`,
                          minHeight: '20%'
                        }}
                      />
                      <p className="text-xs text-accent-foreground mt-1">₹{price}</p>
                      <p className="text-xs text-muted-foreground">Day {index + 1}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};