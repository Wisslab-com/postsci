import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Calendar, Shield, Search, Menu, X, 
  BookOpen, TrendingUp, Award, ChevronRight,
  Microscope, Globe, Zap, Brain, Cpu, Leaf
} from 'lucide-react';
import { researchPosts, ResearchPost } from './data/researchPosts';
import { events } from './data/events';
import { sponsors } from './data/sponsors';
import ResearchCard from './components/ResearchCard';
import ArticlePage from './components/ArticlePage';
import EventsHub from './components/EventsHub';
import AdminPanel from './components/AdminPanel';

type Page = 'home' | 'article' | 'events' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPost, setSelectedPost] = useState<ResearchPost | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All', icon: <Globe className="w-4 h-4" /> },
    { id: 'Artificial Intelligence', label: 'AI', icon: <Brain className="w-4 h-4" /> },
    { id: 'Quantum Computing', label: 'Quantum', icon: <Cpu className="w-4 h-4" /> },
    { id: 'Biotechnology', label: 'Biotech', icon: <Microscope className="w-4 h-4" /> },
    { id: 'Energy', label: 'Energy', icon: <Zap className="w-4 h-4" /> },
    { id: 'Neuroscience', label: 'Neuro', icon: <Brain className="w-4 h-4" /> },
    { id: 'Climate Science', label: 'Climate', icon: <Leaf className="w-4 h-4" /> },
  ];

  const filteredPosts = researchPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (post: ResearchPost) => {
    setSelectedPost(post);
    setCurrentPage('article');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentPage('home');
    setSelectedPost(null);
  };

  // Admin Page
  if (currentPage === 'admin') {
    return <AdminPanel onBack={() => setCurrentPage('home')} />;
  }

  // Article Page
  if (currentPage === 'article' && selectedPost) {
    return <ArticlePage post={selectedPost} onBack={handleBack} />;
  }

  // Events Full Page
  if (currentPage === 'events') {
    return (
      <div className="min-h-screen bg-slate-light">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-lg font-bold text-slate-dark">PostScientist</span>
            </div>
            <button
              onClick={() => setCurrentPage('home')}
              className="text-sm text-navy font-medium"
            >
              ← Back
            </button>
          </div>
        </header>
        <EventsHub variant="full" />
        
        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
          <div className="flex items-center justify-around py-2">
            <button onClick={() => setCurrentPage('home')} className="flex flex-col items-center gap-0.5 p-2 text-slate-medium">
              <Home className="w-5 h-5" />
              <span className="text-[10px]">Home</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 p-2 text-navy">
              <Calendar className="w-5 h-5" />
              <span className="text-[10px]">Events</span>
            </button>
            <button onClick={() => setCurrentPage('admin')} className="flex flex-col items-center gap-0.5 p-2 text-slate-medium">
              <Shield className="w-5 h-5" />
              <span className="text-[10px]">Admin</span>
            </button>
          </div>
        </nav>
      </div>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-slate-light">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left Sidebar */}
        <aside className="w-64 h-screen sticky top-0 bg-white border-r border-gray-100 flex flex-col">
          {/* Logo */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-slate-dark">PostScientist</h1>
                <p className="text-[10px] text-slate-medium uppercase tracking-wider">Video-First Research</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => setCurrentPage('home')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-navy/5 text-navy font-medium text-sm"
            >
              <Home className="w-5 h-5" />
              Research Stream
            </button>
            <button
              onClick={() => setCurrentPage('events')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-medium hover:bg-gray-50 transition-colors text-sm"
            >
              <Calendar className="w-5 h-5" />
              Events Hub
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-medium hover:bg-gray-50 transition-colors text-sm"
            >
              <Shield className="w-5 h-5" />
              Admin Panel
            </button>
          </nav>

          {/* Categories */}
          <div className="p-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-slate-medium uppercase tracking-wider mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-navy/10 text-navy font-medium'
                      : 'text-slate-medium hover:bg-gray-50'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Top Bar */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search research, authors, topics..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-light border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </button>
              </div>
            </div>
          </header>

          {/* Research Stream */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-slate-dark">Research Stream</h2>
                <p className="text-sm text-slate-medium mt-0.5">
                  {filteredPosts.length} publications • Latest video-first research
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-navy text-white rounded-lg text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </button>
              </div>
            </div>

            {/* Research Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredPosts.map(post => (
                <ResearchCard key={post.id} post={post} onClick={handlePostClick} />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-dark">No results found</h3>
                <p className="text-sm text-slate-medium mt-1">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 h-screen sticky top-0 bg-white border-l border-gray-100 overflow-y-auto">
          <div className="p-5 space-y-6">
            {/* Events Widget */}
            <EventsHub variant="sidebar" />

            {/* Trending Sponsors */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-slate-dark flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                Research Sponsors
              </h3>
              <div className="space-y-2">
                {sponsors.map(sponsor => (
                  <div
                    key={sponsor.id}
                    className="flex items-center gap-3 p-3 bg-slate-light rounded-lg hover:bg-gold/5 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                      {sponsor.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-dark">{sponsor.name}</h4>
                      <p className="text-xs text-slate-medium">{sponsor.industry}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-4 bg-navy/5 rounded-xl">
              <h3 className="text-sm font-semibold text-navy mb-3">Platform Stats</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-medium">Total Publications</span>
                  <span className="font-semibold text-slate-dark">{researchPosts.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-medium">Total Views</span>
                  <span className="font-semibold text-slate-dark">
                    {researchPosts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-medium">Upcoming Events</span>
                  <span className="font-semibold text-slate-dark">{events.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-medium">Active Sponsors</span>
                  <span className="font-semibold text-slate-dark">{sponsors.length}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-lg font-bold text-slate-dark">PostScientist</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search research..."
                className="w-full pl-10 pr-4 py-2 bg-slate-light border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
              />
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-100 overflow-hidden"
              >
                <div className="p-4 space-y-2">
                  <button
                    onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-navy/5 text-navy font-medium text-sm"
                  >
                    <Home className="w-5 h-5" />
                    Research Stream
                  </button>
                  <button
                    onClick={() => { setCurrentPage('events'); setMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-medium text-sm"
                  >
                    <Calendar className="w-5 h-5" />
                    Events Hub
                  </button>
                  <button
                    onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-medium text-sm"
                  >
                    <Shield className="w-5 h-5" />
                    Admin Panel
                  </button>
                  
                  {/* Mobile Categories */}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-semibold text-slate-medium uppercase tracking-wider mb-2 px-3">Categories</p>
                    <div className="flex flex-wrap gap-2 px-3">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => { setSelectedCategory(cat.id); setMobileMenuOpen(false); }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            selectedCategory === cat.id
                              ? 'bg-navy text-white'
                              : 'bg-gray-100 text-slate-medium'
                          }`}
                        >
                          {cat.icon}
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Mobile Content */}
        <main className="pb-20">
          <div className="px-4 py-4">
            <h2 className="font-serif text-xl font-bold text-slate-dark mb-1">Research Stream</h2>
            <p className="text-xs text-slate-medium mb-4">
              {filteredPosts.length} publications
            </p>

            {/* Mobile Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-navy text-white'
                      : 'bg-white border border-gray-200 text-slate-medium'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile Research Grid */}
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <ResearchCard key={post.id} post={post} onClick={handlePostClick} />
              ))}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex flex-col items-center gap-0.5 p-2 text-navy"
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-medium">Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('events')}
              className="flex flex-col items-center gap-0.5 p-2 text-slate-medium"
            >
              <Calendar className="w-5 h-5" />
              <span className="text-[10px]">Events</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className="flex flex-col items-center gap-0.5 p-2 text-slate-medium"
            >
              <Shield className="w-5 h-5" />
              <span className="text-[10px]">Admin</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
