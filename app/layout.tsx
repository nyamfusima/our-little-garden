import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./styles/world.css";
import "./styles/scenes.css";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.title} ♡`,
  description: site.subtitle,
};

export const viewport: Viewport = {
  themeColor: "#f7efe2",
  width: "device-width",
  initialScale: 1,
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&family=Karla:ital,wght@0,300..700;1,400..600&family=Caveat:wght@400..700&display=swap";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to the garden
        </a>
        {children}
      </body>
    </html>
  );
}
