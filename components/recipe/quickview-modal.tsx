import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../../types";
import { Button } from "../ui/button";

interface QuickViewModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const QuickViewModal = ({ recipe, onClose }: QuickViewModalProps) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md text-stone-900 hover:bg-white transition-colors shadow-sm"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>

        {/* Image Section */}
        <div className="md:w-1/2 aspect-video md:aspect-square">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-700 text-xs font-semibold tracking-wider uppercase">
              {recipe.category.name}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-500 text-xs">{recipe.prepTime}</span>
          </div>

          <h2 className="text-2xl font-serif md:text-4xl font-bold text-stone-900 mb-4 leading-tight">
            {recipe.title}
          </h2>

          <p className="text-stone-600 font-light mb-8 leading-relaxed line-clamp-4">
            {recipe.description}
          </p>

          <div className="flex flex-wrap items-center gap-12 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  Time
                </span>
                <span className="text-sm font-medium text-stone-900">
                  {recipe.prepTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                  Difficulty
                </span>
                <span className="text-sm font-medium text-stone-900">
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button asChild className="flex-1 rounded-full">
              <Link href={`/recipes/${recipe.slug}`}>View Full Recipe</Link>
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-full"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
