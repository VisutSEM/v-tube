import { Video } from '@/types';

export interface HistoryItem extends Video {
  watchedAt: number;
}

const HISTORY_KEY = 'vtube_watch_history';

export function getWatchHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read watch history', e);
    return [];
  }
}

export function addToWatchHistory(video: Video): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getWatchHistory();
    // Remove if already present (to move to front)
    const filtered = current.filter((item) => item.id !== video.id);
    const updated: HistoryItem[] = [
      {
        ...video,
        watchedAt: Date.now(),
      },
      ...filtered,
    ].slice(0, 100); // Keep last 100 watched videos

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save to watch history', e);
    return [];
  }
}

export function removeFromWatchHistory(videoId: string): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getWatchHistory();
    const updated = current.filter((item) => item.id !== videoId);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove from watch history', e);
    return [];
  }
}

export function clearWatchHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear watch history', e);
  }
}
