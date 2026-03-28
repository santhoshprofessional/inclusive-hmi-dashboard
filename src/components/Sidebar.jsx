import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Sidebar = ({ stats, alerts }) => {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <aside className="w-full lg:w-72 flex flex-col gap-6">
      {/* Overview Stats box */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-700/50">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-blue-400">
              {stats.totalMachines}
            </p>
            <p className="text-xs text-slate-400 mt-1">{t("totalMachines")}</p>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-red-500">{stats.critical}</p>
            <p className="text-xs text-slate-400 mt-1">{t("critical")}</p>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-orange-400">
              {stats.warnings}
            </p>
            <p className="text-xs text-slate-400 mt-1">{t("warnings")}</p>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-green-400">{stats.healthy}</p>
            <p className="text-xs text-slate-400 mt-1">{t("healthy")}</p>
          </div>
        </div>
      </div>

      {/* Accessibility Panel */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-slate-300">
          <svg
            className="w-5 h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="font-semibold">{t("accessibility")}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-slate-400">
          <span>{t("textSize")}</span>
          <div className="flex gap-2">
            <button className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-1 rounded-md transition-colors text-white">
              A-
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-1 rounded-md transition-colors text-white">
              A+
            </button>
          </div>
        </div>

        <button className="w-full bg-slate-800 hover:bg-blue-600/20 text-blue-400 border border-slate-700 py-2 rounded-lg flex items-center justify-center gap-2 transition-all">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
          {t("voiceAlert")}
        </button>
      </div>

      {/* Active Alerts */}
      <div className="glass-panel p-5 rounded-2xl flex-1 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500">🔔</span>
          <h3 className="font-semibold text-slate-200">{t("alerts")}</h3>
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto font-bold shadow-sm shadow-red-500/50">
            {stats.activeAlertsNumber}
          </span>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto max-h-[300px] pr-1 custom-scrollbar">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-slate-800/70 border border-orange-500/30 p-3 rounded-xl flex flex-col gap-2 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚙️</span>
                  <span className="font-semibold text-sm text-slate-200">
                    {t(alert.machine)}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/50 font-medium">
                  {t(alert.status)}
                </span>
              </div>
              <p className="text-sm text-slate-300 font-medium ml-7">
                {t(alert.message)}
              </p>
              <div className="flex gap-2 mt-2 ml-7">
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs py-1.5 rounded-md transition-colors border border-slate-600">
                  {t("acknowledge")}
                </button>
                <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs py-1.5 rounded-md transition-colors">
                  {t("reportIssue")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
