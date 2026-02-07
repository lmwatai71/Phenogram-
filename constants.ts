import { Post, Story, User, Song } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'terp_king',
  avatar: 'https://picsum.photos/id/64/150/150',
  isPremium: false,
  isVerified: false,
  isCreator: true,
  balance: 420.69
};

export const MOCK_USERS: User[] = [
  { id: '1', username: 'green_goddess', avatar: 'https://picsum.photos/id/65/150/150', isVerified: true, isPremium: true, isCreator: true },
  { id: '2', username: 'dank_daily', avatar: 'https://picsum.photos/id/66/150/150' },
  { id: '3', username: 'sativa_steve', avatar: 'https://picsum.photos/id/67/150/150', isPremium: true },
  { id: '4', username: 'indica_in_da_couch', avatar: 'https://picsum.photos/id/68/150/150' },
  { id: '5', username: 'hybrid_hero', avatar: 'https://picsum.photos/id/69/150/150', isVerified: true, isPremium: true, isCreator: true },
  // International Users
  { id: 'u_thai', username: 'bangkok_buds', avatar: 'https://picsum.photos/id/400/150/150', isVerified: true },
  { id: 'u_dam', username: 'amsterdam_classics', avatar: 'https://picsum.photos/id/401/150/150' },
  { id: 'u_bc', username: 'bc_growers_assoc', avatar: 'https://picsum.photos/id/402/150/150', isVerified: true },
  { id: 'u_jam', username: 'roots_culture_ja', avatar: 'https://picsum.photos/id/403/150/150' },
  { id: 'u_bcn', username: 'barcelona_club_social', avatar: 'https://picsum.photos/id/404/150/150' },
  { id: 'u_glass', username: 'heady_glass_art', avatar: 'https://picsum.photos/id/405/150/150', isVerified: true, isPremium: true, isCreator: true },
];

export const MOCK_SONGS: Song[] = [
  { id: 's1', title: 'High Grade', artist: 'The Green Team', coverUrl: 'https://picsum.photos/id/301/100/100', duration: 180 },
  { id: 's2', title: 'Purple Haze Dreams', artist: 'Hendrix Vibes', coverUrl: 'https://picsum.photos/id/302/100/100', duration: 210 },
  { id: 's3', title: 'Sunday Morning', artist: 'Chill Hop Beats', coverUrl: 'https://picsum.photos/id/304/100/100', duration: 150 },
  { id: 's4', title: 'Pass The Dutchie', artist: 'Reggae Legends', coverUrl: 'https://picsum.photos/id/305/100/100', duration: 200 },
  { id: 's5', title: 'Siam Soul', artist: 'Bangkok Beats', coverUrl: 'https://picsum.photos/id/306/100/100', duration: 190 },
  { id: 's6', title: 'Afrobeat Chill', artist: 'Global Rhythms', coverUrl: 'https://picsum.photos/id/307/100/100', duration: 220 },
];

export const MOCK_STORIES: Story[] = MOCK_USERS.map((user, i) => ({
  id: `story-${i}`,
  user,
  imageUrl: `https://picsum.photos/id/${100 + i * 2}/400/800`,
  isViewed: i > 5,
  song: i % 2 === 0 ? MOCK_SONGS[i % MOCK_SONGS.length] : undefined,
  location: i === 5 ? 'Phuket, Thailand' : i === 6 ? 'Amsterdam, NL' : undefined
}));

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    user: MOCK_USERS[0],
    imageUrl: 'https://picsum.photos/id/111/600/600',
    caption: 'Fresh harvest looking frosty! ❄️🌿 #organic #homegrow',
    likes: 420,
    comments: 69,
    isLiked: true,
    type: 'image',
    timestamp: '2h ago',
    song: MOCK_SONGS[0],
    location: 'Humboldt County, CA'
  },
  {
    id: 'post-thai',
    user: MOCK_USERS[5], // bangkok_buds
    imageUrl: 'https://picsum.photos/id/420/600/800',
    caption: 'The scene in Bangkok is exploding! 🇹🇭 Visiting the newest dispensaries on Sukhumvit. The quality of Thai stick 2.0 is insane. 🔥 #legalization #thailand',
    likes: 3402,
    comments: 156,
    isLiked: false,
    type: 'image',
    timestamp: '4h ago',
    location: 'Bangkok, Thailand',
    song: MOCK_SONGS[4]
  },
  {
    id: 'post-2',
    user: MOCK_USERS[4],
    imageUrl: 'https://picsum.photos/id/212/600/700',
    caption: 'Sunset sessions with the best terpenes. 🌅💨',
    likes: 1205,
    comments: 45,
    isLiked: false,
    type: 'image',
    timestamp: '5h ago'
  },
  {
    id: 'post-bcn',
    user: MOCK_USERS[9], // barcelona_club_social
    imageUrl: 'https://picsum.photos/id/421/600/600',
    caption: 'Member exclusives dropping this weekend. Spanabis prep is underway! 🇪🇸✨ #csc #bcn',
    likes: 890,
    comments: 42,
    isLiked: true,
    type: 'image',
    timestamp: '6h ago',
    location: 'Barcelona, Spain'
  },
  {
    id: 'post-3',
    user: MOCK_USERS[2],
    imageUrl: 'https://picsum.photos/id/113/600/600',
    caption: 'Macro shot of the day. Check out those trichomes! 🔬',
    likes: 89,
    comments: 12,
    isLiked: false,
    type: 'image',
    timestamp: '1d ago',
    song: MOCK_SONGS[2]
  },
  {
    id: 'post-jam',
    user: MOCK_USERS[8], // roots_culture_ja
    imageUrl: 'https://picsum.photos/id/422/600/750',
    caption: 'Respect the roots. 🇯🇲 Farming in the hills of St. Ann. One love. #landrace #culture',
    likes: 5600,
    comments: 230,
    isLiked: false,
    type: 'image',
    timestamp: '1d ago',
    location: 'Saint Ann Parish, Jamaica',
    song: MOCK_SONGS[3]
  },
  {
    id: 'post-glass',
    user: MOCK_USERS[10], // heady_glass_art
    imageUrl: 'https://picsum.photos/id/423/600/600',
    caption: 'Fresh out of the kiln. This piece features crushed opal and UV reactive glass. 🌪️💎 Available at the drop tomorrow.',
    likes: 12400,
    comments: 890,
    isLiked: true,
    type: 'image',
    timestamp: '2d ago',
    location: 'Denver, CO'
  }
];

export const MOCK_REELS: Post[] = [
  {
    id: 'reel-1',
    user: MOCK_USERS[1],
    imageUrl: 'https://picsum.photos/id/220/400/800', // Simulating video thumbnail
    caption: 'How to roll the perfect joint 101 📜✨ #tutorial',
    likes: 15200,
    comments: 420,
    isLiked: false,
    type: 'video',
    timestamp: '1d ago',
    song: MOCK_SONGS[1]
  },
  {
    id: 'reel-dam',
    user: MOCK_USERS[6], // amsterdam_classics
    imageUrl: 'https://picsum.photos/id/425/400/800',
    caption: 'Walking through the Red Light District to get to the best coffeeshop. 🚲🇳🇱 #travel',
    likes: 22000,
    comments: 1100,
    isLiked: true,
    type: 'video',
    timestamp: '2d ago',
    song: MOCK_SONGS[5],
    location: 'Amsterdam, Netherlands'
  },
  {
    id: 'reel-2',
    user: MOCK_USERS[3],
    imageUrl: 'https://picsum.photos/id/221/400/800',
    caption: 'Vibes in the studio today 🎵💨',
    likes: 3400,
    comments: 150,
    isLiked: true,
    type: 'video',
    timestamp: '2d ago',
    song: MOCK_SONGS[2]
  },
  {
    id: 'reel-bc',
    user: MOCK_USERS[7], // bc_growers
    imageUrl: 'https://picsum.photos/id/426/400/800',
    caption: 'Checking the outdoor crop. Canada grows the best, don\'t @ me. 🇨🇦🌲 #bcreal',
    likes: 8900,
    comments: 800,
    isLiked: false,
    type: 'video',
    timestamp: '3d ago',
    song: MOCK_SONGS[3],
    location: 'British Columbia, Canada'
  },
  {
    id: 'reel-3',
    user: MOCK_USERS[0],
    imageUrl: 'https://picsum.photos/id/222/400/800',
    caption: 'Glass cleaning ASMR 🧼🛁',
    likes: 8900,
    comments: 800,
    isLiked: false,
    type: 'video',
    timestamp: '3d ago',
    song: MOCK_SONGS[3]
  }
];