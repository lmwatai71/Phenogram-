export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: number;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  type: 'image' | 'video';
  timestamp: string;
  song?: Song;
  location?: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  isVerified?: boolean;
  isPremium?: boolean;
  isCreator?: boolean;
  balance?: number;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  isViewed: boolean;
  song?: Song;
  location?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  sources?: { title: string; uri: string }[];
}

export enum ViewState {
  FEED = 'FEED',
  REELS = 'REELS',
  CREATE = 'CREATE',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE',
  MESSAGES = 'MESSAGES',
  METAVERSE = 'METAVERSE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  EARNINGS = 'EARNINGS'
}