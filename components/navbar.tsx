"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-cream/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/recipes"
            className="hidden md:block text-sm font-medium hover:text-terracotta transition-colors uppercase tracking-widest"
          >
            Recettes
          </Link>
          <Link
            href="/categories"
            className="hidden md:block text-sm font-medium hover:text-terracotta transition-colors uppercase tracking-widest"
          >
            Catégories
          </Link>
        </div>

        <div className="flex-1 text-center">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-serif font-bold tracking-tight focus:outline-none"
          >
            Saveurs <span className="text-terracotta">&</span> Rentables
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <Link
            href="/about"
            className="hidden md:block text-sm font-medium hover:text-terracotta transition-colors uppercase tracking-widest"
          >
            À propos
          </Link>
          <Button className="bg-terracotta px-5 py-2 rounded-sm text-sm font-medium hover:bg-darkBrown transition-colors uppercase tracking-widest">
            Connexion
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
