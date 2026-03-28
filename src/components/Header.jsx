import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { MdLanguage } from "react-icons/md";

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="flex items-center justify-between p-6 bg-slate-900 shadow-md border-b border-slate-700">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          {t("dashboard")}
        </h1>
      </div>

      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 glass-button px-4 py-2 rounded-full text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle Language"
        title="Switch between English and Tamil"
      >
        <MdLanguage size={24} />
        <span>{language === "en" ? "தமிழ்" : "English"}</span>
      </button>
    </header>
  );
};

export default Header;
