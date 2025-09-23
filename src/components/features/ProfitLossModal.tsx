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

interface ProfitLossModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const crops = [
  { value: 'rice', label: 'Rice', yieldPerAcre: 2000, pricePerKg: 25 },
  { value: 'wheat', label: 'Wheat', yieldPerAcre: 1800, pricePerKg: 22 },
  { value: 'sugarcane', label: 'Sugarcane', yieldPerAcre: 35000, pricePerKg: 3 },
  { value: 'cotton', label: 'Cotton', yieldPerAcre: 400, pricePerKg: 60 },
  { value: 'maize', label: 'Maize', yieldPerAcre: 2500, pricePerKg: 18 },
];

export const ProfitLossModal = ({ isOpen, onClose }: ProfitLossModalProps) => {
  const { t } = useTranslation();
  const [cropType, setCropType] = useState('');
  const [landArea, setLandArea] = useState('');
  const [expenses, setExpenses] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateProfitLoss = () => {
    if (!cropType || !landArea || !expenses) return;
    
    const crop = crops.find(c => c.value === cropType);
    if (!crop) return;
    
    const area = parseFloat(landArea);
    const totalExpenses = parseFloat(expenses);
    const expectedYield = crop.yieldPerAcre * area;
    const expectedRevenue = expectedYield * crop.pricePerKg;
    const expectedProfit = expectedRevenue - totalExpenses;
    const profitMargin = ((expectedProfit / expectedRevenue) * 100).toFixed(1);
    
    setResults({
      expectedYield: expectedYield.toLocaleString(),
      expectedRevenue: expectedRevenue.toLocaleString(),
      expectedProfit: expectedProfit.toLocaleString(),
      profitMargin: profitMargin,
      cropName: crop.label
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-farmer text-primary">
            {t('features.profit.modal.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-farmer">{t('features.profit.modal.cropType')}</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger className="border-primary/20">
                  <SelectValue placeholder={t('features.profit.modal.selectCrop')} />
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
              <Label className="text-farmer">{t('features.profit.modal.landArea')}</Label>
              <Input
                type="number"
                placeholder="0"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
                className="border-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-farmer">{t('features.profit.modal.expenses')}</Label>
              <Input
                type="number"
                placeholder="0"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                className="border-primary/20"
              />
            </div>
          </div>

          <Button 
            onClick={calculateProfitLoss}
            disabled={!cropType || !landArea || !expenses}
            className="w-full bg-gradient-primary hover:opacity-90 text-farmer"
          >
            {t('features.profit.modal.calculate')}
          </Button>

          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-farmer text-primary">
                    {t('features.profit.modal.expectedYield')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{results.expectedYield} kg</p>
                  <p className="text-muted-foreground text-sm">{results.cropName}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-farmer text-primary">
                    {t('features.profit.modal.expectedRevenue')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">₹{results.expectedRevenue}</p>
                </CardContent>
              </Card>

              <Card className={`border ${parseFloat(results.expectedProfit.replace(/,/g, '')) >= 0 ? 'bg-success/10 border-success/30' : 'bg-destructive/10 border-destructive/30'}`}>
                <CardHeader>
                  <CardTitle className="text-farmer">
                    {t('features.profit.modal.expectedProfit')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${parseFloat(results.expectedProfit.replace(/,/g, '')) >= 0 ? 'text-success' : 'text-destructive'}`}>
                    ₹{results.expectedProfit}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-accent/20 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-farmer text-accent-foreground">
                    {t('features.profit.modal.profitMargin')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-accent-foreground">{results.profitMargin}%</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};