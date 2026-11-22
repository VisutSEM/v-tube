'use client';

import React from 'react';
import { Video } from '@/types';
import { CheckBadgeIcon, MoreVerticalIcon } from './Icons';

type VideoCardProps = {
  video: Video;
  onSelect: (video: Video) => void;
};

export default function VideoCard({ video, onSelect }: VideoCardProps) {
  return (
    <div
      onClick={() => onSelect(video)}
      className="group flex flex-col cursor-pointer"
    >
      {/* 16:9 Thumbnail container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#272727]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Real YouTube Duration badge */}
        <div className="absolute bottom-1.5 right-1.5 rounded-[4px] bg-black/85 px-1.5 py-0.5 text-[12px] font-medium text-white tracking-wide">
          {video.duration}
        </div>
      </div>

      {/* Details Row */}
      <div className="relative flex gap-3 pt-3 items-start">
        {/* Channel Avatar */}
        <div className="shrink-0 mt-0.5">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col pr-6 min-w-0 flex-1">
          <h3
            className="text-[16px] font-medium text-[#f1f1f1] line-clamp-2 leading-[22px] group-hover:text-white"
            title={video.title}
          >
            {video.title}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-[14px] text-[#aaaaaa] leading-none">
            <span className="truncate hover:text-[#f1f1f1] transition-colors">
              {video.channel.name}
            </span>
            {video.channel.verified && <CheckBadgeIcon className="h-3.5 w-3.5" />}
          </div>

          <div className="text-[14px] text-[#aaaaaa] leading-none mt-1">
            <span>{video.views}</span>
            <span className="mx-1">•</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>

        {/* 3 dots menu button on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-2 right-0 opacity-0 group-hover:opacity-100 hover:bg-[#272727] rounded-full p-1.5 text-[#f1f1f1] transition-opacity"
          title="Action menu"
        >
          <MoreVerticalIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
