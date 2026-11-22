'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

type Props = {
  videoId: string;
  autoplay?: boolean;
  title?: string;
  channelName?: string;
  thumbnail?: string;
};

// 1-second silent base64 WAV data URI to keep the mobile OS audio session alive in background
const SILENT_AUDIO_URI =
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

export default function YouTubePlayer({
  videoId,
  autoplay = true,
  title,
  channelName,
  thumbnail,
}: Props) {
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const silentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize the silent keep-alive audio element for mobile background play
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(SILENT_AUDIO_URI);
      audio.loop = true;
      audio.volume = 0.001; // Effectively silent, but recognized as active by OS audio session
      silentAudioRef.current = audio;

      return () => {
        audio.pause();
        silentAudioRef.current = null;
      };
    }
  }, []);

  const playKeepAlive = useCallback(() => {
    if (silentAudioRef.current) {
      silentAudioRef.current.play().catch(() => {
        // Autoplay policy may restrict before direct user interaction
      });
    }
  }, []);

  const pauseKeepAlive = useCallback(() => {
    if (silentAudioRef.current) {
      silentAudioRef.current.pause();
    }
  }, []);

  // Sync MediaSession API with mobile lock-screen & notification controls
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title || 'V Tube Video',
        artist: channelName || 'V Tube',
        album: 'V Tube Background Play',
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
        playerRef.current?.playVideo?.();
        playKeepAlive();
        setIsPlaying(true);
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        playerRef.current?.pauseVideo?.();
        pauseKeepAlive();
        setIsPlaying(false);
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
    }
  }, [title, channelName, thumbnail, playKeepAlive, pauseKeepAlive]);

  // Keep mobile audio session active when switching apps or locking phone
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App minimized or screen locked
        if (isPlaying) {
          playKeepAlive();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying, playKeepAlive]);

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
  };

  const onPlayerStateChange = (event: any) => {
    // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
    if (event.data === 1) {
      setIsPlaying(true);
      playKeepAlive();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    } else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false);
      pauseKeepAlive();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
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
    },
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
      {!hasError ? (
        <YouTube
          key={videoId}
          videoId={videoId}
          opts={opts}
          className="absolute inset-0 w-full h-full"
          iframeClassName="w-full h-full"
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
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
    </div>
  );
}
