import { NextRequest, NextResponse } from 'next/server';
import { fetchYouTubeVideos, fetchVideoComments } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || undefined;
  const videoId = searchParams.get('videoId') || undefined;

  try {
    if (videoId) {
      const comments = await fetchVideoComments(videoId);
      return NextResponse.json({
        success: true,
        comments,
      });
    }

    const videos = await fetchYouTubeVideos(query, category);
    return NextResponse.json({
      success: true,
      hasApiKey: Boolean(process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY),
      count: videos.length,
      videos,
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
