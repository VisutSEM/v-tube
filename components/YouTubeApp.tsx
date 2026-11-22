'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CategoryPills from '@/components/CategoryPills';
import VideoCard from '@/components/VideoCard';
import WatchView from '@/components/WatchView';
import HistoryView from '@/components/HistoryView';
import { VIDEOS, CATEGORIES } from '@/data/videos';
import { Video } from '@/types';
import { SearchIcon } from '@/components/Icons';

export default function YouTubeApp() {
  const [videos, setVideos] = useState<Video[]>(VIDEOS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isHistoryView, setIsHistoryView] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [submittedSearch, setSubmittedSearch] = useState<string>('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Fetch videos from API route (supports both live YouTube Data API and curated fallback)
  const loadVideos = useCallback(async (query?: string, category?: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (category && category !== 'All') params.set('category', category);

      const res = await fetch(`/api/videos?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos);
          setHasApiKey(Boolean(data.hasApiKey));
        }
      }
    } catch (err) {
      console.warn('Could not fetch from API, falling back to local data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load and URL param handling
  useEffect(() => {
    loadVideos(submittedSearch, activeCategory);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const videoId = params.get('v');
      const view = params.get('view');
      if (videoId) {
        const found = VIDEOS.find((v) => v.id === videoId);
        if (found) {
          setSelectedVideo(found);
        }
      } else if (view === 'history') {
        setIsHistoryView(true);
      }
    }
  }, [loadVideos, submittedSearch, activeCategory]);

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsHistoryView(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('v', video.id);
      url.searchParams.delete('view');
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenHistory = () => {
    setSelectedVideo(null);
    setIsHistoryView(true);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('v');
      url.searchParams.set('view', 'history');
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoHome = () => {
    setSelectedVideo(null);
    setIsHistoryView(false);
    setSearchQuery('');
    setSubmittedSearch('');
    setActiveCategory('All');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('v');
      url.searchParams.delete('view');
      window.history.pushState({}, '', url.toString());
    }
    loadVideos('', 'All');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    setSubmittedSearch(query);
    setSelectedVideo(null);
    setIsHistoryView(false);
    loadVideos(query, activeCategory);
  };

  const handleExecuteSearch = (query: string) => {
    const trimmed = query.trim();
    setSearchQuery(trimmed);
    setSubmittedSearch(trimmed);
    setSelectedVideo(null);
    setIsHistoryView(false);
    loadVideos(trimmed, activeCategory);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSubmittedSearch('');
    loadVideos('', activeCategory);
  };

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarExpanded(!isSidebarExpanded);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1] font-sans">
      {/* Top Navigation Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onExecuteSearch={handleExecuteSearch}
        onClearSearch={handleClearSearch}
        onToggleSidebar={handleToggleSidebar}
        onGoHome={handleGoHome}
        onOpenHistory={handleOpenHistory}
      />

      <div className="flex">
        {/* Navigation Sidebar */}
        <Sidebar
          isExpanded={isSidebarExpanded}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSelectedVideo(null);
            setIsHistoryView(false);
            loadVideos(submittedSearch, cat);
          }}
          onGoHome={handleGoHome}
          onOpenHistory={handleOpenHistory}
          isHistoryActive={isHistoryView}
          isWatchView={Boolean(selectedVideo)}
          isGuest={true}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {selectedVideo ? (
            /* Watch View */
            <WatchView
              video={selectedVideo}
              allVideos={videos}
              onSelectVideo={handleSelectVideo}
            />
          ) : isHistoryView ? (
            /* Watch History View */
            <HistoryView
              onSelectVideo={handleSelectVideo}
              onGoHome={handleGoHome}
            />
          ) : (
            /* Home / Search View */
            <div>
              {/* Category Filter Pills Bar */}
              <CategoryPills
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onSelectCategory={(cat) => {
                  setActiveCategory(cat);
                  loadVideos(submittedSearch, cat);
                }}
              />

              {/* Videos Feed */}
              <div className="px-4 sm:px-6 py-4">
                {submittedSearch && (
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[14px] text-[#aaaaaa]">
                      Results for &ldquo;<span className="text-white font-medium">{submittedSearch}</span>&rdquo; ({videos.length})
                    </p>
                    <button
                      onClick={handleClearSearch}
                      className="text-[13px] text-[#3ea6ff] hover:underline cursor-pointer"
                    >
                      Clear search
                    </button>
                  </div>
                )}

                {/* API Status Hint */}
                {!hasApiKey && (
                  <div className="mb-4 flex items-center justify-between rounded-xl bg-[#1e1e1e] border border-[#2e2e2e] px-4 py-2 text-xs text-[#aaaaaa]">
                    <span>
                      💡 Using sample video data. Add your <code className="text-[#3ea6ff] font-mono">YOUTUBE_API_KEY</code> to <code className="text-white font-mono">.env.local</code> to fetch live YouTube videos.
                    </span>
                  </div>
                )}

                {isLoading ? (
                  /* Loading Skeletons */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-10">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex flex-col animate-pulse">
                        <div className="aspect-video w-full rounded-xl bg-[#272727]" />
                        <div className="flex gap-3 pt-3">
                          <div className="h-9 w-9 rounded-full bg-[#272727] shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 rounded bg-[#272727]" />
                            <div className="h-3 w-1/2 rounded bg-[#272727]" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : videos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-10">
                    {videos.map((video) => (
                      <VideoCard
                        key={video.id}
                        video={video}
                        onSelect={handleSelectVideo}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="rounded-full bg-[#272727] p-5 mb-4">
                      <SearchIcon className="h-8 w-8 text-[#aaaaaa]" />
                    </div>
                    <h3 className="text-[18px] font-semibold text-[#f1f1f1]">No results found</h3>
                    <p className="mt-1 text-[14px] text-[#aaaaaa] max-w-sm">
                      Try different keywords or remove search filters to see videos.
                    </p>
                    <button
                      onClick={handleGoHome}
                      className="mt-5 rounded-full bg-[#272727] hover:bg-[#3f3f3f] px-5 py-2.5 text-[14px] font-medium text-white transition cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
