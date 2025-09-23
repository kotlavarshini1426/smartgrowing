import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  image: string;
  onClick: () => void;
  className?: string;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  image,
  onClick,
  className,
}: FeatureCardProps) => {
  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:scale-105 glow-on-hover animate-fade-in",
        "bg-gradient-card border-primary/20 shadow-feature",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="relative mb-4 mx-auto w-20 h-20 rounded-full overflow-hidden feature-icon">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
        <h3 className="text-farmer font-bold text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};