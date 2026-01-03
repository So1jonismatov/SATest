import React, { useEffect, useRef, useState } from 'react';

interface DesmosCalculatorProps {
  width?: number;
  height?: number;
  options?: any; // Desmos calculator options
}

const DesmosCalculator: React.FC<DesmosCalculatorProps> = ({ 
  width = 600, 
  height = 400, 
  options = {} 
}) => {
  const calculatorContainerRef = useRef<HTMLDivElement>(null);
  const [calculator, setCalculator] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDesmos = async () => {
      if (typeof window !== 'undefined' && window.Desmos) {
        // Desmos is already loaded
        if (calculatorContainerRef.current) {
          const calc = new window.Desmos.GraphingCalculator(
            calculatorContainerRef.current,
            {
              keypad: true,
              expressions: true,
              zoomFit: true,
              ...options
            }
          );
          setCalculator(calc);
          setIsLoading(false);
        }
      } else {
        // Load Desmos script dynamically if not already loaded
        const script = document.createElement('script');
        script.src = 'https://www.desmos.com/api/v1.7/calculator.js?apiKey=dcb100becaa282e51540091770e3a79a';
        script.async = true;
        
        script.onload = () => {
          if (calculatorContainerRef.current && window.Desmos) {
            const calc = new window.Desmos.GraphingCalculator(
              calculatorContainerRef.current,
              {
                keypad: true,
                expressions: true,
                zoomFit: true,
                ...options
              }
            );
            setCalculator(calc);
            setIsLoading(false);
          }
        };
        
        document.head.appendChild(script);
        
        // Cleanup
        return () => {
          document.head.removeChild(script);
        };
      }
    };

    loadDesmos();
    
    // Cleanup function
    return () => {
      if (calculator) {
        calculator.destroy();
      }
    };
  }, []);

  return (
    <div className="desmos-calculator-container">
      {isLoading && <div className="p-4 text-center">Loading calculator...</div>}
      <div 
        ref={calculatorContainerRef} 
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
};

export default DesmosCalculator;