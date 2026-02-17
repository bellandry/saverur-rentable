import { Category, Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoriesProps {
  categories: (Category & { recipes: Recipe[] })[];
}

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-start space-x-4 overflow-x-auto pb-4">
          <button className="flex items-center space-x-3 px-6 py-3 rounded-full text-xs font-bold transition-all uppercase tracking-widest bg-sage text-white shadow-md">
            <span className="text-lg">🍴</span>
            <span>All Recipes</span>
          </button>
          {categories?.map((cat) => (
            <Link
              href={`/recipes?category=${cat.slug}`}
              key={cat.id}
              className="flex items-center space-x-3 px-3 pr-4 py-3 rounded-full text-xs font-bold transition-all uppercase tracking-widest whitespace-nowrap bg-beige/30 text-darkBrown/60 hover:bg-beige/50 hover:text-darkBrown"
            >
              <div className="text-lg aspect-square relative w-12 h-12 rounded-full">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span>{cat.name}</span>
                {/* display number of recipes in category */}
                <span className="lowercase text-darkBrown/40">
                  {cat.recipes?.length} Recettes
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
