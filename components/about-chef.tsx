import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface AboutProps {
  title: string;
  text: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const About = ({ title, text, image, buttonText, buttonLink }: AboutProps) => {
  return (
    <section className="py-32 bg-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-5xl mx-auto">
          <div className="relative group">
            {/* Circular image as seen in the image */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white scale-100 shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <Image
                src={image}
                alt={title}
                fill
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Verified/Chef Badge */}
            <div className="absolute bottom-4 right-4 bg-terracotta text-white p-3 rounded-full shadow-xl border-4 border-cream">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left space-y-6">
            <span className="text-terracotta uppercase tracking-[0.3em] font-bold text-xs block">
              Meet the Chef
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown leading-tight">
              {title}
            </h2>
            <p className="text-xl md:text-2xl font-light italic text-darkBrown/70 leading-relaxed">
              {text}
            </p>
            <div className="pt-6">
              <Button
                asChild
                className="bg-darkBrown text-white px-10 py-4 rounded-sm text-sm font-bold hover:bg-terracotta transition-all shadow-lg uppercase tracking-widest"
              >
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
