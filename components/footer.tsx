"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const socials = [
  {
    label: "Facebook",
    link: "https://",
    icon: Facebook,
  },
  {
    label: "Instagram",
    link: "https://",
    icon: Instagram,
  },
  {
    label: "Youtube",
    link: "https://",
    icon: Youtube,
  },
];

const Footer = () => {
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
            <div className="flex space-x-4 ">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  className="w-10 h-10 rounded-full border border-beige flex items-center justify-center text-[10px] font-bold text-darkBrown/60 hover:bg-terracotta hover:text-white hover:border-terracotta transition-all"
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
