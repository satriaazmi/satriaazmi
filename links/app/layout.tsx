import type { Metadata } from 'next';
import { IBM_Plex_Mono, Newsreader, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// Headings: an editorial serif with optical sizing, closer to a journal or
// an observatory almanac than to a product landing page.
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  axes: ['opsz'],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: "Satria Musthofa 'Azmi - Statistics, ML & Dashboards",
  description:
    "Satria Musthofa 'Azmi, Statistics undergraduate at Universitas Diponegoro: forecasting, simulation, and optimization projects, teaching, experience, and contact links.",
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${newsreader.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
