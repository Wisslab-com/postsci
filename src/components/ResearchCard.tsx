import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Calendar, Award } from 'lucide-react';
import { ResearchPost } from '../data/researchPosts';

interface ResearchCardProps {
  post: ResearchPost;
  onClick: (post: ResearchPost) => void;
}

export default function ResearchCard({ post, onClick }: ResearchCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-smooth hover:shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(post)}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          src={post.videoUrl}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Play overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-navy fill-navy ml-0.5" />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-navy/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        {/* Sponsored badge */}
        {post.isSponsored && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-gold/90 text-white text-xs font-medium rounded-full backdrop-blur-sm flex items-center gap-1">
              <Award className="w-3 h-3" />
              Sponsored
            </span>
          </div>
        )}

        {/* Event date badge */}
        {post.eventDate && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 bg-white/90 text-slate-dark text-xs font-medium rounded-full backdrop-blur-sm flex items-center gap-1">
              <Calendar className="w-3 h-3 text-navy" />
              {formatDate(post.eventDate)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-slate-dark leading-snug line-clamp-2 mb-2">
          {post.title}
        </h3>
        
        <p className="text-sm text-slate-medium line-clamp-2 mb-3">
          {post.abstract}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center">
              <span className="text-navy font-semibold text-[10px]">
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="font-medium text-slate-dark">{post.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {formatViews(post.views)}
            </span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>

        {/* Sponsor info */}
        {post.isSponsored && post.sponsorName && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gold font-medium flex items-center gap-1">
              <Award className="w-3 h-3" />
              Supported by {post.sponsorName}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
