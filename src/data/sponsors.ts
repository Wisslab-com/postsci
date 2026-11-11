export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
  description: string;
}

export const sponsors: Sponsor[] = [
  {
    id: 's1',
    name: 'SovereignWire',
    logo: '🏛️',
    industry: 'AI Infrastructure',
    website: '#',
    description: 'Building sovereign AI infrastructure for nations worldwide.'
  },
  {
    id: 's2',
    name: 'GeneTech Foundation',
    logo: '🧬',
    industry: 'Biotechnology',
    website: '#',
    description: 'Advancing gene editing technologies for therapeutic applications.'
  },
  {
    id: 's3',
    name: 'NeuroLink Corp',
    logo: '🧠',
    industry: 'Neurotechnology',
    website: '#',
    description: 'Pioneering next-generation brain-computer interfaces.'
  },
  {
    id: 's4',
    name: 'FusionWorks',
    logo: '⚡',
    industry: 'Clean Energy',
    website: '#',
    description: 'Making fusion energy a reality through advanced engineering.'
  }
];
