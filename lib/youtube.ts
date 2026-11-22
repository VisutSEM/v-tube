import { Video, Comment } from '@/types';
import { VIDEOS } from '@/data/videos';

export function parseISO8601Duration(duration: string): string {
  if (!duration) return '0:00';
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return duration;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatViews(views: string | number): string {
  const num = typeof views === 'string' ? parseInt(views, 10) : views;
  if (isNaN(num)) return '0 views';
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B views`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M views`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K views`;
  return `${num} views`;
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

export async function fetchYouTubeVideos(query?: string, category?: string): Promise<Video[]> {
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    return filterMockVideos(query, category);
  }

  try {
    const searchTerm = query || (category && category !== 'All' ? category : '');

    let videoItems: any[] = [];

    if (searchTerm) {
      // 1. Search for video IDs
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&type=video&q=${encodeURIComponent(
        searchTerm
      )}&key=${apiKey}`;

      const searchRes = await fetch(searchUrl, { next: { revalidate: 180 } });
      if (!searchRes.ok) {
        console.warn(`[YouTube API] Search failed (${searchRes.status}). Using fallback.`);
        return filterMockVideos(query, category);
      }

      const searchData = await searchRes.json();
      const videoIds = (searchData.items || [])
        .map((item: any) => item.id?.videoId)
        .filter(Boolean)
        .join(',');

      if (!videoIds) return filterMockVideos(query, category);

      // 2. Fetch full statistics and contentDetails for each video
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
      const detailsRes = await fetch(detailsUrl, { next: { revalidate: 180 } });
      if (!detailsRes.ok) return filterMockVideos(query, category);

      const detailsData = await detailsRes.json();
      videoItems = detailsData.items || [];
    } else {
      // Fetch Most Popular Videos
      const popularUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=24&key=${apiKey}`;
      const popularRes = await fetch(popularUrl, { next: { revalidate: 180 } });
      if (!popularRes.ok) {
        console.warn(`[YouTube API] Most popular failed (${popularRes.status}). Using fallback.`);
        return filterMockVideos(query, category);
      }

      const popularData = await popularRes.json();
      videoItems = popularData.items || [];
    }

    if (!videoItems.length) return filterMockVideos(query, category);

    // Collect all channel IDs to fetch authentic avatars & subscriber counts
    const channelIds = Array.from(new Set(videoItems.map((item) => item.snippet?.channelId).filter(Boolean)));
    const channelMap = new Map<string, { avatar: string; subscribers: string }>();

    if (channelIds.length > 0) {
      try {
        const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds.join(',')}&key=${apiKey}`;
        const channelsRes = await fetch(channelsUrl, { next: { revalidate: 3600 } });
        if (channelsRes.ok) {
          const channelsData = await channelsRes.json();
          for (const ch of channelsData.items || []) {
            const chSnippet = ch.snippet || {};
            const chStats = ch.statistics || {};
            channelMap.set(ch.id, {
              avatar: chSnippet.thumbnails?.default?.url || chSnippet.thumbnails?.medium?.url || '',
              subscribers: chStats.subscriberCount
                ? `${formatViews(chStats.subscriberCount).replace(' views', '')} subscribers`
                : '1M subscribers',
            });
          }
        }
      } catch (err) {
        console.warn('[YouTube API] Could not fetch channel avatars:', err);
      }
    }

    // Map into our standard Video format
    return videoItems.map((item: any) => {
      const snippet = item.snippet || {};
      const contentDetails = item.contentDetails || {};
      const statistics = item.statistics || {};

      const thumbnails = snippet.thumbnails || {};
      const bestThumbnail =
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;

      const channelInfo = channelMap.get(snippet.channelId) || {
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces`,
        subscribers: '1.2M subscribers',
      };

      return {
        id: item.id,
        title: snippet.title || 'Untitled Video',
        description: snippet.description || '',
        thumbnail: bestThumbnail,
        duration: parseISO8601Duration(contentDetails.duration || ''),
        views: formatViews(statistics.viewCount || '0'),
        uploadedAt: formatTimeAgo(snippet.publishedAt || new Date().toISOString()),
        category: category && category !== 'All' ? category : 'Trending',
        likes: formatViews(statistics.likeCount || '0').replace(' views', ''),
        channel: {
          name: snippet.channelTitle || 'Unknown Channel',
          avatar: channelInfo.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces`,
          subscribers: channelInfo.subscribers,
          verified: true,
        },
        comments: [
          {
            id: `c_${item.id}_1`,
            author: 'YouTube Viewer',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
            timestamp: '1 day ago',
            text: 'Great video! Thanks for uploading in HD.',
            likes: 124,
          },
          {
            id: `c_${item.id}_2`,
            author: 'TechFan',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces',
            timestamp: '2 days ago',
            text: 'High quality content as always. Keep it up!',
            likes: 48,
          },
        ],
      };
    });
  } catch (error) {
    console.error('[YouTube API] Error fetching live data:', error);
    return filterMockVideos(query, category);
  }
}

export async function fetchVideoComments(videoId: string): Promise<Comment[]> {
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  if (!apiKey || apiKey === 'your_youtube_api_key_here') return [];

  try {
    const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=20&key=${apiKey}`;
    const res = await fetch(commentsUrl, { next: { revalidate: 300 } });
    if (!res.ok) return [];

    const data = await res.json();
    return (data.items || []).map((item: any) => {
      const topComment = item.snippet?.topLevelComment?.snippet || {};
      return {
        id: item.id,
        author: topComment.authorDisplayName || 'Viewer',
        avatar: topComment.authorProfileImageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
        timestamp: formatTimeAgo(topComment.publishedAt || new Date().toISOString()),
        text: topComment.textDisplay || topComment.textOriginal || '',
        likes: topComment.likeCount || 0,
      };
    });
  } catch (err) {
    console.warn('[YouTube API] Error fetching comments:', err);
    return [];
  }
}

function filterMockVideos(query?: string, category?: string): Video[] {
  return VIDEOS.filter((video) => {
    const matchesCategory =
      !category || category === 'All' || video.category.toLowerCase() === category.toLowerCase();

    const q = (query || '').toLowerCase().trim();
    const matchesSearch =
      !q ||
      video.title.toLowerCase().includes(q) ||
      video.channel.name.toLowerCase().includes(q) ||
      video.description.toLowerCase().includes(q) ||
      video.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });
}
