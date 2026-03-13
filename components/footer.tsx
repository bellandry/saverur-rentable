"use client";

import {
  Facebook,
  Instagram,
  Music2, // For TikTok
  Pin,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
  pinterest?: string;
  tiktok?: string;
  [key: string]: string | undefined;
}

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await fetch("/api/social-links");
        const data = await res.json();
        if (!data.error) {
          setSocialLinks(data);
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };
    fetchSocialLinks();
  }, []);

  const socials = [
    { label: "Facebook", field: "facebook", icon: Facebook },
    { label: "Instagram", field: "instagram", icon: Instagram },
    { label: "Youtube", field: "youtube", icon: Youtube },
    { label: "Twitter", field: "twitter", icon: Twitter },
    { label: "Pinterest", field: "pinterest", icon: Pin },
    { label: "TikTok", field: "tiktok", icon: Music2 },
  ];

  const visibleSocials = socials.filter((s) => {
    const link = socialLinks?.[s.field];
    return typeof link === "string" && link.length > 0;
  });

  return (
    <footer className="bg-cream pt-24 pb-12 border-t border-beige">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 flex flex-col gap-2">
            <Link
              href="/"
              className="text-2xl font-serif font-bold text-darkBrown mb-6"
            >
              Saveurs <span className="text-terracotta">&</span> Rentables
            </Link>
            <div className="flex flex-wrap gap-4">
              {visibleSocials.map((social) => (
                <a
                  key={social.label}
                  href={socialLinks?.[social.field] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-beige flex items-center justify-center text-[10px] font-bold text-darkBrown/60 hover:bg-terracotta hover:text-white hover:border-terracotta transition-all"
                  title={social.label}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-darkBrown mb-6">
              Explorer
            </h4>
            <ul className="space-y-4 text-sm text-darkBrown/60 font-light">
              <li>
                <Link
                  href="/recipes"
                  className="hover:text-terracotta transition-colors"
                >
                  Toutes nos Recettes
                </Link>
              </li>
              <li>
                <Link
                  href="/#popular"
                  className="hover:text-terracotta transition-colors"
                >
                  Les plus populaires
                </Link>
              </li>
              <li>
                <Link
                  href="/#collection"
                  className="hover:text-terracotta transition-colors"
                >
                  Collection Premium
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-darkBrown mb-6">
              Communauté
            </h4>
            <ul className="space-y-4 text-sm text-darkBrown/60 font-light">
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  À propos d&apos;Elena
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Journal & Histoires
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Témoignages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Nous contacter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-darkBrown mb-6">
              Légal
            </h4>
            <ul className="space-y-4 text-sm text-darkBrown/60 font-light">
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Conditions d&apos;utilisation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  FAQ Adhésion
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-beige pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-darkBrown/40">
          <p>© 2024 Saveurs & Rentables. Tous droits réservés.</p>
          <p className="mt-4 md:mt-0 italic">
            Conçu pour ceux qui savourent chaque instant.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
