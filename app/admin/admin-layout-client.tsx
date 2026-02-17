"use client";

import { authClient } from "@/lib/auth-client";
import {
  BookOpen,
  DollarSign,
  FolderOpen,
  Home,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Tableau de bord", href: "/admin", icon: Home },
    { name: "Recettes", href: "/admin/recipes", icon: BookOpen },
    { name: "Catégories", href: "/admin/categories", icon: FolderOpen },
    { name: "Ventes", href: "/admin/payments", icon: DollarSign },
    { name: "Page d'accueil", href: "/admin/homepage", icon: Settings },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-darkBrown text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <h1 className="text-xl font-serif font-bold">Saveur Rentable</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 bg-darkBrown text-white transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:w-64
          w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo - Hidden on mobile (shown in top bar) */}
          <div className="hidden lg:block p-6 border-b border-white/10">
            <h1 className="text-2xl font-serif font-bold">Saveur Rentable</h1>
            <p className="text-sm text-white/60 mt-1">Administration</p>
          </div>

          {/* Mobile header spacing */}
          <div className="lg:hidden h-16" />

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-terracotta text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition w-full"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
