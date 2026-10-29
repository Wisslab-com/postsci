import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Calendar, Award, BookOpen, Share2, Download } from 'lucide-react';
import { ResearchPost } from '../data/researchPosts';
import { events } from '../data/events';
import VideoPlayer from './VideoPlayer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ArticlePageProps {
  post: ResearchPost;
  onBack: () => void;
}

export default function ArticlePage({ post, onBack }: ArticlePageProps) {
  const linkedEvent = events.find(e => e.id === post.eventId);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Mock citation data for the chart
  const citationData = [
    { month: 'Jan', citations: Math.floor(post.citations * 0.1) },
    { month: 'Feb', citations: Math.floor(post.citations * 0.25) },
    { month: 'Mar', citations: Math.floor(post.citations * 0.45) },
    { month: 'Apr', citations: Math.floor(post.citations * 0.6) },
    { month: 'May', citations: Math.floor(post.citations * 0.75) },
    { month: 'Jun', citations: Math.floor(post.citations * 0.88) },
    { month: 'Jul', citations: post.citations },
  ];

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="font-serif text-2xl font-bold text-slate-dark mt-8 mb-4">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
        const content = line.replace(/^\d+\.\s\*\*(.+?)\*\*:\s?(.*)/, '$1');
        const detail = line.replace(/^\d+\.\s\*\*.+?\*\*:\s?(.*)/, '$1');
        return (
          <li key={i} className="ml-6 mb-2 text-slate-medium leading-relaxed">
            <strong className="text-slate-dark">{content}:</strong> {detail}
          </li>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="ml-6 mb-1 text-slate-medium leading-relaxed list-disc">
            {line.replace('- ', '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}
          </li>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-slate-medium leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-medium hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Research Stream</span>
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 className="w-5 h-5 text-slate-medium" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Download className="w-5 h-5 text-slate-medium" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Video */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <VideoPlayer
          videoUrl={post.videoUrl}
          thumbnailUrl={post.thumbnailUrl}
          title={post.title}
        />
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title & Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-navy/10 text-navy text-sm font-medium rounded-full">
              {post.category}
            </span>
            {post.isSponsored && (
              <span className="px-3 py-1 bg-gold/10 text-gold text-sm font-medium rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Sponsored by {post.sponsorName}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-dark leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-medium">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
                <span className="text-navy font-semibold text-xs">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="font-medium text-slate-dark">{post.author}</span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.views.toLocaleString()} views
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {post.citations} citations
            </span>
          </div>
        </div>

        {/* Abstract */}
        <div className="bg-slate-light border-l-4 border-navy p-6 rounded-r-lg mb-8">
          <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-2">Abstract</h3>
          <p className="text-slate-dark font-medium italic leading-relaxed">
            {post.abstract}
          </p>
        </div>

        {/* Citation Metrics Chart */}
        <div className="mb-8 p-6 bg-slate-light rounded-xl">
          <h3 className="text-lg font-semibold text-slate-dark mb-4">Citation Growth (2026)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={citationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="citations" fill="#0047AB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Full Text */}
        <div className="prose prose-lg max-w-none">
          {renderMarkdown(post.fullText)}
        </div>

        {/* Linked Event */}
        {linkedEvent && (
          <div className="mt-8 p-6 bg-navy/5 rounded-xl border border-navy/10">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-2">Related Event</h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-lg font-semibold text-slate-dark">{linkedEvent.title}</h4>
                <p className="text-sm text-slate-medium mt-1">
                  {formatDate(linkedEvent.date)} • {linkedEvent.location}
                </p>
              </div>
              <button className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-dark transition-colors">
                Register
              </button>
            </div>
          </div>
        )}

        {/* Sponsor Banner */}
        {post.isSponsored && post.sponsorName && (
          <div className="mt-8 p-6 bg-gradient-to-r from-gold/5 to-gold/10 rounded-xl border border-gold/20">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-gold" />
              <div>
                <p className="text-sm text-slate-medium">This research was made possible by</p>
                <p className="font-semibold text-slate-dark">{post.sponsorName}</p>
              </div>
            </div>
          </div>
        )}

        {/* Citation Format */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cite this article</h4>
          <p className="text-xs text-slate-medium font-mono leading-relaxed">
            {post.author} (2026). {post.title}. <em>PostScientist</em>. Retrieved from https://postscientist.org/research/{post.id}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
