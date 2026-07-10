import React, { createContext } from 'react';
import { festivalConfig } from '../config/festivalConfig';
import { getLocalDateString } from '../utils/festivalUtils';

export const FestivalContext = createContext();

/**
 * FestivalProvider encapsulates active day configuration, accent color overrides,
 * and maintains compatibility with static page requirements.
 */
export function FestivalProvider({ children }) {
  const activeDay = festivalConfig.days[0]; // Set Explore as the single static theme
  const todayStr = getLocalDateString();
  const countdownVisible = todayStr < activeDay.date;

  const value = {
    mode: todayStr < activeDay.date ? 'before' : (todayStr > festivalConfig.endDate ? 'completed' : 'live'),
    activeDay,
    accent: activeDay.accent,
    themeName: activeDay.theme,
    countdownVisible,
    today: todayStr,
    festivalStarted: todayStr >= activeDay.date,
    festivalCompleted: todayStr > festivalConfig.endDate,
    startDate: festivalConfig.startDate,
    endDate: festivalConfig.endDate,
    days: festivalConfig.days,
    forcedDayId: null,
    setForcedDayId: () => {},
    resetToAuto: () => {},
    setTheme: () => {}
  };

  return (
    <FestivalContext.Provider value={value}>
      {children}
    </FestivalContext.Provider>
  );
}

