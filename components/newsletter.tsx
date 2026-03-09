"use client";

import { sendContactEmail, type ContactState } from "@/app/actions/send-email";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: ContactState = {
  success: false,
  error: null,
  message: null,
};

const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState,
  );

  useEffect(() => {
    if (state?.success && state.message) {
      toast.success(state.message);
      // Optional: you could reset the form here if you had a ref
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <section id="contact" className="py-32 bg-sage/10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-beige/50">
          <div className="md:w-1/2 p-12 space-y-6 bg-beige/10">
            <h2 className="text-4xl font-serif text-darkBrown">
              Contactez-nous
            </h2>
            <p className="text-darkBrown/60 font-light leading-relaxed">
              Vous avez une question, une suggestion ou souhaitez simplement
              nous dire bonjour ? N&apos;hésitez pas à nous envoyer un message
              via ce formulaire. Nous vous répondrons dans les plus brefs
              délais.
            </p>
            <ul className="space-y-3 mt-8">
              {[
                "Support réactif",
                "Assistance personnalisée",
                "Partenariats & Collaborations",
                "Questions sur les recettes",
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
            <form action={formAction} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[10px] uppercase tracking-widest text-darkBrown/50 font-bold mb-2"
                >
                  Nom Complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Votre nom"
                  className="w-full bg-white border border-beige py-3 px-4 focus:outline-none focus:border-terracotta transition-colors rounded-sm text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] uppercase tracking-widest text-darkBrown/50 font-bold mb-2"
                >
                  Adresse Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="vous@exemple.com"
                  className="w-full bg-white border border-beige py-3 px-4 focus:outline-none focus:border-terracotta transition-colors rounded-sm text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-[10px] uppercase tracking-widest text-darkBrown/50 font-bold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full bg-white border border-beige py-3 px-4 focus:outline-none focus:border-terracotta transition-colors rounded-sm text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-terracotta text-white py-4 mt-2 rounded-sm text-sm font-bold shadow-lg shadow-terracotta/20 hover:bg-darkBrown disabled:opacity-70 disabled:cursor-not-allowed transition-all uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer le message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
