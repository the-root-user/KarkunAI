export interface Provider {
  id: string;
  name: string;
  service: string;
  location: string; // e.g., 'G-13, Islamabad', 'Bahria Town'
  distance: number; // in km
  rating: number; // 0-5
  reviews: number;
  baseRate: number; // in PKR
  availability: 'now' | 'today' | 'tomorrow' | 'busy';
  phone: string;
  image: string;
}

export type UrgencyLevel = 'high' | 'medium' | 'low';

export interface Intent {
  messageType: 'new_request' | 'follow_up' | 'clarification';
  serviceType: string;
  location: string;
  urgency: UrgencyLevel;
  timeRaw: string;
  details: string;
  relatedProviderId?: string;
}

export interface AgentContext {
  messages: Array<{ role: 'user' | 'system' | 'agent'; content: string }>;
  currentIntent: Intent | null;
  candidates: Provider[];
  selectedProvider: Provider | null;
  rankingReasoning?: string;
  status: 'idle' | 'extracting' | 'searching' | 'ranking' | 'booking' | 'done';
  settings: {
    autoBooking: boolean;
  };
}
