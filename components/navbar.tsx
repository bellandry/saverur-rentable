"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserMobile } from "./user-mobile";
import { UserProfile } from "./user-profile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-cream/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="md:hidden relative z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-darkBrown hover:text-terracotta transition-colors focus:outline-none"
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

        <div className="flex-1 text-center relative z-50">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-serif font-bold tracking-tight focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Saveurs <span className="text-terracotta">&</span> Rentables
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/about"
            className="text-sm font-medium hover:text-terracotta transition-colors uppercase tracking-widest"
          >
            À propos
          </Link>
          <UserProfile />
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-cream/95 backdrop-blur-sm z-40 md:hidden flex flex-col items-center justify-center space-y-8 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-5"
          }`}
        >
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
      </div>
    </nav>
  );
};

export default Navbar;
