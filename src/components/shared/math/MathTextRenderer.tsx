import React from 'react';

interface MathTextRendererProps {
  text: string;
}

const MathTextRenderer: React.FC<MathTextRendererProps> = ({ text }) => {
  // Check if the text contains MathJax delimiters
  const containsMath = /\\\(|\\\[|\\\)|\\\]/.test(text);

  if (containsMath) {
    // If it contains MathJax, render as HTML with MathJax processing
    return (
      <span 
        className="arithmatex"
        dangerouslySetInnerHTML={{ 
          __html: text 
        }} 
      />
    );
  } else {
    // Otherwise, render as plain text
    return <span>{text}</span>;
  }
};

export default MathTextRenderer;