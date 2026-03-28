import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const ControlPanelWidget = ({ status, setStatus }) => {
  const { t } = useLanguage();

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-slate-300">⚙️</span>
          <h3 className="font-semibold text-slate-200">
            {t("machineControlPanel")}
          </h3>
        </div>
        <div className="flex gap-1 text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-auto">
        <button
          onClick={() => setStatus("Running")}
          className="bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white border border-green-600/50 py-3 rounded-xl font-medium transition-all"
        >
          {t("start")}
        </button>
        <button
          onClick={() => setStatus("Stopped")}
          className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/50 py-3 rounded-xl font-medium transition-all"
        >
          {t("stop")}
        </button>
        <button
          onClick={() => setStatus("Emergency")}
          className="bg-orange-600/20 hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-600/50 py-3 rounded-xl font-medium transition-all col-span-2 mt-2"
        >
          {t("emergency")}
        </button>
      </div>

      <div className="flex items-center gap-2 bg-slate-800/50 p-4 rounded-xl border border-slate-700 mt-6">
        <span className="text-slate-400 font-medium">{t("status")}:</span>
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${status === "Running" ? "bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" : status === "Error" || status === "Emergency" ? "bg-red-500 animate-ping" : "bg-slate-500"}`}
          ></span>
          <span
            className={`font-bold ${status === "Running" ? "text-green-400" : status === "Error" || status === "Emergency" ? "text-red-500" : "text-slate-300"}`}
          >
            {status === "Running" ? t("running") : status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanelWidget;
