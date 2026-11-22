'use client';

import React from 'react';
import {
  HomeIcon,
  ShortsIcon,
  SubscriptionsIcon,
  LibraryIcon,
  HistoryIcon,
  WatchLaterIcon,
  PlaylistIcon,
  TrendingIcon,
  MusicIcon,
  GamingIcon,
  NewsIcon,
  TrophyIcon,
  PodcastsIcon,
  SettingsIcon,
  HelpIcon,
  FeedbackIcon,
  CloseIcon,
  YouTubeLogo,
  MenuIcon,
  ChevronRightIcon,
} from './Icons';

type SidebarProps = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onGoHome: () => void;
  onOpenHistory?: () => void;
  isHistoryActive?: boolean;
  isWatchView: boolean;
  isGuest?: boolean;
};

export default function Sidebar({
  isExpanded,
  isMobileOpen,
  onCloseMobile,
  activeCategory,
  onSelectCategory,
  onGoHome,
  onOpenHistory,
  isHistoryActive = false,
  isWatchView,
  isGuest = true,
}: SidebarProps) {
  const handleHistoryAction = onOpenHistory || onGoHome;

  const mainNav = [
    { label: 'Home', icon: HomeIcon, action: onGoHome, active: activeCategory === 'All' && !isWatchView && !isHistoryActive },
    { label: 'Shorts', icon: ShortsIcon, action: () => onSelectCategory('Lo-fi'), active: false },
    ...(!isGuest ? [{ label: 'Subscriptions', icon: SubscriptionsIcon, action: () => onSelectCategory('Music'), active: false }] : []),
  ];

  const youNav = [
    { label: 'History', icon: HistoryIcon, action: handleHistoryAction, active: isHistoryActive },
    { label: 'Playlists', icon: PlaylistIcon, action: onGoHome, active: false },
    { label: 'Watch Later', icon: WatchLaterIcon, action: () => onSelectCategory('Coding'), active: false },
  ];

  const exploreNav = [
    { label: 'Trending', icon: TrendingIcon, action: () => onSelectCategory('All') },
    { label: 'Music', icon: MusicIcon, action: () => onSelectCategory('Music') },
    { label: 'Gaming', icon: GamingIcon, action: () => onSelectCategory('Gaming') },
    { label: 'News', icon: NewsIcon, action: () => onSelectCategory('Science') },
    { label: 'Sports', icon: TrophyIcon, action: () => onSelectCategory('Tech') },
    { label: 'Podcasts', icon: PodcastsIcon, action: () => onSelectCategory('Podcasts') },
  ];

  const subscriptions = [
    { name: 'Fireship', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces', live: true },
    { name: 'Lofi Girl', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces', live: true },
    { name: 'Rick Astley', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces', live: false },
    { name: 'Google Developers', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces', live: false },
    { name: 'Queen Official', avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop&crop=faces', live: false },
  ];

  // Mobile Slide-in Drawer
  if (isMobileOpen) {
    return (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="fixed inset-0 bg-black/60 transition-opacity"
          onClick={onCloseMobile}
        />
        <aside className="relative z-10 flex h-full w-[240px] flex-col bg-[#0f0f0f] px-3 py-2 text-[#f1f1f1] shadow-2xl overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-4 px-2 pb-3 pt-1">
            <button
              onClick={onCloseMobile}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#272727]"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <YouTubeLogo />
          </div>

          <div className="space-y-0.5">
            {mainNav.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  onCloseMobile();
                }}
                className={`flex w-full items-center gap-6 rounded-10px px-3 h-10 text-[14px] font-normal transition-colors ${
                  item.active ? 'bg-[#272727] font-semibold text-white' : 'text-[#f1f1f1] hover:bg-[#272727]'
                }`}
              >
                <item.icon className="h-6 w-6" active={item.active} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="my-3 border-t border-[#272727]" />

          <div className="space-y-0.5">
            <div className="flex items-center justify-between px-3 py-1.5 font-semibold text-[16px] text-white">
              <span>You</span>
              <ChevronRightIcon className="h-4 w-4" />
            </div>
            {youNav.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  onCloseMobile();
                }}
                className={`flex w-full items-center gap-6 rounded-10px px-3 h-10 text-[14px] transition-colors ${
                  item.active ? 'bg-[#272727] font-semibold text-white' : 'text-[#f1f1f1] hover:bg-[#272727]'
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {!isGuest && (
            <>
              <div className="my-3 border-t border-[#272727]" />
              <div className="space-y-0.5">
                <div className="px-3 py-1.5 font-semibold text-[16px] text-white">Subscriptions</div>
                {subscriptions.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => {
                      onGoHome();
                      onCloseMobile();
                    }}
                    className="flex w-full items-center justify-between rounded-10px px-3 h-10 text-[14px] text-[#f1f1f1] hover:bg-[#272727]"
                  >
                    <div className="flex items-center gap-6 truncate">
                      <img src={sub.avatar} alt={sub.name} className="h-6 w-6 rounded-full object-cover" />
                      <span className="truncate">{sub.name}</span>
                    </div>
                    {sub.live && (
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="my-3 border-t border-[#272727]" />

          <div className="space-y-0.5 pb-6">
            <div className="px-3 py-1.5 font-semibold text-[16px] text-white">Explore</div>
            {exploreNav.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  onCloseMobile();
                }}
                className="flex w-full items-center gap-6 rounded-10px px-3 h-10 text-[14px] text-[#f1f1f1] hover:bg-[#272727]"
              >
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    );
  }

  // Mini rail sidebar (72px) when collapsed or on watch page
  if (!isExpanded || isWatchView) {
    return (
      <aside className="hidden sm:flex flex-col items-center w-[72px] shrink-0 bg-[#0f0f0f] py-1 text-[#f1f1f1] h-[calc(100vh-56px)] sticky top-14">
        {mainNav.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className={`flex flex-col items-center justify-center gap-1.5 w-[64px] h-[74px] rounded-xl transition-colors cursor-pointer ${
              item.active ? 'text-white' : 'text-[#f1f1f1] hover:bg-[#272727]'
            }`}
          >
            <item.icon className="h-6 w-6" active={item.active} />
            <span className="text-[10px] leading-none">{item.label}</span>
          </button>
        ))}
        <button
          onClick={onGoHome}
          className="flex flex-col items-center justify-center gap-1.5 w-[64px] h-[74px] rounded-xl text-[#f1f1f1] hover:bg-[#272727] cursor-pointer transition-colors"
        >
          <LibraryIcon className="h-6 w-6" />
          <span className="text-[10px] leading-none">You</span>
        </button>
      </aside>
    );
  }

  // Full Expanded Sidebar (240px)
  return (
    <aside className="hidden lg:flex flex-col w-[240px] shrink-0 bg-[#0f0f0f] px-3 py-2 text-[#f1f1f1] h-[calc(100vh-56px)] sticky top-14 overflow-y-auto custom-scrollbar">
      {/* Primary items */}
      <div className="space-y-0.5">
        {mainNav.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className={`flex w-full items-center gap-6 rounded-10px px-3 h-10 text-[14px] transition-colors cursor-pointer ${
              item.active ? 'bg-[#272727] font-semibold text-white' : 'hover:bg-[#272727] text-[#f1f1f1]'
            }`}
          >
            <item.icon className="h-6 w-6" active={item.active} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="my-3 border-t border-[#272727]" />

      {/* You Section */}
      <div className="space-y-0.5">
        <button
          onClick={onGoHome}
          className="flex w-full items-center justify-between px-3 py-1.5 font-semibold text-[16px] text-white hover:bg-[#272727] rounded-lg transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">You</span>
          <ChevronRightIcon className="h-4 w-4" />
        </button>
        {youNav.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className={`flex w-full items-center gap-6 rounded-10px px-3 h-10 text-[14px] transition-colors cursor-pointer ${
              item.active ? 'bg-[#272727] font-semibold text-white' : 'text-[#f1f1f1] hover:bg-[#272727]'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {!isGuest && (
        <>
          <div className="my-3 border-t border-[#272727]" />
          {/* Subscriptions Section */}
          <div className="space-y-0.5">
            <div className="px-3 py-1.5 font-semibold text-[16px] text-white">Subscriptions</div>
            {subscriptions.map((sub) => (
              <button
                key={sub.name}
                onClick={onGoHome}
                className="flex w-full items-center justify-between rounded-10px px-3 h-10 text-[14px] text-[#f1f1f1] hover:bg-[#272727] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-6 truncate">
                  <img src={sub.avatar} alt={sub.name} className="h-6 w-6 rounded-full object-cover" />
                  <span className="truncate">{sub.name}</span>
                </div>
                {sub.live && (
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="my-3 border-t border-[#272727]" />

      {/* Explore Section */}
      <div className="space-y-0.5">
        <div className="px-3 py-1.5 font-semibold text-[16px] text-white">Explore</div>
        {exploreNav.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="flex w-full items-center gap-6 rounded-10px px-3 h-10 text-[14px] text-[#f1f1f1] hover:bg-[#272727] cursor-pointer transition-colors"
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="my-3 border-t border-[#272727]" />

      {/* Settings & Help */}
      <div className="space-y-0.5">
        <button className="flex w-full items-center gap-6 rounded-10px px-3 h-10 text-[14px] text-[#f1f1f1] hover:bg-[#272727] cursor-pointer">
          <SettingsIcon className="h-6 w-6" />
          <span>Settings</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-10px px-3 h-10 text-[14px] text-[#f1f1f1] hover:bg-[#272727] cursor-pointer">
          <HelpIcon className="h-6 w-6" />
          <span>Help</span>
        </button>
        <button className="flex w-full items-center gap-6 rounded-10px px-3 h-10 text-[14px] text-[#f1f1f1] hover:bg-[#272727] cursor-pointer">
          <FeedbackIcon className="h-6 w-6" />
          <span>Send feedback</span>
        </button>
      </div>

      <div className="my-3 border-t border-[#272727]" />

      {/* Real YouTube Footer */}
      <div className="px-3 py-2 text-[12px] text-[#717171] leading-relaxed space-y-3 pb-8">
        <div>
          About &nbsp; Press &nbsp; Copyright &nbsp; Contact us &nbsp; Creators &nbsp; Advertise &nbsp; Developers
        </div>
        <div>
          Terms &nbsp; Privacy &nbsp; Policy &amp; Safety &nbsp; How V Tube works &nbsp; Test new features
        </div>
        <div className="text-[12px] text-[#717171] pt-1">
          &copy; 2026 V Tube LLC
        </div>
      </div>
    </aside>
  );
}
