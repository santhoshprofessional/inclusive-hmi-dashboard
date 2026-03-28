import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const AccessibilityWidget = ({ theme, toggleTheme }) => {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex flex-col h-full bg-gradient-to-br from-slate-800/80 to-slate-900">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 text-xl">♿</span>
          <h3 className="font-semibold text-slate-200">{t("accessibility")}</h3>
        </div>
        <div className="flex gap-1 text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
        </div>
      </div>

      <div className="flex flex-col gap-5 flex-1 justify-center">
        {/* Dark/Light Mode Switch */}
        <div className="flex justify-between items-center bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-3">
            <span className="text-yellow-400">☀️</span>
            <span className="text-sm font-medium text-slate-300">Theme</span>
            <span className="text-blue-300">🌙</span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors shadow-inner ${theme === "dark" ? "bg-blue-600" : "bg-slate-400"}`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${theme === "dark" ? "right-1" : "left-1"}`}
            ></div>
          </button>
        </div>

        {/* Translation Switch */}
        <div className="flex justify-between items-center bg-slate-800/60 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-xl">🌐</span>
            <span className="text-sm font-medium text-slate-300">Language</span>
          </div>

          <button
            onClick={toggleLanguage}
            className={`px-6 py-2 rounded-lg font-bold transition-all shadow-md ${
              language === "ta"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600"
            }`}
          >
            தமிழ் / Eng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityWidget;
