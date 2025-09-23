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

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeatherModal = ({ isOpen, onClose }: WeatherModalProps) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    // Mock weather data - in real app this would call an API
    setTimeout(() => {
      setWeatherData({
        location: location,
        temperature: 28,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 12,
        forecast: [
          { day: 'Today', temp: 28, condition: 'Sunny' },
          { day: 'Tomorrow', temp: 26, condition: 'Partly Cloudy' },
        ],
        irrigationAdvice: 'Light watering recommended in the evening. Soil moisture is adequate.'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-farmer text-primary">
            {t('features.weather.modal.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-farmer">
              {t('features.weather.modal.location')}
            </Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder={t('features.weather.modal.enterLocation')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 text-farmer border-primary/20"
              />
              <Button 
                onClick={getWeather}
                disabled={loading || !location.trim()}
                className="bg-gradient-primary hover:opacity-90 text-farmer"
              >
                {loading ? t('common.loading') : t('features.weather.modal.getWeather')}
              </Button>
            </div>
          </div>

          {weatherData && (
            <div className="grid gap-4 animate-fade-in">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-farmer text-primary">
                    {weatherData.location}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{weatherData.temperature}°C</p>
                    <p className="text-muted-foreground text-sm">{t('features.weather.modal.currentTemp')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-farmer font-semibold">{weatherData.condition}</p>
                    <p className="text-muted-foreground text-sm">{t('features.weather.modal.condition')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-farmer font-semibold">{weatherData.humidity}%</p>
                    <p className="text-muted-foreground text-sm">{t('features.weather.modal.humidity')}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-farmer font-semibold">{weatherData.windSpeed} km/h</p>
                    <p className="text-muted-foreground text-sm">{t('features.weather.modal.windSpeed')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/20 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-farmer text-accent-foreground">
                    {t('features.weather.modal.irrigationAdvice')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-farmer">{weatherData.irrigationAdvice}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-farmer text-primary">
                    {t('features.weather.modal.forecast')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {weatherData.forecast.map((day: any, index: number) => (
                    <div key={index} className="text-center p-3 bg-primary/5 rounded-lg">
                      <p className="font-semibold text-farmer">{day.day}</p>
                      <p className="text-xl font-bold text-primary">{day.temp}°C</p>
                      <p className="text-muted-foreground text-sm">{day.condition}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};