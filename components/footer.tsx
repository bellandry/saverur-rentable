"use client";

const Footer = () => {
  return (
    <footer className="bg-cream pt-24 pb-12 border-t border-beige">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-darkBrown mb-6">
              Saveurs <span className="text-terracotta">&</span> Rentables
            </h3>
            <p className="text-darkBrown/60 text-sm font-light leading-relaxed mb-8">
              Célébrer l&apos;art de la cuisine authentique et la beauté des
              moments partagés autour d&apos;une table généreuse et accessible.
            </p>
            <div className="flex space-x-4">
              {["FB", "IG", "PT", "YT"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-beige flex items-center justify-center text-[10px] font-bold text-darkBrown/60 hover:bg-terracotta hover:text-white hover:border-terracotta transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-darkBrown mb-6">
              Explorer
            </h4>
            <ul className="space-y-4 text-sm text-darkBrown/60 font-light">
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Archives Recettes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Menus de Saison
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Collection Premium
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Boutique Cuisine
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-darkBrown mb-6">
              Communauté
            </h4>
            <ul className="space-y-4 text-sm text-darkBrown/60 font-light">
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  À propos d&apos;Elena
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Journal & Histoires
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Témoignages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Nous contacter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-darkBrown mb-6">
              Légal
            </h4>
            <ul className="space-y-4 text-sm text-darkBrown/60 font-light">
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  Conditions d&apos;utilisation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-terracotta transition-colors">
                  FAQ Adhésion
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-beige pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-darkBrown/40">
          <p>© 2024 Saveurs & Rentables. Tous droits réservés.</p>
          <p className="mt-4 md:mt-0 italic">
            Conçu pour ceux qui savourent chaque instant.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
