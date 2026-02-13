import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative container mx-auto px-6 h-[90vh] flex items-center justify-center pt-24 pb-12">
      {/* Background container that acts as a frame */}
      <div className="absolute inset-x-6 top-14 bottom-6 z-0 rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1920"
          alt="Authentic Home Cooking"
          className="w-full h-full object-cover"
          fill
        />
        {/* Soft overlay for text legibility */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8 drop-shadow-xl">
            Cooking with Heart, <br /> Shared with Love
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-lg">
            Discover seasonal recipes and culinary techniques for the authentic
            home cook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-terracotta text-white px-10 py-4 rounded-sm text-sm font-bold hover:bg-darkBrown transition-all duration-300 uppercase tracking-widest shadow-lg">
              Discover Recipes
            </button>
            <button className="bg-darkBrown/40 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-sm text-sm font-bold hover:bg-white/10 transition-all duration-300 uppercase tracking-widest">
              Premium Recipes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
