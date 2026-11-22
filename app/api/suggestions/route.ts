import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || !q.trim()) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const res = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
        q.trim()
      )}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (res.ok) {
      const data = await res.json();
      // data format: [query, [sug1, sug2, ...], ...]
      if (Array.isArray(data) && Array.isArray(data[1])) {
        const suggestions = data[1]
          .filter((item) => typeof item === 'string')
          .slice(0, 10);
        return NextResponse.json({ suggestions });
      }
    }
  } catch (err) {
    console.error('Error fetching YouTube search suggestions:', err);
  }

  return NextResponse.json({ suggestions: [] });
}
