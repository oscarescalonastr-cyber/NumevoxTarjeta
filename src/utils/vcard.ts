import { CardData } from '../types';

export function downloadVCard(data: CardData) {
  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:Numevox;Finanzas y Talento;;;`,
    `FN:${data.title}`,
    `ORG:${data.title} ${data.subtitle}`,
    `TITLE:${data.subtitle}`,
    `TEL;TYPE=CELL,VOICE:${data.phone}`,
    `EMAIL;TYPE=INTERNET,PREF:${data.email}`,
    `URL:${data.website}`,
    `ADR;TYPE=WORK:;;${data.address};;;;`,
    `NOTE:${data.description}`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${data.title.replace(/\s+/g, '_')}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
