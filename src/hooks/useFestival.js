import { useContext } from 'react';
import { FestivalContext } from '../contexts/FestivalContext';

/**
 * Custom hook to consume the centralized FestivalContext state.
 */
export function useFestival() {
  const context = useContext(FestivalContext);
  if (!context) {
    throw new Error('useFestival must be used within a FestivalProvider');
  }
  return context;
}
