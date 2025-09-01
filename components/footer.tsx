import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl text-slate-800 mb-2">Alex Johnson</h3>
            <p className="text-slate-600 text-sm">
              Full-stack developer & technical writer
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
              >
                LinkedIn
              </Link>
              <Link
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
              >
                GitHub
              </Link>
            </div>

            <div className="text-slate-500 text-xs">
              © 2025 Alex Johnson. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
