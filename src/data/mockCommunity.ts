import { TransformationStory } from '../types';

export const mockTransformations: TransformationStory[] = [
  {
    id: 'tr-1',
    name: 'David Miller',
    achievement: 'Lost 28 lbs & Built Visible Abs',
    duration: '12 Weeks',
    weightChange: '202 lbs ➔ 174 lbs',
    quote: 'ROSE 30 completely changed my mindset around fitness. No 2-hour boring treadmill sessions—just high-intensity, science-backed lifting and realistic nutrition advice.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    verified: true
  },
  {
    id: 'tr-2',
    name: 'Sarah Chen',
    achievement: 'First Pull-Up to 10 Reps & Body Recomp',
    duration: '16 Weeks',
    weightChange: '142 lbs ➔ 133 lbs (Gained Lean Muscle)',
    quote: 'The exercise form breakdowns are better than having an in-person trainer. I went from zero pull-ups to banging out sets of 8 with proper scapular retraction!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    verified: true
  },
  {
    id: 'tr-3',
    name: 'Alexandre Roy',
    achievement: 'Added 40 lbs to Squat & Fixed Lower Back Pain',
    duration: '8 Weeks',
    weightChange: '175 lbs ➔ 182 lbs (Lean Bulk)',
    quote: 'The mobility routines fixed my tight hip flexors in 2 weeks. Now I can squat below parallel completely pain-free. Best fitness channel on the internet.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    verified: true
  }
];

export const mockChannelStats = {
  activeMembers: '145K+',
  workoutsCompleted: '1.2M+',
  hoursStreamed: '450K+',
  averageRating: '4.9/5.0',
  communityCount: '280K+ Subscribers'
};

export const mockCoaches = [
  {
    name: 'Marcus Vance',
    role: 'Lead Strength & Conditioning Coach',
    credentials: 'CSCS, MSc Sports Science, Former NCAA Athlete',
    bio: 'Specializes in explosive power, progressive overload mechanics, and injury-prevention protocols.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Nutrition & Mobility',
    credentials: 'Registered Dietitian (RD), Functional Movement Specialist',
    bio: 'Dedicated to helping athletes fuel their bodies without restrictive crash diets while achieving joint longevity.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  }
];

export const mockVideoShowcases = [
  {
    id: 'vid-1',
    title: '30-Minute Full Body Dumbbell Shred | No Gym Required',
    duration: '32:15',
    views: '1.4M views',
    date: '2 weeks ago',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/cbKkB3POqaY',
    category: 'Full Body'
  },
  {
    id: 'vid-2',
    title: 'How to Fix Your Squat Form in 5 Minutes (Stop Knee Pain)',
    duration: '12:40',
    views: '890K views',
    date: '1 month ago',
    thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/bEv6CCg2BC8',
    category: 'Form Guide'
  },
  {
    id: 'vid-3',
    title: 'High-Protein Meal Prep For The Week (Under $30)',
    duration: '18:22',
    views: '2.1M views',
    date: '3 weeks ago',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/JCXUYuzwNrM',
    category: 'Nutrition'
  }
];
