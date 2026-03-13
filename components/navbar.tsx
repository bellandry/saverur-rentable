"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserMobile } from "./user-mobile";
import { UserProfile } from "./user-profile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        } ${isMobileMenuOpen ? "bg-cream shadow-none" : ""}`}
      >
        <div className="container mx-auto px-6 grid grid-cols-[1fr_auto_1fr] md:flex items-center justify-between">
          {/* Mobile Menu Button - Left Column */}
          <div className="flex items-center justify-start min-w-0">
            <div className="md:hidden relative z-110">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-darkBrown hover:text-terracotta transition-colors focus:outline-none p-1 -ml-1"
                aria-label={
                  isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
                }
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-sm font-medium hover:text-terracotta transition-colors uppercase tracking-widest"
              >
                Accueil
              </Link>
              <Link
                href="/recipes"
                className="text-sm font-medium hover:text-terracotta transition-colors uppercase tracking-widest"
              >
                Recettes
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium hover:text-terracotta transition-colors uppercase tracking-widest"
              >
                Catégories
              </Link>
            </div>
          </div>

          {/* Logo - Centered Column */}
          <div className="flex justify-center items-center text-center relative z-110">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-serif font-bold tracking-tight focus:outline-none hover:opacity-80 transition-opacity whitespace-nowrap"
              onClick={() => setIsMobileMenuOpen(false)}
              title="Retour à l'accueil"
            >
              Saveurs <span className="text-terracotta">&</span> Rentables
            </Link>
          </div>

          {/* Right Links / Mobile Spacer - Right Column */}
          <div className="flex items-center justify-end">
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/about"
                className="text-sm font-medium hover:text-terracotta transition-colors uppercase tracking-widest"
              >
                À propos
              </Link>
              <UserProfile />
            </div>
            {/* Mobile Spacer to balance the grid */}
            <div className="md:hidden w-8" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Outside nav but inside portal/fragment */}
      <div
        className={`fixed inset-0 bg-cream z-90 md:hidden flex flex-col items-center justify-center space-y-8 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-2xl font-serif text-darkBrown hover:text-terracotta transition-colors"
        >
          Accueil
        </Link>
        <Link
          href="/recipes"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-2xl font-serif text-darkBrown hover:text-terracotta transition-colors"
        >
          Recettes
        </Link>
        <Link
          href="/categories"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-2xl font-serif text-darkBrown hover:text-terracotta transition-colors"
        >
          Catégories
        </Link>
        <Link
          href="/about"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-2xl font-serif text-darkBrown hover:text-terracotta transition-colors"
        >
          À propos
        </Link>

        <UserMobile setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>
    </>
  );
};

export default Navbar;
