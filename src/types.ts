export interface SocialLink {
  id: string;
  name: string;
  iconName: string; // Material Symbol or Lucide name
  url: string;
  type: 'whatsapp' | 'email' | 'chat' | 'social' | 'web' | 'phone' | 'catalog';
  badge?: string;
  color?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
}

export interface CardData {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  logoUrl: string;
  headerLogoUrl: string;
  directMessageLabel: string;
  hoursStatus: string;
  hoursDetail: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  websiteDisplay: string;
  qrCodeUrl: string;
  contactName: string;
  contactTitle: string;
  contactCardHandle: string;
  products: ProductItem[];
}
