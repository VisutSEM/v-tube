'use client';

import { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

type Props = {
  videoId: string;
  autoplay?: boolean;
  title?: string;
  channelName?: string;
  thumbnail?: string;
  onEnded?: () => void;
};

export default function YouTubePlayer({
  videoId,
  autoplay = true,
  title,
  channelName,
  thumbnail,
  onEnded,
}: Props) {
  const [hasError, setHasError] = useState(false);
  const playerRef = useRef<any>(null);

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
    }
  }, [title, channelName, thumbnail]);

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
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
      onEnded?.();
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
