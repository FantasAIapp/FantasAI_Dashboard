
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Heart, Bookmark, Share, TrendingUp, Filter, Search } from 'lucide-react';

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Articles', count: 24 },
    { id: 'nutrition', name: 'Nutrition', count: 8 },
    { id: 'workouts', name: 'Workouts', count: 6 },
    { id: 'mental-health', name: 'Mental Health', count: 5 },
    { id: 'recovery', name: 'Recovery', count: 5 }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: '10 High-Protein Breakfast Ideas to Fuel Your Morning Workout',
      excerpt: 'Start your day right with these delicious, protein-packed breakfast recipes that will give you sustained energy...',
      author: 'Dr. Sarah Johnson',
      readTime: '7 min read',
      category: 'nutrition',
      image: '🍳',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      likes: 234,
      bookmarks: 45,
      trending: true
    },
    {
      id: 2,
      title: 'The Science of Sleep: How Quality Rest Transforms Your Fitness',
      excerpt: 'Discover how optimizing your sleep can dramatically improve your workout performance and recovery times...',
      author: 'Dr. Michael Chen',
      readTime: '12 min read',
      category: 'recovery',
      image: '😴',
      bgGradient: 'from-blue-500/20 to-purple-500/20',
      likes: 189,
      bookmarks: 67,
      trending: false
    },
    {
      id: 3,
      title: 'HIIT vs Steady Cardio: Which Burns More Fat?',
      excerpt: 'A comprehensive comparison of high-intensity interval training versus traditional steady-state cardio...',
      author: 'Emma Wilson',
      readTime: '9 min read',
      category: 'workouts',
      image: '🏃‍♀️',
      bgGradient: 'from-green-500/20 to-teal-500/20',
      likes: 312,
      bookmarks: 89,
      trending: true
    },
    {
      id: 4,
      title: 'Mindful Eating: Transform Your Relationship with Food',
      excerpt: 'Learn how practicing mindfulness can help you make better food choices and enjoy meals more fully...',
      author: 'Dr. Lisa Park',
      readTime: '11 min read',
      category: 'mental-health',
      image: '🧘‍♀️',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      likes: 156,
      bookmarks: 34,
      trending: false
    },
    {
      id: 5,
      title: 'Building Muscle After 40: A Complete Guide',
      excerpt: 'Age is just a number when it comes to building strength. Here\'s everything you need to know about muscle building...',
      author: 'Coach Mark Davis',
      readTime: '15 min read',
      category: 'workouts',
      image: '💪',
      bgGradient: 'from-red-500/20 to-orange-500/20',
      likes: 278,
      bookmarks: 76,
      trending: true
    },
    {
      id: 6,
      title: 'Stress Management Techniques for Busy Professionals',
      excerpt: 'Practical strategies to manage stress and maintain mental wellness even with a demanding schedule...',
      author: 'Dr. Rachel Green',
      readTime: '8 min read',
      category: 'mental-health',
      image: '🌟',
      bgGradient: 'from-indigo-500/20 to-blue-500/20',
      likes: 203,
      bookmarks: 52,
      trending: false
    }
  ];

  const filteredArticles = featuredArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ArticleCard = ({ article, featured = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card border border-[#FF7A00]/20 overflow-hidden cursor-pointer group ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      {/* Article Header */}
      <div className={`p-6 bg-gradient-to-r ${article.bgGradient} relative`}>
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{article.image}</div>
          <div className="flex gap-2">
            {article.trending && (
              <div className="flex items-center gap-1 px-2 py-1 bg-[#FF7A00]/20 border border-[#FF7A00]/50 rounded-full">
                <TrendingUp className="w-3 h-3 text-[#FF7A00]" />
                <span className="text-[#FF7A00] text-xs font-medium">Trending</span>
              </div>
            )}
            <div className="px-2 py-1 bg-white/10 rounded-full">
              <span className="text-white text-xs font-medium capitalize">{article.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-6">
        <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#FF7A00] transition-colors">
          {article.title}
        </h3>
        <p className="text-[#B3B3B3] text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#FF7A00]" />
            <span className="text-white text-sm font-medium">{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#B3B3B3]" />
            <span className="text-[#B3B3B3] text-sm">{article.readTime}</span>
          </div>
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between pt-4 border-t border-[#FF7A00]/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-white text-sm">{article.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bookmark className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-white text-sm">{article.bookmarks}</span>
            </div>
          </div>
          <button className="p-2 hover:bg-[#FF7A00]/10 rounded-lg transition-colors">
            <Share className="w-4 h-4 text-[#B3B3B3] hover:text-[#FF7A00]" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 orange-gradient border border-[#FF7A00]/30"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Wellness Blog</h2>
            <p className="text-white/70">Expert insights and latest research in fitness and nutrition</p>
          </div>
          <div className="text-6xl">📚</div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 border border-[#FF7A00]/20"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FF7A00]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="orange-input pl-12"
            />
          </div>

          {/* Filter Button */}
          <button className="orange-button px-4 py-2 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#FF7A00] text-black'
                  : 'bg-[#1E1E1E] text-[#B3B3B3] hover:text-white border border-[#FF7A00]/30'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured Article */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-[#FF7A00]" />
          Featured Article
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ArticleCard article={featuredArticles[0]} featured />
          <div className="space-y-4">
            <div className="glass-card p-6 border border-[#FF7A00]/20">
              <h4 className="text-white font-bold mb-4">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF7A00]">150+</div>
                  <div className="text-[#B3B3B3] text-sm">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFB347]">50+</div>
                  <div className="text-[#B3B3B3] text-sm">Authors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF7A00]">10k+</div>
                  <div className="text-[#B3B3B3] text-sm">Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFB347]">4.8★</div>
                  <div className="text-[#B3B3B3] text-sm">Rating</div>
                </div>
              </div>
            </div>
            <div className="glass-card p-6 border border-[#FF7A00]/20">
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <p className="text-[#B3B3B3] text-sm mb-4">
                Get weekly wellness tips and exclusive content delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="orange-input flex-1"
                />
                <button className="orange-button px-4">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Articles Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6">Latest Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(1).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button className="orange-button px-8 py-3">
          Load More Articles
        </button>
      </motion.div>
    </div>
  );
};

export default BlogSection;
