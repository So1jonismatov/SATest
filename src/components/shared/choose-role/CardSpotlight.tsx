import { CardSpotlight } from "@/components/ui/card-spotlight";
import { type CardSpotlightComponentProps } from "@/types";

export const CardSpotlightComponent = ({
  icon,
  title,
  description,
  gradientClasses,
}: CardSpotlightComponentProps) => {
  return (
    <CardSpotlight className="bg-card rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-border aspect-[5/6] flex flex-col justify-center">
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 ${gradientClasses} rounded-xl flex items-center justify-center mx-auto mb-6 transition-all duration-300`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-card-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </CardSpotlight>
  );
};
