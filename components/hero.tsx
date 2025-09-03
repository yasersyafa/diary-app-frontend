"use client";

import { useEffect, useState } from "react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-32 px-6 border-b border-border overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <svg
            className="w-full h-full"
            viewBox="0 0 150 70"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="rgb(59 130 246)"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-sky-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-gradient-to-tl from-indigo-200/15 to-blue-100/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center">
          <div className="mb-8">
            <h1
              className={`text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent tracking-tight transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Narrativa.
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 mx-auto mt-6 rounded-full shadow-lg shadow-blue-500/30" />
          </div>

          <p
            className={`text-2xl sm:text-3xl text-slate-600 max-w-4xl mx-auto text-pretty mb-8 leading-relaxed font-light transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Where stories come alive and ideas find their voice
          </p>

          <p
            className={`text-lg text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed text-pretty transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Discover thoughtful articles, insights, and narratives that inspire,
            and educate.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <button className="group relative bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5">
              Start Reading
            </button>
          </div>

          <div className="absolute top-1/4 left-12 text-blue-200/60 text-8xl font-serif select-none">
            "
          </div>
          <div className="absolute bottom-1/4 right-12 text-sky-200/60 text-8xl font-serif select-none">
            "
          </div>
        </div>
      </div>
    </section>
  );
}
