import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { events, Event } from '../data/events';

interface EventsHubProps {
  variant?: 'sidebar' | 'full';
}

export default function EventsHub({ variant = 'sidebar' }: EventsHubProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'conference': return 'bg-navy/10 text-navy';
      case 'webinar': return 'bg-green-50 text-green-700';
      case 'workshop': return 'bg-purple-50 text-purple-700';
      case 'symposium': return 'bg-orange-50 text-orange-700';
    }
  };

  if (variant === 'sidebar') {
    return (
      <div className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-slate-dark flex items-center gap-2">
          <Calendar className="w-5 h-5 text-navy" />
          Upcoming Events
        </h3>
        <div className="space-y-3">
          {events.slice(0, 4).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-slate-light rounded-lg hover:bg-navy/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-navy/10 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-navy">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-lg font-bold text-navy leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-dark line-clamp-2 group-hover:text-navy transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-medium mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-slate-dark mb-2">Events Hub</h1>
        <p className="text-slate-medium">Discover upcoming scientific conferences, webinars, and workshops.</p>
      </div>

      <div className="grid gap-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Date block */}
              <div className="flex-shrink-0 w-16 h-16 bg-navy/10 rounded-xl flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-navy">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                </span>
                <span className="text-2xl font-bold text-navy leading-none">
                  {new Date(event.date).getDate()}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-slate-dark">{event.title}</h3>
                <p className="text-sm text-slate-medium mt-1">{event.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.attendees.toLocaleString()} attendees
                  </span>
                </div>
              </div>

              {/* Register button */}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-dark transition-colors whitespace-nowrap">
                Register
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
