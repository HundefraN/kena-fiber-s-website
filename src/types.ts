export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'custom-molds' | 'marine' | 'architectural' | 'industrial' | 'all';
  image: string;
  description: string;
}

export interface CartItem {
  id: string;
  project: GalleryProject;
  quantity: number;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  feedback: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
