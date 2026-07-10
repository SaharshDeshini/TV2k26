import React from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import { GOLDEN_EASE } from '../../animations/variants';
import Counter from '../ui/Counter';
import { useHeroScroll } from '../../contexts/HeroScrollContext';

/**
 * HeroCountdown renders a premium countdown card.
 * Automatically hides when the festival starts (countdownVisible=false).
 */
export default function HeroCountdown({
  isMobile = false,
  startDate,
  countdownVisible,
  accent,
  delay = 0.9,
  animateState = 'hidden',
  isTransitioning = false, // Day transition state intercept
}) {
  const timeLeft = useCountdown(`${startDate}T09:00:00`);
  const sceneProgress = useHeroScroll();

  // Scroll transition mapping (Progress 0% to 40%)
  const yScroll = useTransform(sceneProgress, [0, 0.40], [0, isMobile ? 0 : -40]);
  const opacityScroll = useTransform(sceneProgress, [0, 0.40], [1, isMobile ? 1 : 0]);
  const pointerEventsScroll = useTransform(sceneProgress, (p) => p > 0.40 ? (isMobile ? 'auto' : 'none') : 'auto');

  const padTwo = (n) => String(n).padStart(2, '0');

  const units = [
    { label: 'DAYS', value: padTwo(timeLeft.days) },
    { label: 'HRS', value: padTwo(timeLeft.hours) },
    { label: 'MIN', value: padTwo(timeLeft.minutes) },
    { label: 'SEC', value: padTwo(timeLeft.seconds) },
  ];

  const pillVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: [0, -5, 0],
      transition: {
        opacity: { duration: 1.0, delay, ease: GOLDEN_EASE },
        y: {
          duration: 7.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay,
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {countdownVisible && (
        <motion.div
          style={{ y: yScroll, opacity: opacityScroll, pointerEvents: pointerEventsScroll }}
          className="mb-6 sm:mb-8 mt-[-22px] sm:mt-[-34px]" // Lifted 10px higher
        >
          <motion.div
            variants={pillVariants}
            initial="hidden"
            animate={
              isTransitioning 
                ? { opacity: 0.25, scale: 0.94, y: -8 } 
                : animateState
            }
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.6, ease: GOLDEN_EASE } }}
          >
            <div 
              className="inline-flex items-center gap-3 sm:gap-4 px-4.5 sm:px-5 py-2 sm:py-2.5 border rounded-[22px] backdrop-blur-md relative overflow-hidden" // Reduced padding for compact layout
              style={{
                background: 'linear-gradient(180deg, rgba(32, 24, 15, 0.55) 0%, rgba(20, 14, 8, 0.70) 100%)', // Premium warm bronze glass
                borderColor: 'rgba(255, 201, 88, 0.14)', // Subtle amber border outline
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45), inset 0 1px 1.5px rgba(255, 255, 255, 0.05), inset 0 -1px 8px rgba(255, 201, 88, 0.04)', // Inner shadow
              }}
            >
              {/* Cursor-reactive glass reflection */}
              <div className="tv-countdown-reflection" />

              {/* T-Minus Label */}
              <span
                className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.2em] relative z-10"
                style={{ color: '#8d94a0' }} // Clean, high-contrast label color
              >
                T-Minus
              </span>

              {/* Divider */}
              <div className="w-px h-4 bg-neutral-800/60 relative z-10" />

              {/* Time Units */}
              <div className="flex items-center gap-1.5 sm:gap-2 relative z-10">
                {units.map((unit, i) => (
                  <React.Fragment key={unit.label}>
                    <div className="flex flex-col items-center min-w-[28px] sm:min-w-[34px]">
                      <Counter
                        value={parseInt(unit.value, 10)}
                        places={[10, 1]}
                        fontSize={16}
                        fontWeight={600}
                        textColor="#ffffff" // Higher contrast white text
                        padding={0}
                        gap={1}
                        borderRadius={2}
                        horizontalPadding={0}
                        gradientHeight={0}
                        gradientFrom="transparent"
                        gradientTo="transparent"
                        digitStyle={{
                          // Monospace font family stack for layout stability
                          fontFamily: "'JetBrains Mono', 'IBM Plex Mono', 'Geist Mono', monospace",
                          // Soft warm amber glow text shadow
                          filter: 'drop-shadow(0 0 5px rgba(255, 201, 88, 0.40))',
                        }}
                      />
                      <span 
                        className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.15em] mt-0.5"
                        style={{ color: '#777D87' }}
                      >
                        {unit.label}
                      </span>
                    </div>
                    {i < units.length - 1 && (
                      <span 
                        className="font-light text-xs sm:text-sm -mt-2 select-none" // Restored compact spacing (removed px-1)
                        style={{ color: 'rgba(119, 125, 135, 0.35)' }}
                      >
                        :
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
