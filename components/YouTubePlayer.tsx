'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

type Props = {
  videoId: string;
  autoplay?: boolean;
  title?: string;
  channelName?: string;
  thumbnail?: string;
  onEnded?: () => void;
  onNextVideo?: () => void;
  onPrevVideo?: () => void;
};

export default function YouTubePlayer({
  videoId,
  autoplay = true,
  title,
  channelName,
  thumbnail,
  onEnded,
  onNextVideo,
  onPrevVideo,
}: Props) {
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef<any>(null);
  const onEndedRef = useRef(onEnded);
  const hasEndedRef = useRef(false);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  // Reset ended flag when videoId changes
  useEffect(() => {
    hasEndedRef.current = false;
  }, [videoId]);

  // If player is already initialized and videoId changes, auto-load and play
  useEffect(() => {
    if (playerRef.current && autoplay) {
      try {
        playerRef.current.loadVideoById?.(videoId);
        playerRef.current.playVideo?.();
      } catch (e) {
        // ignore
      }
    }
  }, [videoId, autoplay]);

  const handleEnd = useCallback(() => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'paused';
    }
    onEndedRef.current?.();
  }, []);

  // Periodic safety check: if player time reaches near end of video duration
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasEndedRef.current || !playerRef.current) return;
      try {
        const currentTime = playerRef.current.getCurrentTime?.();
        const duration = playerRef.current.getDuration?.();
        if (duration && duration > 0 && currentTime && currentTime >= duration - 0.6) {
          handleEnd();
        }
      } catch (e) {
        // ignore
      }
    }, 500);

    return () => clearInterval(interval);
  }, [handleEnd]);

  // Sync MediaSession API with mobile lock-screen & notification controls
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title || 'V Tube Video',
        artist: channelName || 'V Tube',
        album: 'V Tube',
        artwork: [
          {
            src: thumbnail || '/icon-512.png',
            sizes: '512x512',
            type: 'image/jpeg',
          },
          {
            src: thumbnail || '/icon-192.png',
            sizes: '192x192',
            type: 'image/jpeg',
          },
        ],
      });

      // Handle Lock Screen / Notification controls
      navigator.mediaSession.setActionHandler('play', () => {
        try {
          playerRef.current?.playVideo?.();
          navigator.mediaSession.playbackState = 'playing';
        } catch (e) {
          console.warn('Playback error', e);
        }
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        try {
          playerRef.current?.pauseVideo?.();
          navigator.mediaSession.playbackState = 'paused';
        } catch (e) {
          console.warn('Pause error', e);
        }
      });

      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) {
          playerRef.current?.seekTo?.(details.seekTime, true);
        }
      });

      navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        const skipTime = details.seekOffset || 10;
        const current = playerRef.current?.getCurrentTime?.() || 0;
        playerRef.current?.seekTo?.(Math.max(current - skipTime, 0), true);
      });

      navigator.mediaSession.setActionHandler('seekforward', (details) => {
        const skipTime = details.seekOffset || 10;
        const current = playerRef.current?.getCurrentTime?.() || 0;
        playerRef.current?.seekTo?.(current + skipTime, true);
      });

      if (onNextVideo) {
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          onNextVideo();
        });
      }

      if (onPrevVideo) {
        navigator.mediaSession.setActionHandler('previoustrack', () => {
          onPrevVideo();
        });
      }
    }
  }, [title, channelName, thumbnail, onNextVideo, onPrevVideo]);

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    // Autoplay immediately on 1 click
    if (autoplay) {
      try {
        event.target.playVideo();
      } catch (e) {
        console.warn('Autoplay error', e);
      }
    }
  };

  const onPlayerStateChange = (event: any) => {
    // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      if (event.data === 1) {
        navigator.mediaSession.playbackState = 'playing';
      } else if (event.data === 2 || event.data === 0) {
        navigator.mediaSession.playbackState = 'paused';
      }
    }

    if (event.data === 0) {
      handleEnd();
    }
  };

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      playsinline: 1,
      rel: 0,
      autoplay: autoplay ? 1 : 0,
      modestbranding: 1,
      enablejsapi: 1,
      origin: typeof window !== 'undefined' ? window.location.origin : undefined,
    },
  };

  return (
    <div className="group relative w-full aspect-video overflow-hidden rounded-xl bg-black shadow-2xl select-none">
      {!hasError ? (
        <YouTube
          key={videoId}
          videoId={videoId}
          opts={opts}
          className="absolute inset-0 w-full h-full"
          iframeClassName="w-full h-full"
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
          onEnd={handleEnd}
          onError={() => setHasError(true)}
        />
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&playsinline=1`}
          title="YouTube video player"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}

      {/* On-Screen Navigation Controls: < and > */}
      <div className="pointer-events-none absolute inset-y-0 inset-x-0 flex items-center justify-between px-3 sm:px-6 z-20">
        {/* < Previous Video */}
        {onPrevVideo && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrevVideo();
            }}
            aria-label="Previous video"
            title="Previous video (<)"
            className="pointer-events-auto flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-2xl backdrop-blur-md transition-all transform hover:scale-110 active:scale-95 cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <span className="text-2xl sm:text-3xl font-bold font-mono -translate-x-0.5 leading-none">‹</span>
          </button>
        )}

        {/* > Next Video */}
        {onNextVideo && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNextVideo();
            }}
            aria-label="Next video"
            title="Next video (>)"
            className="pointer-events-auto flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-2xl backdrop-blur-md transition-all transform hover:scale-110 active:scale-95 cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100 ml-auto"
          >
            <span className="text-2xl sm:text-3xl font-bold font-mono translate-x-0.5 leading-none">›</span>
          </button>
        )}
      </div>
    </div>
  );
}
