"use client";

const Newsletter = () => {
  return (
    <section className="py-32 bg-sage/10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-beige/50">
          <div className="md:w-1/2 p-12 space-y-6 bg-beige/10">
            <h2 className="text-4xl font-serif text-darkBrown">
              Rejoignez la table{" "}
              <span className="italic">Saveurs & Rentables</span>
            </h2>
            <p className="text-darkBrown/60 font-light leading-relaxed">
              Accédez à nos archives premium, recevez des menus hebdomadaires
              personnalisés et participez à nos masterclasses mensuelles.
            </p>
            <ul className="space-y-3">
              {[
                "200+ Recettes Premium",
                "Expérience sans publicité",
                "Plans de repas téléchargeables",
                "Histoires exclusives",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-darkBrown/80 font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-3 text-terracotta"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/2 p-12 bg-cream flex flex-col justify-center">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-darkBrown/50 font-bold mb-2">
                  Adresse Email
                </label>
                <input
                  type="email"
                  placeholder="vous@exemple.com"
                  className="w-full bg-white border border-beige py-4 px-6 focus:outline-none focus:border-terracotta transition-colors rounded-sm"
                />
              </div>
              <button className="w-full bg-terracotta text-white py-4 rounded-sm text-sm font-bold shadow-lg shadow-terracotta/20 hover:bg-darkBrown transition-all uppercase tracking-widest">
                Devenir Membre
              </button>
              <p className="text-[10px] text-center text-darkBrown/40 uppercase tracking-tighter">
                À partir de 4,99€/mois. Annulable à tout moment.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
