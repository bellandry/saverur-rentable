import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const Hero = ({
  title,
  subtitle,
  image,
  buttonText,
  buttonLink,
}: HeroProps) => {
  return (
    <section className="relative container mx-auto px-6 h-[90vh] flex items-center justify-center pt-24 pb-12">
      {/* Background container that acts as a frame */}
      <div className="absolute inset-x-6 top-24 bottom-6 z-0 rounded-3xl overflow-hidden shadow-2xl">
        <Image
          fill
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Soft overlay for text legibility */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl italic md:text-7xl font-serif font-semibold leading-[1.1] mb-8 drop-shadow-xl">
            {title}
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-lg">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={buttonLink}
              className="bg-terracotta text-white px-10 py-4 rounded-sm text-sm font-bold hover:bg-darkBrown transition-all duration-300 uppercase tracking-widest shadow-lg"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
