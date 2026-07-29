import { CardData, SocialLink } from '../types';

export const initialCardData: CardData = {
  title: "Numevox",
  subtitle: "Finanzas y Talento",
  tagline: "",
  description: "Servicios que evolucionan con tu empresa",
  logoUrl: "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/Numevox/iconoperfil.jpg",
  headerLogoUrl: "https://sagaonmedia.s3.us-east-2.amazonaws.com/website/machines_projects/Numevox/iconoperfil.jpg",
  directMessageLabel: "Mensaje directo",
  hoursStatus: "Abierto",
  hoursDetail: "Lun - Vie 09:00 - 18:00",
  phone: "3315205180",
  email: "negocios@numevox.com",
  address: "Circuito Paseo San Junipero #142, CP 76146. Colonia Paseo San Junipero, Querétaro.",
  website: "https://www.numevox.com",
  websiteDisplay: "www.numevox.com",
  qrCodeUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATeaGn-VIJ9-nW1NqBBm1tcleZEnDaSfyaRnmWy9nZZ6C6Ala6PeXkammQxakQgOHwJR6pcniM3MWxfHoE3yAzqaS_jh79s61swbG6GakPtZcTg5m0PRNApxI7nHqNnenPyUPpnko3jDiHkHM9QKgh_Z5CZ4yU-Sw89F21EtalEvYY1jCixJvZd_hZPifjE96Bs9CktVwD1dgvjDuln3ihBP-MR-yk3BxNBdAyOekcbS4eavjENKwE",
  contactName: "Alex Rivera",
  contactTitle: "Numevox",
  contactCardHandle: "tarjeta.numevox/alex.rivera",
  products: [
    {
      id: "prod-1",
      name: "Difusor Ultra Aura Noir",
      category: "Difusores",
      description: "Difusor ultrasónico con luz ambiental cálida y temporizador inteligente.",
      price: 1290,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80",
      tag: "Más vendido"
    },
    {
      id: "prod-2",
      name: "Esencia Lavanda & Bergamota",
      category: "Aceites Esenciales",
      description: "Frasco de 30ml de aceite concentrado 100% puro para relajación y calma.",
      price: 340,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
      tag: "Orgánico"
    },
    {
      id: "prod-3",
      name: "Kit Aura Balance (Difusor + 3 Esencias)",
      category: "Kits de Regalo",
      description: "Incluye difusor inteligente y tres aromas exclusivos: Eucalipto, Vainilla y Bambú.",
      price: 1850,
      image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80",
      tag: "Especial"
    },
    {
      id: "prod-4",
      name: "Difusor para Auto Aura Portable",
      category: "Difusores",
      description: "Compacto, recargable por USB, ideal para vehicular y espacios reducidos.",
      price: 690,
      image: "https://images.unsplash.com/photo-1512290900676-26c2a4d0b5ae?auto=format&fit=crop&w=600&q=80",
    }
  ]
};

export const socialLinks: SocialLink[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Directo",
    iconName: "chat",
    url: "https://api.whatsapp.com/send?phone=523315205180&text=" + encodeURIComponent("¡Hola, equipo de Numevox! 👋 Visité su página web y busco asesoría"),
    type: "whatsapp",
  },
  {
    id: "instagram",
    name: "Instagram",
    iconName: "photo_camera",
    url: "https://www.instagram.com/1.numevox?igsh=dnl4MHl2djI4Y3Zv&utm_source=qr",
    type: "social",
  },
  {
    id: "facebook",
    name: "Facebook",
    iconName: "public",
    url: "https://www.facebook.com/share/1MB6aBrM7i/?mibextid=wwXIfr",
    type: "social",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    iconName: "work",
    url: "https://www.linkedin.com/company/numevox/",
    type: "social",
  },
  {
    id: "email",
    name: "Correo Electrónico",
    iconName: "mail",
    url: "mailto:negocios@numevox.com?subject=Consulta%20Numevox",
    type: "email",
  },
  {
    id: "website",
    name: "Página Web",
    iconName: "language",
    url: "https://www.numevox.com",
    type: "web",
  },
  {
    id: "phone",
    name: "Teléfono",
    iconName: "call",
    url: "tel:3315205180",
    type: "phone",
  }
];
