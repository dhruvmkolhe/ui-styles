/**
 * Single source of truth for the homepage FAQ.
 *
 * Rendered visibly by `src/components/landing/faq.tsx` AND emitted as
 * `FAQPage` JSON-LD in `src/app/page.tsx`. Google requires schema content to
 * match visible page text — keep both in sync by editing ONLY this file.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is Chameleon UI really free?",
    answer:
      "Yes — 100% free and open source. All 25 design aesthetics and every component snippet are fully unlocked with unwatermarked, production-ready code. No accounts, no paywalls, no attribution required.",
  },
  {
    question: "How do I use the components in my project?",
    answer:
      "Open any style gallery, flip between light and dark preview modes, and copy the clean HTML + Tailwind CSS snippet. Paste it anywhere — no frameworks, build steps, or dependencies are required.",
  },
  {
    question: "Do I need an account to copy code?",
    answer:
      "No. There are no accounts on Chameleon UI at all. Browsing, previewing, searching, and copying code all work instantly with nothing to sign up for.",
  },
  {
    question: "Can I use Chameleon UI components in commercial projects?",
    answer:
      "Yes. Every snippet is free for commercial use. Copy the code into client work, products, or templates without attribution or licensing fees.",
  },
  {
    question: "Do the components support dark mode?",
    answer:
      "Yes. Every style gallery renders live in both light and dark modes with a one-click toggle, and you can copy the exact variant you need for either theme.",
  },
  {
    question: "Which design styles are included?",
    answer:
      "25 authentic aesthetics, including Japandi, Glassmorphism, Brutalist, Minimalist, Neomorphism, Retro Y2K, Dark Tech, Bento Grid, Swiss, Editorial, Art Deco, Bauhaus, and more — each a complete gallery of 15 components.",
  },
];
