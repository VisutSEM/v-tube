'use client';

import React, { useState, useEffect } from 'react';
import { Video } from '@/types';
import {
  HistoryItem,
  getWatchHistory,
  removeFromWatchHistory,
  clearWatchHistory,
} from '@/lib/history';
import {
  HistoryIcon,
  TrashIcon,
  SearchIcon,
  CloseIcon,
  PlayIcon,
  CheckBadgeIcon,
} from './Icons';

type HistoryViewProps = {
  onSelectVideo: (video: Video) => void;
  onGoHome: () => void;
};

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

export default function HistoryView({ onSelectVideo, onGoHome }: HistoryViewProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setHistory(getWatchHistory());
  }, []);

  const handleRemoveItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = removeFromWatchHistory(id);
    setHistory(updated);
  };

  const handleClearAll = () => {
    clearWatchHistory();
    setHistory([]);
    setShowClearConfirm(false);
  };

  const filteredHistory = history.filter((item) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.channel.name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6">
      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#212121] p-6 text-[#f1f1f1] shadow-2xl border border-[#383838]">
            <h3 className="text-lg font-bold">Clear watch history?</h3>
            <p className="mt-2 text-sm text-[#aaaaaa]">
              Your watch history will be cleared from this browser. You won&apos;t be able to undo this.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="rounded-full px-4 py-2 text-sm font-medium hover:bg-[#383838] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="rounded-full bg-[#3ea6ff] px-4 py-2 text-sm font-medium text-black hover:bg-[#65b8ff] transition cursor-pointer"
              >
                Clear watch history
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main List */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between pb-4 border-b border-[#272727] mb-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <HistoryIcon className="h-7 w-7 text-[#3ea6ff]" />
              <span>Watch history</span>
            </h1>
            <span className="text-sm text-[#aaaaaa]">
              {history.length} {history.length === 1 ? 'video' : 'videos'}
            </span>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#181818] text-[#aaaaaa] mb-4">
                <HistoryIcon className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {searchFilter ? 'No matching videos found' : 'No watch history yet'}
              </h3>
              <p className="mt-1 text-sm text-[#aaaaaa] max-w-sm mx-auto">
                {searchFilter
                  ? 'Try searching with different keywords.'
                  : 'Videos you watch or listen to will appear here automatically.'}
              </p>
              {!searchFilter && (
                <button
                  onClick={onGoHome}
                  className="mt-6 rounded-full bg-[#3ea6ff] px-6 py-2.5 text-sm font-semibold text-black hover:bg-[#65b8ff] transition cursor-pointer"
                >
                  Explore videos
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectVideo(item)}
                  className="group relative flex flex-col sm:flex-row gap-4 rounded-xl p-2.5 hover:bg-[#212121] transition-colors cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-[246px] aspect-video shrink-0 overflow-hidden rounded-xl bg-[#272727]">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute bottom-1.5 right-1.5 rounded-[4px] bg-black/85 px-1.5 py-0.5 text-[12px] font-medium text-white">
                      {item.duration}
                    </span>
                    {/* Hover play icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white">
                        <PlayIcon className="h-5 w-5 ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-start min-w-0 pr-8">
                    <h3 className="text-[16px] font-semibold text-white line-clamp-2 leading-snug group-hover:text-[#3ea6ff] transition-colors">
                      {item.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-[13px] text-[#aaaaaa]">
                      <span>{item.channel.name}</span>
                      {item.channel.verified && <CheckBadgeIcon className="h-3 w-3" />}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[12px] text-[#aaaaaa]">
                      <span>{item.views} views</span>
                      <span>•</span>
                      <span className="text-[#3ea6ff] font-medium">
                        Listened {formatTimeAgo(item.watchedAt)}
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] text-[#888888] line-clamp-2 hidden sm:block">
                      {item.description}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => handleRemoveItem(e, item.id)}
                    title="Remove from watch history"
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-[#aaaaaa] hover:bg-[#383838] hover:text-white transition cursor-pointer"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Action Sidebar (Desktop) */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-4">
          {/* Search history input */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
            <input
              type="text"
              placeholder="Search watch history"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full rounded-full border border-[#383838] bg-[#121212] pl-9 pr-9 py-2 text-sm text-white placeholder-[#888888] focus:border-[#3ea6ff] focus:outline-none"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="rounded-2xl bg-[#181818] p-4 border border-[#272727] space-y-2">
            <button
              onClick={() => setShowClearConfirm(true)}
              disabled={history.length === 0}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition cursor-pointer ${
                history.length === 0
                  ? 'text-[#555555] cursor-not-allowed'
                  : 'text-white hover:bg-[#272727]'
              }`}
            >
              <TrashIcon className="h-5 w-5 text-red-500" />
              <span>Clear all watch history</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
