'use client';

import { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

type Props = {
  videoId: string;
  autoplay?: boolean;
};

export default function YouTubePlayer({ videoId, autoplay = true }: Props) {
  const [hasError, setHasError] = useState(false);

  const opts: YouTubeProps['opts'] = {
    width: '100%',
    height: '100%',
    host: 'https://www.youtube-nocookie.com', // Privacy-enhanced mode (minimizes tracking & ads)
    playerVars: {
      playsinline: 1,
      rel: 0,
      autoplay: autoplay ? 1 : 0,
      modestbranding: 1,
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
          onError={() => setHasError(true)}
        />
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0`}
          title="YouTube video player"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}
