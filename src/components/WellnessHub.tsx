import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Mic, FileText, Star, TrendingUp, Play, Clock, Heart, Share2, Bookmark, MessageCircle, Image as ImageIcon } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
}

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  category: string;
  instructor: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  steps: number;
}

const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    // Use a default wellness image if the original fails to load
    setImgSrc('https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60');
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#1E1E1E] animate-pulse flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-[#FF7A00]/50" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-[#1E1E1E] flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-8 h-8 text-[#FF7A00]/50 mx-auto mb-2" />
            <span className="text-[#B3B3B3] text-sm">Image not available</span>
          </div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
      />
    </div>
  );
};

const WellnessHub = () => {
  const [activeSection, setActiveSection] = useState('blog');

  const sections = [
    { id: 'blog', label: 'Articles & Blog', icon: BookOpen },
    { id: 'videos', label: 'Video Library', icon: Video },
    { id: 'podcasts', label: 'Podcasts', icon: Mic },
    { id: 'guides', label: 'Guides & Plans', icon: FileText }
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'The Science of Sleep: How to Optimize Your Rest',
      description: 'Discover the latest research on sleep optimization and practical tips for better rest.',
      image: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=800&auto=format&fit=crop&q=60',
      category: 'Sleep',
      author: 'Dr. Sarah Johnson',
      date: 'Mar 15, 2024',
      readTime: '8 min read',
      likes: 234,
      comments: 45
    },
    {
      id: '2',
      title: 'Mindfulness in Daily Life: A Practical Guide',
      description: 'Learn how to incorporate mindfulness practices into your everyday routine.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
      category: 'Mindfulness',
      author: 'Emma Thompson',
      date: 'Mar 14, 2024',
      readTime: '6 min read',
      likes: 189,
      comments: 32
    },
    {
      id: '3',
      title: 'Nutrition Myths Debunked',
      description: 'Separating fact from fiction in the world of nutrition and healthy eating.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60',
      category: 'Nutrition',
      author: 'Michael Chen',
      date: 'Mar 13, 2024',
      readTime: '10 min read',
      likes: 312,
      comments: 67
    }
  ];

  const videos: Video[] = [
    {
      id: '1',
      title: 'Morning Yoga Flow for Beginners',
      description: 'Start your day with this gentle yoga sequence designed for beginners.',
      thumbnail: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop&q=60',
      duration: '15:30',
      views: 1234,
      category: 'Yoga',
      instructor: 'Lisa Anderson'
    },
    {
      id: '2',
      title: 'Meditation Techniques for Stress Relief',
      description: 'Learn effective meditation techniques to manage daily stress.',
      thumbnail: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&auto=format&fit=crop&q=60',
      duration: '20:15',
      views: 2345,
      category: 'Meditation',
      instructor: 'David Chen'
    },
    {
      id: '3',
      title: 'Healthy Meal Prep Guide',
      description: 'Step-by-step guide to preparing nutritious meals for the week.',
      thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60',
      duration: '25:45',
      views: 3456,
      category: 'Nutrition',
      instructor: 'Sarah Miller'
    }
  ];

  const guides: Guide[] = [
    {
      id: '1',
      title: '30-Day Wellness Challenge',
      description: 'A comprehensive guide to improving your overall wellness in 30 days.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60',
      category: 'Wellness',
      level: 'Beginner',
      duration: '30 days',
      steps: 30
    },
    {
      id: '2',
      title: 'Advanced Meditation Techniques',
      description: 'Take your meditation practice to the next level with these advanced techniques.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60',
      category: 'Meditation',
      level: 'Advanced',
      duration: '21 days',
      steps: 21
    },
    {
      id: '3',
      title: 'Nutrition Planning Guide',
      description: 'Learn how to plan and prepare balanced meals for optimal health.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60',
      category: 'Nutrition',
      level: 'Intermediate',
      duration: '14 days',
      steps: 14
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'blog':
        return (
          <div className="space-y-6">
            {articles.map((article) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  <div className="md:col-span-1">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-[#FF7A00]/20 text-[#FF7A00] rounded-full text-sm">
                        {article.category}
                      </span>
                      <span className="text-[#B3B3B3] text-sm">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                    <p className="text-[#B3B3B3] mb-4">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-[#B3B3B3]">
                          <Heart className="w-4 h-4" />
                          <span>{article.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#B3B3B3]">
                          <MessageCircle className="w-4 h-4" />
                          <span>{article.comments}</span>
                        </div>
                        <span className="text-[#B3B3B3] text-sm">{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-[#FF7A00]/10 rounded-full transition-colors">
                          <Bookmark className="w-4 h-4 text-[#FF7A00]" />
                        </button>
                        <button className="p-2 hover:bg-[#FF7A00]/10 rounded-full transition-colors">
                          <Share2 className="w-4 h-4 text-[#FF7A00]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        );

      case 'videos':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="w-12 h-12 rounded-full bg-[#FF7A00] flex items-center justify-center">
                      <Play className="w-6 h-6 text-black" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-[#FF7A00]/20 text-[#FF7A00] rounded-full text-sm">
                      {video.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-[#B3B3B3] text-sm mb-3">{video.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#B3B3B3]">By {video.instructor}</span>
                    <span className="text-[#B3B3B3]">{video.views} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'podcasts':
        return (
          <div className="glass-card p-8 text-center">
            <Mic className="w-16 h-16 text-[#FF7A00] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Fitness Podcasts</h3>
            <p className="text-[#B3B3B3] mb-6">Expert interviews and wellness discussions coming soon!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-[#1E1E1E] rounded-lg">
                <h4 className="text-white font-semibold mb-2">Upcoming Episodes</h4>
                <ul className="text-left space-y-2">
                  <li className="text-[#B3B3B3]">• Nutrition Myths Debunked</li>
                  <li className="text-[#B3B3B3]">• Sleep Optimization</li>
                  <li className="text-[#B3B3B3]">• Mental Health & Exercise</li>
                </ul>
              </div>
              <div className="p-4 bg-[#1E1E1E] rounded-lg">
                <h4 className="text-white font-semibold mb-2">Featured Guests</h4>
                <ul className="text-left space-y-2">
                  <li className="text-[#B3B3B3]">• Dr. Sarah Johnson</li>
                  <li className="text-[#B3B3B3]">• Coach Mike Thompson</li>
                  <li className="text-[#B3B3B3]">• Nutritionist Lisa Chen</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'guides':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-48"
                  />
                  <div className="absolute top-2 right-2 bg-[#FF7A00] text-white px-2 py-1 rounded text-sm">
                    {guide.level}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#FF7A00]/20 text-[#FF7A00] rounded-full text-sm">
                      {guide.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      guide.level === 'Beginner' 
                        ? 'bg-green-500/20 text-green-500'
                        : guide.level === 'Intermediate'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {guide.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{guide.title}</h3>
                  <p className="text-[#B3B3B3] mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#FF7A00]" />
                      <span className="text-[#B3B3B3]">{guide.duration}</span>
                    </div>
                    <span className="text-[#B3B3B3]">{guide.steps} steps</span>
                  </div>
                  <button className="w-full mt-4 py-2 bg-[#FF7A00] text-black rounded-lg hover:bg-[#FFB347] transition-colors">
                    Start Guide
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#FF7A00]/20 to-[#FFB347]/20 backdrop-blur-lg rounded-2xl p-6 border border-[#FF7A00]/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FF7A00] flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Wellness Hub</h1>
            <p className="text-white/70">Discover articles, videos, and guides for your wellness journey</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="glass-card p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-[#FF7A00] text-black'
                  : 'bg-[#1E1E1E] text-white hover:bg-[#2A2A2A]'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default WellnessHub;
