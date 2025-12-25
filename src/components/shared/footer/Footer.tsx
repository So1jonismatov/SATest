import features from "@/data/home-page/footer";

export const Footer = () => {
  return (
    <footer className="w-full p-8 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Platform Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 ${feature.bgClass} rounded-lg flex items-center justify-center mb-2`}
              >
                {feature.icon}
              </div>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
