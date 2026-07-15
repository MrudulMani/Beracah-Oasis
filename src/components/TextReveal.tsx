import React from 'react';

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
            className={`reveal-text-anim ${wordClassName}`}
            style={{
              animationDelay: `${delay + index * 60}ms`,
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
