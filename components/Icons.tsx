import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export function VTubeLogo({ className = 'h-5', ...props }: IconProps) {
  return (
    <div className={`flex items-center gap-1.5 select-none cursor-pointer ${className}`}>
      {/* Iconic Red Play Badge */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 28 20"
          className="h-5 w-7 text-[#FF0000] fill-current"
          {...props}
        >
          <path d="M27.4 3.1c-.3-1.2-1.2-2.1-2.4-2.4C22.9 0 14 0 14 0S5.1 0 3 .7C1.8 1 0.9 1.9 0.6 3.1 0 5.2 0 10 0 10s0 4.8.6 6.9c.3 1.2 1.2 2.1 2.4 2.4 2.1.7 11 .7 11 .7s8.9 0 11-.7c1.2-.3 2.1-1.2 2.4-2.4.6-2.1.6-6.9.6-6.9s0-4.8-.6-6.9z" />
          <polygon points="11.2,14.3 18.5,10 11.2,5.7" fill="#ffffff" />
        </svg>
      </div>
      {/* V Tube Wordmark */}
      <div className="flex items-center">
        <span className="text-[20px] font-extrabold tracking-tighter text-white font-sans flex items-center leading-none">
          V<span className="ml-1 tracking-tight text-white font-bold">Tube</span>
        </span>
        <span className="text-[10px] text-[#aaaaaa] font-medium tracking-tight -mt-2 ml-1">
          TH
        </span>
      </div>
    </div>
  );
}

export const YouTubeLogo = VTubeLogo;

export const DEFAULT_GUEST_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23565656'/%3E%3Cpath d='M20 20c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2.5c-3.33 0-10 1.67-10 5v2.5h20v-2.5c0-3.33-6.67-5-10-5z' fill='%23e0e0e0'/%3E%3C/svg%3E";

export function GuestAvatarIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <div className={`rounded-full bg-[#565656] flex items-center justify-center text-white overflow-hidden shrink-0 select-none ${className}`}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[62%] h-[62%] text-[#e0e0e0]">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
}

export function MenuIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" />
    </svg>
  );
}

export function SearchIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M20.87 20.17l-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
    </svg>
  );
}

export function MicIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 3c-1.66 0-3 1.34-3 3v6c0 1.66 1.34 3 3 3s3-1.34 3-3V6c0-1.66-1.34-3-3-3zm5.3 6c-.4 0-.7.3-.7.7 0 2.54-2.07 4.6-4.6 4.6S7.4 12.24 7.4 9.7c0-.4-.3-.7-.7-.7s-.7.3-.7.7c0 3.06 2.37 5.58 5.3 5.95V19h-3c-.4 0-.7.3-.7.7s.3.7.7.7h7.4c.4 0 .7-.3.7-.7s-.3-.7-.7-.7h-3v-2.65c2.93-.37 5.3-2.89 5.3-5.95 0-.4-.3-.7-.7-.7z" />
    </svg>
  );
}

export function BellIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-.86.7-1.56 1.56-1.56.86 0 1.56.7 1.56 1.56v.38c2.44.75 4 3.06 4 5.98v5.15l2 1.88zM18.5 17l-1.5-1.41V10.3c0-2.45-1.33-4.45-3.5-4.88v-.46c0-.52-.43-.96-.96-.96-.52 0-.96.43-.96.96v.46C9.41 5.85 8.08 7.85 8.08 10.3v5.29L6.58 17h11.92z" />
    </svg>
  );
}

export function VideoPlusIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-4.5l4 4v-11l-4 4V6zm1 11.5l-3-3V17H4V7h11v2.5l3-3v11z" />
    </svg>
  );
}

export function HomeIcon({ className = 'w-6 h-6', active = false, ...props }: IconProps & { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 4.33l7 6.09V20h-4v-6H9v6H5v-9.58l7-6.09M12 3L3 10.84V21h8v-6h2v6h8V10.84L12 3z" />
    </svg>
  );
}

export function ShortsIcon({ className = 'w-6 h-6', active = false, ...props }: IconProps & { active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M17.77 10.32l-1.2-.5L18 8.06c1.79-1.42 2.1-4.04.7-5.83-1.42-1.79-4.04-2.1-5.83-.7L5.2 6.3c-1.39 1.1-2.03 2.87-1.67 4.62.36 1.75 1.63 3.13 3.34 3.63l1.2.5-1.43 1.76c-1.79 1.42-2.1 4.04-.7 5.83 1.42 1.79 4.04 2.1 5.83.7l7.67-4.77c1.39-1.1 2.03-2.87 1.67-4.62-.36-1.75-1.63-3.13-3.34-3.63zm-7.77 4.18V9.5l5 2.5-5 2.5z" />
    </svg>
  );
}

export function SubscriptionsIcon({ className = 'w-6 h-6', active = false, ...props }: IconProps & { active?: boolean }) {
  if (active) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 8v12H2V10h20zm-6 6l-6-3.27v6.53L16 16z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M10 18v-6l5 3-5 3zm10-10H4V6h16v2zm-2-6H6v2h12V2zm4 8v12H2V10h20zm-1 1H3v10h18V11z" />
    </svg>
  );
}

export function LibraryIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M11 7l6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zm-1-14H7v13h13V4z" />
    </svg>
  );
}

export function HistoryIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M14.97 16.95L10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L6 9H1V4l1.83 1.83C4.54 3.1 7.97 1 12 1c6.07 0 11 4.93 11 11z" />
    </svg>
  );
}

export function WatchLaterIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M14.97 16.95L10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
    </svg>
  );
}

export function PlaylistIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M22 7H2v1h20V7zm-8 5H2v1h12v-1zm0 5H2v1h12v-1zm4-6v8l6-4-6-4z" />
    </svg>
  );
}

export function ThumbsUpIcon({ className = 'w-5 h-5', filled = false, ...props }: IconProps & { filled?: boolean }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M3 21h2V9H3v12zm19-10.5c0-.83-.67-1.5-1.5-1.5h-5.9l.9-4.32.03-.3c0-.39-.16-.76-.41-1.01L14.07 3 7.84 9.23C7.52 9.55 7.33 10 7.33 10.5V19.5c0 .83.67 1.5 1.5 1.5h9c.62 0 1.15-.38 1.38-.92l3.29-7.68c.08-.2.12-.41.12-.64v-1.26z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h11.23c1.07 0 1.96-.75 2.15-1.8l1.38-7.7c.22-1.24-.73-2.35-1.99-2.35zM7 20H4v-8h3v8zm13.38-7.53l-1.38 7.7c-.06.33-.35.58-.69.58H8v-9.14l5.12-5.46c.21-.23.51-.35.82-.35.45 0 .84.34.93.79l-1.6 5.2h6.11c.4 0 .74.24.87.61.13.36.03.77-.2 1.07z" />
    </svg>
  );
}

export function ThumbsDownIcon({ className = 'w-5 h-5', filled = false, ...props }: IconProps & { filled?: boolean }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path d="M21 3h-2v12h2V3zM2 13.5c0 .83.67 1.5 1.5 1.5h5.9l-.9 4.32-.03.3c0 .39.16.76.41 1.01L9.93 21l6.23-6.23c.32-.32.51-.77.51-1.27V4.5c0-.83-.67-1.5-1.5-1.5h-9c-.62 0-1.15.38-1.38.92L2.77 11.6c-.08.2-.12.41-.12.64v1.26z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M17 4h-4.23l1.52-4.94C14.62-1.97 13.78-3 12.62-3c-.58 0-1.14.24-1.52.65L5.24 4H1.24v10h4h11.23c1.07 0 1.96-.75 2.15-1.8l1.38-7.7c.22-1.24-.73-2.35-1.99-2.35zM5.24 13h-3V5h3v8zm13.38-7.53l-1.38 7.7c-.06.33-.35.58-.69.58H6.24V4.61l5.12-5.46c.21-.23.51-.35.82-.35.45 0 .84.34.93.79l-1.6 5.2h6.11c.4 0 .74.24.87.61.13.36.03.77-.2 1.07z" transform="rotate(180 12 12)" />
    </svg>
  );
}

export function ShareIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M15 5.63L20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z" />
    </svg>
  );
}

export function DownloadIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M17 18v1H6v-1h11zm-.5-6.6l-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z" />
    </svg>
  );
}

export function ScissorsIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M10.59 12l2.7-2.7-1.41-1.41-2.71 2.7C8.6 10.22 7.84 10 7 10c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.93 0 3.53-1.36 3.91-3.18L17.59 9.17l-1.41-1.41L10.59 12zM7 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm10.59-4.83L21 7.76l-1.41-1.41-3.41 3.41 1.41 1.41zM17 4c-1.93 0-3.53 1.36-3.91 3.18l2.23 2.23c.49-.26 1.05-.41 1.68-.41 2.21 0 4-1.79 4-4s-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  );
}

export function MoreHorizontalIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

export function MoreVerticalIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

export function CheckBadgeIcon({ className = 'w-3.5 h-3.5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`text-[#aaaaaa] ${className}`} {...props}>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1 1.4-1.4 2.8 2.7 7.4-7.4 1.4 1.4-8.8 8.8z" />
    </svg>
  );
}

export function TrendingIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M17.5 10.5C18.88 10.5 20 9.38 20 8s-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5zm-5 5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5zm-5 5C8.88 20.5 10 19.38 10 18s-1.12-2.5-2.5-2.5S5 16.62 5 18s1.12 2.5 2.5 2.5zM3 13l2.83-2.83 5.34 5.34 7.07-7.07L21 11.17V3h-8.17l2.75 2.75-5.66 5.66-5.34-5.34L1.58 9 3 13z" />
    </svg>
  );
}

export function MusicIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

export function GamingIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

export function NewsIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
    </svg>
  );
}

export function TrophyIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
    </svg>
  );
}

export function PodcastsIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 2.76 2.24 5 5 5h8c2.76 0 5-2.24 5-5v-7c0-4.97-4.03-9-9-9zm7 16c0 1.66-1.34 3-3 3H8c-1.66 0-3-1.34-3-3v-7c0-3.87 3.13-7 7-7s7 3.13 7 7v7zm-7-12c-2.76 0-5 2.24-5 5v3c0 .55.45 1 1 1s1-.45 1-1v-3c0-1.66 1.34-3 3-3s3 1.34 3 3v3c0 .55.45 1 1 1s1-.45 1-1v-3c0-2.76-2.24-5-5-5zm0 5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2s2-.9 2-2v-6c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

export function SortIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z" />
    </svg>
  );
}

export function SettingsIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
  );
}

export function HelpIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
    </svg>
  );
}

export function FeedbackIcon({ className = 'w-6 h-6', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
    </svg>
  );
}

export function CloseIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}

export function ChevronRightIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}

export function TrashIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
    </svg>
  );
}

export function PlayIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
