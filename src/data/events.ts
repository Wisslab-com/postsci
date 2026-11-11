export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'conference' | 'webinar' | 'workshop' | 'symposium';
  description: string;
  registrationUrl: string;
  linkedPostId?: string;
  attendees: number;
}

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Global Summit on Sovereign AI',
    date: '2026-03-15',
    location: 'Singapore',
    type: 'conference',
    description: 'The premier conference on national AI strategies, data sovereignty, and the future of international AI governance.',
    registrationUrl: '#',
    linkedPostId: 'p1',
    attendees: 2400
  },
  {
    id: 'e2',
    title: 'International Gene Editing Symposium',
    date: '2026-04-20',
    location: 'Boston, MA',
    type: 'symposium',
    description: 'Leading researchers present the latest advances in CRISPR technology and therapeutic applications.',
    registrationUrl: '#',
    linkedPostId: 'p3',
    attendees: 1800
  },
  {
    id: 'e3',
    title: 'Quantum Computing Workshop 2026',
    date: '2026-05-10',
    location: 'Virtual',
    type: 'workshop',
    description: 'Hands-on workshop covering quantum error correction, algorithm design, and practical applications.',
    registrationUrl: '#',
    linkedPostId: 'p2',
    attendees: 3500
  },
  {
    id: 'e4',
    title: 'Fusion Energy Frontiers',
    date: '2026-06-05',
    location: 'Oxford, UK',
    type: 'conference',
    description: 'Exploring the path from laboratory breakthroughs to commercial fusion power plants.',
    registrationUrl: '#',
    linkedPostId: 'p4',
    attendees: 1200
  },
  {
    id: 'e5',
    title: 'Neural Interfaces & Ethics Webinar',
    date: '2026-04-02',
    location: 'Virtual',
    type: 'webinar',
    description: 'A discussion on the ethical implications of high-bandwidth brain-computer interfaces.',
    registrationUrl: '#',
    linkedPostId: 'p5',
    attendees: 5000
  },
  {
    id: 'e6',
    title: 'Climate Action Data Summit',
    date: '2026-07-18',
    location: 'Geneva, Switzerland',
    type: 'conference',
    description: 'Using data science and AI to accelerate climate action and policy implementation.',
    registrationUrl: '#',
    linkedPostId: 'p6',
    attendees: 900
  }
];
