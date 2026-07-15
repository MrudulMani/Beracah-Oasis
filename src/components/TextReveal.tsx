import React, { useEffect, useState } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Triggers reveal automatically on mount after a tiny tick
    // This is 100% robust against zero-height container layout collapses
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const words = text.split(' ');

  return (
    <div
      className={`reveal-container ${className}`}
      style={{ display: 'inline-block', flexWrap: 'wrap' }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="reveal-wrapper"
          style={{ marginRight: '0.25em', verticalAlign: 'bottom' }}
        >
          <span
            className={`reveal-text ${wordClassName} ${isVisible ? 'reveal-active' : ''}`}
            style={{
              transitionDelay: `${delay + index * 50}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
