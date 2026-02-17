import { Category } from "@prisma/client";

interface CategoriesProps {
  categories: Category[] | [];
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
            <button
              key={cat.id}
              className="flex items-center space-x-3 px-6 py-3 rounded-full text-xs font-bold transition-all uppercase tracking-widest whitespace-nowrap bg-beige/30 text-darkBrown/60 hover:bg-beige/50 hover:text-darkBrown"
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
