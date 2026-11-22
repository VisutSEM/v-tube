export interface Channel {
  name: string;
  avatar: string;
  subscribers: string;
  verified?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  text: string;
  likes: number;
}

export interface Video {
  id: string; // YouTube video ID
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadedAt: string;
  category: string;
  likes: string;
  channel: Channel;
  comments: Comment[];
}
