import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface DiseaseDetectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const diseases = [
  {
    name: 'Bacterial Leaf Blight',
    severity: 'Moderate',
    treatment: 'Apply Copper Oxychloride 50% WP at 3g/liter of water. Ensure proper drainage and avoid overhead irrigation.',
    prevention: 'Use resistant varieties, maintain field hygiene, and follow crop rotation.'
  },
  {
    name: 'Brown Spot',
    severity: 'Mild',
    treatment: 'Spray Mancozeb 75% WP at 2g/liter. Apply during early morning or evening hours.',
    prevention: 'Use certified seeds, maintain balanced nutrition, and ensure proper spacing.'
  },
  {
    name: 'Leaf Blast',
    severity: 'High',
    treatment: 'Immediate application of Tricyclazole 75% WP at 0.6g/liter. Repeat after 15 days if needed.',
    prevention: 'Use blast-resistant varieties, avoid excessive nitrogen, and maintain proper water levels.'
  }
];

export const DiseaseDetectionModal = ({ isOpen, onClose }: DiseaseDetectionModalProps) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResults(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    
    setAnalyzing(true);
    // Mock AI analysis - in real app this would call an AI service
    setTimeout(() => {
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setResults({
        fileName: selectedFile.name,
        fileUrl: URL.createObjectURL(selectedFile),
        ...randomDisease,
        confidence: '87%'
      });
      setAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 'bg-success/10 border-success/30';
      case 'moderate': return 'bg-warning/10 border-warning/30';
      case 'high': return 'bg-destructive/10 border-destructive/30';
      default: return 'bg-muted/10 border-muted/30';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-farmer text-primary">
            {t('features.disease.modal.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-farmer">{t('features.disease.modal.uploadImage')}</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border-primary/20 cursor-pointer"
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <Button 
            onClick={analyzeImage}
            disabled={!selectedFile || analyzing}
            className="w-full bg-gradient-primary hover:opacity-90 text-farmer"
          >
            {analyzing ? t('features.disease.modal.analyzing') : t('features.disease.modal.analyze')}
          </Button>

          {results && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="bg-gradient-card border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-farmer text-primary">
                        {t('features.disease.modal.results')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('features.disease.modal.diseaseName')}</p>
                        <p className="font-bold text-farmer">{results.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Confidence</p>
                        <p className="font-bold text-primary">{results.confidence}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`border ${getSeverityBg(results.severity)}`}>
                    <CardHeader>
                      <CardTitle className="text-farmer">
                        {t('features.disease.modal.severity')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-xl font-bold ${getSeverityColor(results.severity)}`}>
                        {results.severity}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <img 
                    src={results.fileUrl} 
                    alt="Uploaded leaf" 
                    className="max-w-full max-h-48 rounded-lg border border-primary/20 object-contain"
                  />
                </div>
              </div>

              <Card className="bg-accent/20 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-farmer text-accent-foreground">
                    {t('features.disease.modal.treatment')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-farmer mb-3">{results.treatment}</p>
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-accent-foreground mb-1">Prevention:</p>
                    <p className="text-sm text-farmer">{results.prevention}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};