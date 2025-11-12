import React, { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';

export type CompletionAnimationType = 'confetti' | 'fade' | 'zoom' | 'none';

export interface CompletionAnimationProps {
  /** Type of animation to show */
  animationType: CompletionAnimationType;
  /** Custom class name for styling */
  className?: string;
  /** Duration in milliseconds before auto-hiding (0 = don't auto-hide) */
  duration?: number;
  /** Callback when animation completes */
  onAnimationComplete?: () => void;
  /** Custom message to display */
  message?: string;
}

const CompletionAnimation: FC<CompletionAnimationProps> = ({
  animationType,
  className = '',
  duration = 3000,
  onAnimationComplete,
  message = 'Puzzle Complete! 🎉',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onAnimationComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onAnimationComplete]);

  if (!isVisible || animationType === 'none') return null;

  const animationClass = {
    confetti: styles.confetti,
    fade: styles.fade,
    zoom: styles.zoom,
    none: '',
  }[animationType];

  return (
    <div className={`${styles.completionOverlay} ${animationClass} ${className}`}>
      {animationType === 'confetti' && (
        <div className={styles.confettiContainer}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={styles.confettiPiece}
              style={{
                '--delay': `${Math.random() * 0.5}s`,
                '--x': `${Math.random() * 100}vw`,
                '--rotation': `${Math.random() * 360}deg`,
                '--color': ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'][
                  Math.floor(Math.random() * 6)
                ],
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default CompletionAnimation;

