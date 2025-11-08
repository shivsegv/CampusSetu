import React from "react";
import Button from "../../../components/Button";

export default function HeroSection({ heroHighlights, onPrimaryCTA, user }) {
  const ctaLabel = user ? "Go to dashboard" : "Launch your workspace";

  return (
    <section
      id="about"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-glow opacity-80" />
      <div className="max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-500 shadow-soft">
          Campus hiring ops
        </div>
        <h1 className="mt-6 text-4xl font-semibold text-slate-900 md:text-5xl">
          Streamline placements across students, recruiters, and colleges
        </h1>
        <p className="mt-4 text-base text-slate-600 md:text-lg">
          Campus SETU centralises opportunity discovery, approvals, communication, and analytics so every stakeholder moves in sync.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={onPrimaryCTA}>{ctaLabel}</Button>
          <Button variant="secondary" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
            Explore platform
          </Button>
        </div>
      </div>
      <div className="mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
        {heroHighlights.map((item) => (
          <span
            key={item.title}
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-4 py-2 text-xs font-semibold text-slate-600 shadow-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            {item.title}
          </span>
        ))}
      </div>
    </section>
  );
}
