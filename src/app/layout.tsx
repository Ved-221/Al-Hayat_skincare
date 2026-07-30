import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";
import AgentationWrapper from "@/components/AgentationWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import { getStoreSettings } from "@/services/settingsService";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getStoreSettings();
  const fullTitle = `${settings.store_name} | ${settings.store_tagline.split(".")[0] || "Premium Botanical Care"}`;

  return {
    title: fullTitle,
    description: settings.store_description,
    openGraph: {
      title: fullTitle,
      description: settings.store_description,
      type: "website",
      ...(settings.logo_url ? { images: [settings.logo_url] } : {}),
    },
    ...(settings.favicon_url ? { icons: { icon: settings.favicon_url } } : {}),
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorantGaramond.variable} ${playfairDisplay.variable} ${dancingScript.variable} antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}
