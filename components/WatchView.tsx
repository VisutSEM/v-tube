'use client';

import React, { useState, useEffect } from 'react';
import { Video, Comment } from '@/types';
import YouTubePlayer from './YouTubePlayer';
import {
  CheckBadgeIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ShareIcon,
  DownloadIcon,
  ScissorsIcon,
  PlaylistIcon,
  MoreHorizontalIcon,
  SortIcon,
  BellIcon,
  GuestAvatarIcon,
  DEFAULT_GUEST_AVATAR,
} from './Icons';

type WatchViewProps = {
  video: Video;
  allVideos: Video[];
  onSelectVideo: (v: Video) => void;
};

export default function WatchView({ video, allVideos, onSelectVideo }: WatchViewProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [comments, setComments] = useState<Comment[]>(video.comments);
  const [newCommentText, setNewCommentText] = useState('');
  const [isCommentInputFocused, setIsCommentInputFocused] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [relatedFilter, setRelatedFilter] = useState('All');

  // Fetch live YouTube comments if available
  useEffect(() => {
    let isMounted = true;
    async function loadLiveComments() {
      try {
        const res = await fetch(`/api/videos?videoId=${video.id}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.comments && data.comments.length > 0) {
            setComments(data.comments);
            return;
          }
        }
      } catch (err) {
        // Fallback to video default comments
      }
      if (isMounted) {
        setComments(video.comments);
      }
    }
    loadLiveComments();
    return () => {
      isMounted = false;
    };
  }, [video.id, video.comments]);

  // Filter related videos: exclude current video
  const upNextVideos = allVideos.filter((v) => v.id !== video.id);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${video.id}`);
    }
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2200);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      author: 'Guest User',
      avatar: DEFAULT_GUEST_AVATAR,
      timestamp: 'Just now',
      text: newCommentText.trim(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setIsCommentInputFocused(false);
  };

  const relatedCategories = ['All', 'From this channel', 'Related', 'Recently uploaded'];

  return (
    <div className="mx-auto max-w-[1750px] px-4 sm:px-6 lg:px-8 py-5">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-white text-black font-semibold px-4 py-2 text-sm shadow-2xl animate-fade-in">
          Link copied to clipboard
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Player, Video info, Description, Comments */}
        <div className="flex-1 min-w-0">
          {/* Main 16:9 Video Player */}
          <div className="w-full">
            <YouTubePlayer videoId={video.id} autoplay={true} />
          </div>

          {/* Video Title */}
          <h1 className="mt-3 text-[20px] font-bold text-[#f1f1f1] leading-7">
            {video.title}
          </h1>

          {/* Channel info & Action pills bar */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4 border-b border-[#272727] pb-4">
            {/* Channel Info & Subscribe button */}
            <div className="flex items-center gap-3">
              <img
                src={video.channel.avatar}
                alt={video.channel.name}
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
              />
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1 font-semibold text-[#f1f1f1] text-[16px] cursor-pointer hover:text-white">
                  <span>{video.channel.name}</span>
                  {video.channel.verified && <CheckBadgeIcon className="h-3.5 w-3.5" />}
                </div>
                <span className="text-[12px] text-[#aaaaaa]">
                  {video.channel.subscribers}
                </span>
              </div>

              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`ml-4 sm:ml-6 h-9 px-4 rounded-full text-[14px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSubscribed
                    ? 'bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f]'
                    : 'bg-[#f1f1f1] text-[#0f0f0f] hover:bg-[#d9d9d9]'
                }`}
              >
                {isSubscribed && <BellIcon className="h-4 w-4" />}
                <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
              </button>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Segmented Like / Dislike pill */}
              <div className="flex items-center rounded-full bg-[#272727] h-9 text-[14px] font-medium text-[#f1f1f1] overflow-hidden">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-3.5 h-full hover:bg-[#3f3f3f] transition-colors cursor-pointer ${
                    isLiked ? 'text-[#3ea6ff]' : 'text-[#f1f1f1]'
                  }`}
                  title="I like this"
                >
                  <ThumbsUpIcon className="h-5 w-5" filled={isLiked} />
                  <span>{likeCount}</span>
                </button>
                <div className="h-5 w-px bg-[#3f3f3f]" />
                <button
                  onClick={handleDislike}
                  className={`px-3 h-full hover:bg-[#3f3f3f] transition-colors cursor-pointer ${
                    isDisliked ? 'text-[#3ea6ff]' : 'text-[#f1f1f1]'
                  }`}
                  title="I dislike this"
                >
                  <ThumbsDownIcon className="h-5 w-5" filled={isDisliked} />
                </button>
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] h-9 px-4 text-[14px] font-medium text-[#f1f1f1] transition-colors cursor-pointer"
                title="Share video"
              >
                <ShareIcon className="h-5 w-5" />
                <span>Share</span>
              </button>

              {/* Download button */}
              <button
                className="hidden sm:flex items-center gap-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] h-9 px-4 text-[14px] font-medium text-[#f1f1f1] transition-colors cursor-pointer"
                title="Download video"
              >
                <DownloadIcon className="h-5 w-5" />
                <span>Download</span>
              </button>

              {/* Clip button */}
              <button
                className="hidden md:flex items-center gap-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] h-9 px-4 text-[14px] font-medium text-[#f1f1f1] transition-colors cursor-pointer"
                title="Clip"
              >
                <ScissorsIcon className="h-5 w-5" />
                <span>Clip</span>
              </button>

              {/* Save button */}
              <button
                className="hidden xl:flex items-center gap-2 rounded-full bg-[#272727] hover:bg-[#3f3f3f] h-9 px-4 text-[14px] font-medium text-[#f1f1f1] transition-colors cursor-pointer"
                title="Save to playlist"
              >
                <PlaylistIcon className="h-5 w-5" />
                <span>Save</span>
              </button>

              {/* More button */}
              <button
                className="flex items-center justify-center rounded-full bg-[#272727] hover:bg-[#3f3f3f] h-9 w-9 text-[#f1f1f1] transition-colors cursor-pointer"
                title="More actions"
              >
                <MoreHorizontalIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="mt-3 cursor-pointer rounded-xl bg-[#272727] p-3 text-[14px] text-[#f1f1f1] hover:bg-[#383838] transition-colors"
          >
            <div className="flex items-center gap-2 font-bold text-[#f1f1f1] text-[14px] mb-1">
              <span>{video.views}</span>
              <span>{video.uploadedAt}</span>
              <span className="text-[#3ea6ff] font-medium ml-1">#{video.category}</span>
            </div>

            <p
              className={`whitespace-pre-line text-[#f1f1f1] text-[14px] leading-relaxed ${
                !isDescriptionExpanded ? 'line-clamp-2' : ''
              }`}
            >
              {video.description}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDescriptionExpanded(!isDescriptionExpanded);
              }}
              className="mt-1 text-[14px] font-bold text-[#f1f1f1] hover:underline focus:outline-none"
            >
              {isDescriptionExpanded ? 'Show less' : '...more'}
            </button>
          </div>

          {/* Comments Section */}
          <section className="mt-6">
            <div className="flex items-center gap-8 mb-6">
              <h2 className="text-[20px] font-bold text-[#f1f1f1]">
                {comments.length} Comments
              </h2>
              <button className="flex items-center gap-2 text-[14px] font-medium text-[#f1f1f1] hover:text-white cursor-pointer">
                <SortIcon className="h-6 w-6" />
                <span>Sort by</span>
              </button>
            </div>

            {/* Add a comment box */}
            <form onSubmit={handleAddComment} className="flex gap-4 items-start mb-8">
              <GuestAvatarIcon className="h-10 w-10" />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newCommentText}
                  onFocus={() => setIsCommentInputFocused(true)}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full border-b border-[#717171] bg-transparent pb-1.5 text-[14px] text-[#f1f1f1] placeholder-[#aaaaaa] focus:border-white focus:outline-none transition-colors"
                />

                {isCommentInputFocused && (
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setNewCommentText('');
                        setIsCommentInputFocused(false);
                      }}
                      className="rounded-full px-4 py-2 text-[14px] font-medium text-[#f1f1f1] hover:bg-[#272727] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className={`rounded-full px-4 py-2 text-[14px] font-medium transition cursor-pointer ${
                        newCommentText.trim()
                          ? 'bg-[#3ea6ff] text-black hover:bg-[#65b8ff]'
                          : 'bg-[#272727] text-[#717171] cursor-not-allowed'
                      }`}
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-5">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="h-10 w-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col text-[14px]">
                    <div className="flex items-center gap-2 leading-none">
                      <span className="font-medium text-[#f1f1f1] text-[13px]">
                        @{comment.author.toLowerCase().replace(/\s+/g, '')}
                      </span>
                      <span className="text-[12px] text-[#aaaaaa]">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 text-[#f1f1f1] text-[14px] leading-[20px]">
                      {comment.text}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-[12px] text-[#aaaaaa]">
                      <button className="flex items-center gap-1.5 hover:text-white transition cursor-pointer">
                        <ThumbsUpIcon className="h-4 w-4" />
                        <span>{comment.likes > 0 ? comment.likes : ''}</span>
                      </button>
                      <button className="hover:text-white transition cursor-pointer">
                        <ThumbsDownIcon className="h-4 w-4" />
                      </button>
                      <button className="font-medium text-[#f1f1f1] hover:text-white transition cursor-pointer">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Related Videos sidebar (402px) */}
        <div className="w-full lg:w-[402px] shrink-0 space-y-3">
          {/* Related Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {relatedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setRelatedFilter(cat)}
                className={`shrink-0 h-8 rounded-lg px-3 text-[12px] transition-colors cursor-pointer ${
                  relatedFilter === cat
                    ? 'bg-[#f1f1f1] text-[#0f0f0f] font-semibold'
                    : 'bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Related Videos List */}
          <div className="space-y-3">
            {upNextVideos.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectVideo(item);
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group flex gap-2 cursor-pointer rounded-lg p-1 hover:bg-[#272727] transition-colors"
              >
                {/* 168x94 Thumbnail */}
                <div className="relative w-[168px] h-[94px] shrink-0 overflow-hidden rounded-lg bg-[#272727]">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1 right-1 rounded-[4px] bg-black/85 px-1 py-0.5 text-[11px] font-medium text-white">
                    {item.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-col min-w-0 pr-1 flex-1">
                  <h3
                    className="text-[14px] font-medium text-[#f1f1f1] line-clamp-2 leading-[18px] group-hover:text-white"
                    title={item.title}
                  >
                    {item.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-[12px] text-[#aaaaaa]">
                    <span className="truncate hover:text-[#f1f1f1]">{item.channel.name}</span>
                    {item.channel.verified && <CheckBadgeIcon className="h-3.5 w-3.5" />}
                  </div>
                  <div className="text-[12px] text-[#aaaaaa]">
                    <span>{item.views}</span>
                    <span className="mx-1">•</span>
                    <span>{item.uploadedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
