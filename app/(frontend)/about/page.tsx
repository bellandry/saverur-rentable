import { Button } from "@/components/ui/button";
import { getAboutPageContent } from "@/lib/fetch-datas";
import * as Icons from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos de Nous",
  description:
    "Découvrez l'histoire de Saveur Rentable, nos valeurs et notre passion pour la cuisine authentique et accessible.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getAboutPageContent();

  const values =
    typeof content.values === "string"
      ? JSON.parse(content.values)
      : content.values || [];
  const stats =
    typeof content.stats === "string"
      ? JSON.parse(content.stats)
      : content.stats || [];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {content.heroImage && (
          <Image
            src={content.heroImage}
            alt={content.heroTitle}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-darkBrown/40" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            {content.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            {content.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="flex-1 space-y-8">
              <span className="text-terracotta uppercase tracking-widest font-bold text-sm">
                Une passion, une histoire
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-darkBrown">
                {content.storyTitle}
              </h2>
              <div className="w-20 h-1 bg-terracotta" />
              <div
                className="text-lg text-gray-700 leading-relaxed tiptap-content"
                dangerouslySetInnerHTML={{ __html: content.storyText }}
              />
            </div>
            {content.storyImage && (
              <div className="flex-1 relative aspect-4/5 w-full max-w-md lg:max-w-none">
                <div className="absolute inset-4 border-2 border-terracotta z-0 translate-x-4 translate-y-4" />
                <div className="relative z-10 w-full h-full overflow-hidden shadow-2xl">
                  <Image
                    src={content.storyImage}
                    alt={content.storyTitle}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-20 bg-darkBrown text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center max-w-5xl mx-auto">
              {stats.map(
                (stat: { label: string; value: string }, index: number) => (
                  <div key={index} className="space-y-2">
                    <p className="text-4xl md:text-5xl font-serif font-bold text-terracotta">
                      {stat.value}
                    </p>
                    <p className="text-sm uppercase tracking-widest text-white/70">
                      {stat.label}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {values.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-darkBrown mb-6">
                {content.valuesTitle}
              </h2>
              <div className="w-20 h-1 bg-terracotta mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {values.map(
                (
                  value: { icon: string; title: string; text: string },
                  index: number,
                ) => {
                  const IconComponent =
                    (Icons as any)[value.icon] || Icons.HelpCircle;
                  return (
                    <div
                      key={index}
                      className="p-8 bg-cream hover:bg-white hover:shadow-xl transition-all duration-300 group rounded-xl border border-transparent hover:border-cream"
                    >
                      <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mb-6 text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-darkBrown mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.text}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-cream overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-darkBrown leading-tight">
              {content.ctaTitle}
            </h2>
            <p className="text-xl text-darkBrown/70 max-w-2xl mx-auto">
              {content.ctaSubtitle}
            </p>
            <div className="pt-4">
              <Button
                asChild
                className="bg-terracotta text-white px-12 py-6 rounded-full text-lg font-bold hover:bg-darkBrown transition-all shadow-xl scale-100 hover:scale-105 active:scale-95"
              >
                <Link href={content.ctaButtonLink}>
                  {content.ctaButtonText}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Decoratif patterns */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-terracotta/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-darkBrown/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </section>
    </main>
  );
}
