import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Inter, Playfair_Display } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://www.saveurrentable.com",
  ),
  title: {
    default: "Saveur Rentable | Cuisine Authentique & Astuces de Chef",
    template: "%s | Saveur Rentable",
  },
  description:
    "Découvrez des recettes saisonnières, des techniques culinaires authentiques et des astuces de chef pour une cuisine savoureuse et rentable.",
  keywords: [
    "recettes",
    "cuisine",
    "astuces de chef",
    "cuisine rentable",
    "saveur",
    "recettes de saison",
  ],
  authors: [{ name: "Saveur Rentable" }],
  creator: "Saveur Rentable",
  publisher: "Saveur Rentable",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Saveur Rentable | Cuisine Authentique & Astuces de Chef",
    description:
      "Découvrez des recettes saisonnières, des techniques culinaires authentiques et des astuces de chef pour une cuisine savoureuse et rentable.",
    url: "/",
    siteName: "Saveur Rentable",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Saveur Rentable - Cuisine Authentique",
      },
    ],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saveur Rentable",
    description: "Cuisine Authentique & Astuces de Chef",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Toaster />
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
