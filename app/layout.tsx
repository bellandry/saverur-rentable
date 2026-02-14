import type { Metadata } from "next";
import "./globals.css";

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
  title: "Saveur Rentable | Cuisine Authentique & Astuces de Chef",
  description:
    "Découvrez des recettes saisonnières, des techniques culinaires authentiques et des astuces de chef pour une cuisine savoureuse et rentable.",
  openGraph: {
    title: "Saveur Rentable | Cuisine Authentique & Astuces de Chef",
    description:
      "Découvrez des recettes saisonnières, des techniques culinaires authentiques et des astuces de chef pour une cuisine savoureuse et rentable.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
