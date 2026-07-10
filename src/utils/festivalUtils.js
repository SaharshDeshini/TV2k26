/**
 * Get local date representation formatted as YYYY-MM-DD.
 * Sidesteps UTC timezone mismatch offsets.
 */
export function getLocalDateString(dateObj = new Date()) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates the active festival state based on the current date,
 * supporting dynamic N-days and dynamic or config-level overrides.
 */
export function calculateFestivalState(config, forcedDayId = null) {
  // 1. Sort days by date to ensure proper ordering
  const sortedDays = [...config.days].sort((a, b) => a.date.localeCompare(b.date));
  const firstDay = sortedDays[0];
  const lastDay = sortedDays[sortedDays.length - 1];

  // Determine date boundary properties
  const todayStr = getLocalDateString();
  const countdownVisible = todayStr < firstDay.date;
  
  let targetDay = null;
  let mode = 'before'; // 'before' | 'live' | 'completed'

  // Handle Override Logic (dynamic state forcedDayId has priority, then config.DEV_OVERRIDE)
  if (forcedDayId !== null) {
    const matched = sortedDays.find(d => d.id === Number(forcedDayId));
    if (matched) {
      targetDay = matched;
      mode = 'live';
    }
  } else if (config.DEV_OVERRIDE && config.FORCED_DAY) {
    const matched = sortedDays.find(d => d.id === Number(config.FORCED_DAY));
    if (matched) {
      targetDay = matched;
      mode = 'live';
    }
  }

  // If no override was active, determine state automatically based on today's local date
  if (!targetDay) {
    if (todayStr < firstDay.date) {
      mode = 'before';
      targetDay = firstDay;
    } else if (todayStr > lastDay.date) {
      mode = 'completed';
      targetDay = lastDay;
    } else {
      mode = 'live';
      
      // Auto-day logic: find the latest day whose date has arrived or passed
      // e.g. if today is 19th, it matches >=18th and >=19th. We choose 19th.
      for (let i = sortedDays.length - 1; i >= 0; i--) {
        if (todayStr >= sortedDays[i].date) {
          targetDay = sortedDays[i];
          break;
        }
      }
      
      // Fallback fallback
      if (!targetDay) {
        targetDay = firstDay;
      }
    }
  }

  const themeName = targetDay.name.toLowerCase(); // 'explore' | 'create' | 'celebrate'
  const accent = targetDay.accent;

  return {
    mode,
    activeDay: targetDay,
    accent,
    themeName,
    countdownVisible,
    today: todayStr,
    festivalStarted: mode === 'live' || mode === 'completed',
    festivalCompleted: mode === 'completed'
  };
}
