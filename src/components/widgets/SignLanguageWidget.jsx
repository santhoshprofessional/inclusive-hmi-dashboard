import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const SignLanguageWidget = () => {
  const { t } = useLanguage();

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex flex-col h-full bg-gradient-to-br from-slate-800 to-slate-900 col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-xl">🖐️</span>
          <h3 className="font-semibold text-slate-200">
            {t("signLanguageAssistant")}
          </h3>
        </div>
        <div className="flex gap-1 text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
        </div>
      </div>

      <div className="flex-1 bg-black rounded-xl border border-slate-700 overflow-hidden relative group min-h-[200px]">
        {/* Mock Video Feed */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 group-hover:bg-slate-800/60 transition-colors">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-500/50 group-hover:scale-110 transition-transform cursor-pointer">
              <span className="text-3xl translate-x-1">▶️</span>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              {t("realTimeInstructions")}
            </p>
          </div>
        </div>

        {/* Video Overlays */}
        <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-lg animate-pulse">
          LIVE
        </div>

        {/* Media Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
          <div className="flex gap-4 text-slate-300 items-center">
            <button className="hover:text-white transition-colors">⏸</button>
            <div className="h-1.5 bg-slate-700 rounded-full flex-1 overflow-hidden cursor-pointer">
              <div className="w-1/3 h-full bg-blue-500 rounded-full relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow"></div>
              </div>
            </div>
            <div className="text-xs font-mono">01:05 / 51:00</div>
            <button className="hover:text-white transition-colors">🔊</button>
            <button className="hover:text-white transition-colors">[ ]</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignLanguageWidget;
