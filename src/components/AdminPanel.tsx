import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Plus, BarChart3, Users, Calendar, Award, 
  FileText, Eye, TrendingUp, Lock, LogOut, Save, X
} from 'lucide-react';
import { researchPosts, ResearchPost } from '../data/researchPosts';
import { events } from '../data/events';
import { sponsors } from '../data/sponsors';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AdminPanelProps {
  onBack: () => void;
}

type AdminTab = 'dashboard' | 'posts' | 'sponsors' | 'events' | 'create';

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Create post form state
  const [newPost, setNewPost] = useState({
    title: '',
    author: '',
    videoUrl: '',
    thumbnailUrl: '',
    abstract: '',
    fullText: '',
    isSponsored: false,
    sponsorName: '',
    category: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin/admin123 for demo.');
    }
  };

  const totalViews = researchPosts.reduce((sum, p) => sum + p.views, 0);
  const totalCitations = researchPosts.reduce((sum, p) => sum + p.citations, 0);

  const viewsData = researchPosts.map(p => ({
    name: p.title.split(' ').slice(0, 3).join(' '),
    views: p.views,
    citations: p.citations
  }));

  const monthlyData = [
    { month: 'Jan', posts: 4, views: 15000 },
    { month: 'Feb', posts: 6, views: 28000 },
    { month: 'Mar', posts: 8, views: 42000 },
    { month: 'Apr', posts: 5, views: 35000 },
    { month: 'May', posts: 7, views: 48000 },
    { month: 'Jun', posts: 9, views: 62000 },
  ];

  // Login Screen
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-slate-light flex items-center justify-center px-4"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-dark">Sovereign Admin</h1>
            <p className="text-slate-medium mt-1">Restricted access — authorized personnel only</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-dark mb-1.5">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-dark mb-1.5">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                placeholder="Enter password"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm mb-4 flex items-center gap-1">
                <Lock className="w-4 h-4" />
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-navy text-white rounded-lg font-medium hover:bg-navy-dark transition-colors"
            >
              Sign In
            </button>
            <p className="text-xs text-slate-medium text-center mt-4">
              Demo credentials: admin / admin123
            </p>
          </form>

          <button
            onClick={onBack}
            className="mt-4 w-full py-2.5 text-slate-medium hover:text-navy transition-colors text-sm font-medium"
          >
            ← Back to PostScientist
          </button>
        </div>
      </motion.div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'posts', label: 'Posts', icon: <FileText className="w-4 h-4" /> },
    { id: 'create', label: 'Create Post', icon: <Plus className="w-4 h-4" /> },
    { id: 'sponsors', label: 'Sponsors', icon: <Award className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-light"
    >
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-slate-dark">Admin Panel</h1>
              <p className="text-xs text-slate-medium">Sovereign Access Level</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-sm text-slate-medium hover:text-navy transition-colors"
            >
              View Site
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white p-1 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-slate-medium hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-navy" />
                  </div>
                  <span className="text-sm text-slate-medium">Total Views</span>
                </div>
                <p className="text-2xl font-bold text-slate-dark">{totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm text-slate-medium">Total Citations</span>
                </div>
                <p className="text-2xl font-bold text-slate-dark">{totalCitations}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm text-slate-medium">Published Posts</span>
                </div>
                <p className="text-2xl font-bold text-slate-dark">{researchPosts.length}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-sm text-slate-medium">Sponsors</span>
                </div>
                <p className="text-2xl font-bold text-slate-dark">{sponsors.length}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-slate-dark mb-4">Monthly Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#0047AB" strokeWidth={2} dot={{ fill: '#0047AB' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-slate-dark mb-4">Top Performing Posts</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={viewsData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#6b7280" fontSize={12} />
                      <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={10} width={100} />
                      <Tooltip />
                      <Bar dataKey="views" fill="#0047AB" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-dark">Published Research Posts</h3>
              <button
                onClick={() => setActiveTab('create')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-dark transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Post
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {researchPosts.map(post => (
                <div key={post.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-20 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-dark text-sm line-clamp-1">{post.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-medium">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                      {post.isSponsored && <span className="text-gold font-medium">Sponsored</span>}
                    </div>
                  </div>
                  <span className="text-xs text-slate-medium px-2 py-1 bg-gray-100 rounded">{post.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Post Tab */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-serif text-xl font-bold text-slate-dark mb-6">Create New Research Post</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-dark mb-1.5">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    placeholder="Research title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-dark mb-1.5">Author</label>
                  <input
                    type="text"
                    value={newPost.author}
                    onChange={e => setNewPost({ ...newPost, author: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-dark mb-1.5">Category</label>
                  <select
                    value={newPost.category}
                    onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                  >
                    <option value="">Select category</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Quantum Computing">Quantum Computing</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Energy">Energy</option>
                    <option value="Neuroscience">Neuroscience</option>
                    <option value="Climate Science">Climate Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-dark mb-1.5">Video URL</label>
                  <input
                    type="text"
                    value={newPost.videoUrl}
                    onChange={e => setNewPost({ ...newPost, videoUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-dark mb-1.5">Thumbnail URL</label>
                  <input
                    type="text"
                    value={newPost.thumbnailUrl}
                    onChange={e => setNewPost({ ...newPost, thumbnailUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-dark mb-1.5">Abstract</label>
                  <textarea
                    value={newPost.abstract}
                    onChange={e => setNewPost({ ...newPost, abstract: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                    placeholder="Brief abstract of the research..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-dark mb-1.5">Full Text (Markdown)</label>
                  <textarea
                    value={newPost.fullText}
                    onChange={e => setNewPost({ ...newPost, fullText: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none font-mono text-sm"
                    placeholder="## Introduction&#10;&#10;Your research content here..."
                  />
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-light rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPost.isSponsored}
                      onChange={e => setNewPost({ ...newPost, isSponsored: e.target.checked })}
                      className="w-4 h-4 text-navy rounded border-gray-300 focus:ring-navy"
                    />
                    <span className="text-sm font-medium text-slate-dark">Sponsored Content</span>
                  </label>
                  {newPost.isSponsored && (
                    <input
                      type="text"
                      value={newPost.sponsorName}
                      onChange={e => setNewPost({ ...newPost, sponsorName: e.target.value })}
                      className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                      placeholder="Sponsor name"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => setActiveTab('posts')}
                className="px-4 py-2 text-slate-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-navy text-white rounded-lg font-medium hover:bg-navy-dark transition-colors">
                <Save className="w-4 h-4" />
                Publish Post
              </button>
            </div>
          </div>
        )}

        {/* Sponsors Tab */}
        {activeTab === 'sponsors' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-dark">Sponsor Management</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-dark transition-colors">
                <Plus className="w-4 h-4" />
                Add Sponsor
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {sponsors.map(sponsor => (
                <div key={sponsor.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-slate-light rounded-xl flex items-center justify-center text-2xl">
                    {sponsor.logo}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-dark">{sponsor.name}</h4>
                    <p className="text-sm text-slate-medium">{sponsor.industry} • {sponsor.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm text-navy hover:bg-navy/5 rounded-lg transition-colors">Edit</button>
                    <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-dark">Event Management</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-dark transition-colors">
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {events.map(event => (
                <div key={event.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-navy/10 rounded-xl flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-navy">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-lg font-bold text-navy leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-dark">{event.title}</h4>
                    <p className="text-sm text-slate-medium">{event.location} • {event.attendees.toLocaleString()} attendees</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.type === 'conference' ? 'bg-navy/10 text-navy' :
                    event.type === 'webinar' ? 'bg-green-50 text-green-700' :
                    event.type === 'workshop' ? 'bg-purple-50 text-purple-700' :
                    'bg-orange-50 text-orange-700'
                  }`}>
                    {event.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm text-navy hover:bg-navy/5 rounded-lg transition-colors">Edit</button>
                    <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
