import React, { useEffect, useRef, useState } from 'react';

interface DesmosCalculatorProps {
  width?: string;
  height?: string;
  options?: any;
}

const DesmosCalculator: React.FC<DesmosCalculatorProps> = ({
  width = '100%',
  height = '100%',
  options = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCalculator = () => {
      if (containerRef.current && window.Desmos) {
        // If a calculator instance already exists, destroy it before creating a new one.
        if (calculatorRef.current) {
          calculatorRef.current.destroy();
        }
        
        const calc = window.Desmos.GraphingCalculator(
          containerRef.current,
          {
            keypad: true,
            expressions: true,
            zoomFit: true,
            ...options,
          }
        );
        calculatorRef.current = calc;
        setIsLoading(false);
      }
    };

    const scriptId = 'desmos-api-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (window.Desmos) {
      initializeCalculator();
    } else if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.desmos.com/api/v1.7/calculator.js?apiKey=6b57546019eb4605841473de1be06e34';
      script.async = true;
      document.head.appendChild(script);
      script.onload = initializeCalculator;
    } else {
      script.addEventListener('load', initializeCalculator);
    }

    return () => {
      if (calculatorRef.current) {
        calculatorRef.current.destroy();
        calculatorRef.current = null;
      }
      if (script) {
        script.removeEventListener('load', initializeCalculator);
      }
    };
  }, [options]);

  return (
    <div className="desmos-calculator-container w-full h-full">
      {isLoading && <div className="p-4 text-center">Loading calculator...</div>}
      <div ref={containerRef} style={{ width, height }} />
    </div>
  );
};

export default DesmosCalculator;