import React, { useEffect, useRef } from 'react';

interface MathJaxProps {
  children: string;
  inline?: boolean;
}

const MathJax: React.FC<MathJaxProps> = ({ children, inline = false }) => {
  const mathRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const renderMath = async () => {
      if (typeof window !== 'undefined' && window.MathJax) {
        const mathjax = window.MathJax;
        if (mathRef.current) {
          if (inline) {
            mathjax.typesetPromise([mathRef.current]);
          } else {
            mathjax.typesetPromise([mathRef.current]);
          }
        }
      }
    };

    renderMath();
  }, [children, inline]);

  return (
    <span
      ref={mathRef}
      dangerouslySetInnerHTML={{
        __html: inline ? `\\(${children}\\)` : `\\[${children}\\]`,
      }}
    />
  );
};

export default MathJax;