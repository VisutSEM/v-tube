'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MenuIcon,
  YouTubeLogo,
  SearchIcon,
  MicIcon,
  VideoPlusIcon,
  BellIcon,
  CloseIcon,
  SettingsIcon,
  HelpIcon,
  FeedbackIcon,
  GuestAvatarIcon,
} from './Icons';

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onClearSearch: () => void;
  onToggleSidebar: () => void;
  onGoHome: () => void;
};

export default function Header({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  onToggleSidebar,
  onGoHome,
}: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMicClick = () => {
    setIsMicActive(true);
    setTimeout(() => {
      setIsMicActive(false);
    }, 2800);
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-[#0f0f0f] px-4 text-[#f1f1f1]">
      {/* Left: Hamburger menu + Official YouTube Logo */}
      <div className={`flex items-center gap-4 ${isMobileSearchOpen ? 'hidden sm:flex' : 'flex'}`}>
        <button
          onClick={onToggleSidebar}
          aria-label="Guide"
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#272727] active:bg-[#3f3f3f] transition-colors"
        >
          <MenuIcon className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={onGoHome}
          className="flex items-center focus:outline-none"
          title="V Tube Home"
        >
          <YouTubeLogo />
        </button>
      </div>

      {/* Center: Search input + Voice button */}
      <div
        className={`flex-1 items-center justify-center max-w-[732px] px-2 sm:px-4 ${
          isMobileSearchOpen ? 'flex' : 'hidden sm:flex'
        }`}
      >
        {isMobileSearchOpen && (
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="mr-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#272727] sm:hidden"
          >
            <CloseIcon className="h-5 w-5 text-white" />
          </button>
        )}

        <form onSubmit={onSearchSubmit} className="flex w-full items-center">
          <div
            className={`flex w-full items-center rounded-l-full border bg-[#121212] px-4 h-10 transition-colors ${
              isSearchFocused
                ? 'border-[#1c62b9] ring-1 ring-[#1c62b9] ml-0'
                : 'border-[#303030]'
            }`}
          >
            {isSearchFocused && (
              <SearchIcon className="mr-3 h-4 w-4 text-[#aaaaaa] shrink-0" />
            )}
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-[16px] text-[#f1f1f1] placeholder-[#888888] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={onClearSearch}
                className="text-[#aaaaaa] hover:text-white p-1"
                title="Clear search query"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            title="Search"
            className="flex h-10 w-16 items-center justify-center rounded-r-full border border-l-0 border-[#303030] bg-[#222222] hover:bg-[#272727] text-[#f1f1f1] transition-colors shrink-0"
          >
            <SearchIcon className="h-5 w-5 text-[#f1f1f1]" />
          </button>
        </form>

        <button
          onClick={handleMicClick}
          title={isMicActive ? 'Listening...' : 'Search with your voice'}
          className={`ml-3 flex h-10 w-10 items-center justify-center rounded-full transition-all shrink-0 ${
            isMicActive
              ? 'bg-red-600 animate-pulse text-white'
              : 'bg-[#181818] hover:bg-[#272727] text-white'
          }`}
        >
          <MicIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Right: Actions & Profile */}
      <div className={`flex items-center gap-1 sm:gap-2 ${isMobileSearchOpen ? 'hidden sm:flex' : 'flex'}`}>
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#272727] sm:hidden text-white"
        >
          <SearchIcon className="h-5 w-5" />
        </button>

        {/* Create button */}
        <button
          title="Create"
          className="hidden md:flex items-center gap-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] h-9 px-3.5 text-[14px] font-medium text-[#f1f1f1] transition-colors"
        >
          <VideoPlusIcon className="h-5 w-5" />
          <span>Create</span>
        </button>

        {/* Notifications bell */}
        <div className="relative">
          <button
            title="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#272727] transition-colors relative"
          >
            <BellIcon className="h-6 w-6 text-[#f1f1f1]" />
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#cc0000] px-1 text-[10px] font-bold text-white border-2 border-[#0f0f0f]">
              9+
            </span>
          </button>
        </div>

        {/* User profile avatar & Dropdown */}
        <div className="relative ml-1" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center focus:outline-none cursor-pointer"
            title="Guest Account"
          >
            <GuestAvatarIcon className="h-8 w-8 ring-2 ring-transparent hover:ring-[#3ea6ff]/80 transition" />
          </button>

          {/* YouTube User Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl bg-[#282828] py-2 text-[#f1f1f1] shadow-2xl border border-[#383838] animate-fade-in">
              <div className="flex gap-3 px-4 py-3 border-b border-[#3e3e3e]">
                <GuestAvatarIcon className="h-10 w-10" />
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-[15px] truncate">Guest User</span>
                  <span className="text-[13px] text-[#aaaaaa] truncate">@guest_user</span>
                  <span className="text-[12px] text-[#3ea6ff] text-left mt-0.5">
                    Browsing as Guest
                  </span>
                </div>
              </div>

              <div className="py-2 border-b border-[#3e3e3e] text-[14px]">
                <div className="px-4 py-2 hover:bg-[#383838] cursor-pointer flex items-center justify-between text-[#3ea6ff] font-medium">
                  <span>Sign in</span>
                  <span className="text-xs bg-[#3ea6ff]/10 text-[#3ea6ff] px-2 py-0.5 rounded-full">Free</span>
                </div>
                <div className="px-4 py-2 hover:bg-[#383838] cursor-pointer flex items-center gap-4">
                  <span>Switch account</span>
                </div>
              </div>

              <div className="py-2 text-[14px]">
                <div className="px-4 py-2 hover:bg-[#383838] cursor-pointer flex items-center gap-4">
                  <SettingsIcon className="h-5 w-5 text-[#aaaaaa]" />
                  <span>Settings</span>
                </div>
                <div className="px-4 py-2 hover:bg-[#383838] cursor-pointer flex items-center gap-4">
                  <HelpIcon className="h-5 w-5 text-[#aaaaaa]" />
                  <span>Help</span>
                </div>
                <div className="px-4 py-2 hover:bg-[#383838] cursor-pointer flex items-center gap-4">
                  <FeedbackIcon className="h-5 w-5 text-[#aaaaaa]" />
                  <span>Send feedback</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
