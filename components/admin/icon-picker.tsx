"use client";

import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

const AVAILABLE_ICONS = [
  { name: "ChefHat", label: "Toque" },
  { name: "Utensils", label: "Ustensiles" },
  { name: "UtensilsCrossed", label: "Cuisine" },
  { name: "Heart", label: "Passion" },
  { name: "Leaf", label: "Frais" },
  { name: "Star", label: "Qualité" },
  { name: "Users", label: "Communauté" },
  { name: "History", label: "Histoire" },
  { name: "Globe", label: "Authentique" },
  { name: "Award", label: "Récompense" },
  { name: "Coffee", label: "Café/Pause" },
  { name: "Grape", label: "Ingrédients" },
  { name: "Salad", label: "Santé" },
  { name: "Timer", label: "Rapide" },
  { name: "CheckCircle2", label: "Approuvé" },
  { name: "Book", label: "Recettes" },
  { name: "Apple", label: "Naturel" },
  { name: "ShoppingBasket", label: "Courses" },
];

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Choisir une icône
      </label>
      <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
        {AVAILABLE_ICONS.map((icon) => {
          const IconComponent = (Icons as unknown as Record<string, Icons.LucideIcon>)[icon.name];
          const isSelected = value === icon.name;

          return (
            <button
              key={icon.name}
              type="button"
              onClick={() => onChange(icon.name)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 group",
                isSelected
                  ? "bg-terracotta/10 border-terracotta text-terracotta"
                  : "bg-white border-gray-200 text-gray-400 hover:border-terracotta/50 hover:text-terracotta",
              )}
              title={icon.label}
            >
              <IconComponent className="w-5 h-5 mb-1" />
              <span className="text-[10px] hidden sm:block truncate w-full text-center">
                {icon.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
