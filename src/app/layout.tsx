import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/components/TopNavBar";
import WhatsAppButton from "@/components/WhatsAppButton";

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

export const metadata: Metadata = {
  title: "AL-HAYAT | Premium Herbal Skincare & Haircare by Dr. Farheen",
  description:
    "AL-HAYAT by Dr. Farheen — premium herbal skincare, haircare, and lip care. Handcrafted botanical formulations. 100% natural ingredients. Order on WhatsApp.",
  openGraph: {
    title: "AL-HAYAT | Premium Herbal Skincare & Haircare by Dr. Farheen",
    description:
      "Discover premium herbal skincare and haircare crafted from nature's finest botanicals. AL-HAYAT by Dr. Farheen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorantGaramond.variable} ${playfairDisplay.variable} ${dancingScript.variable} antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          background: "#fff8f1",
          color: "#1e1b16",
          overflowX: "hidden",
        }}
       >
        {/*
          Hide website navbar & WhatsApp button on admin routes
        */}
        {children}
      </body>
    </html>
  );
}
