import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useSpeech } from "../../hooks/useSpeech";

const ErrorMonitorWidget = ({
  status,
  setStatus,
  errorSimulated,
  setErrorSimulated,
}) => {
  const { t } = useLanguage();
  const { speak } = useSpeech();

  const simulateFault = () => {
    setErrorSimulated(true);
    setStatus("Error");

    speak("Machine Error Detected. Error: Overheating", "en");
    setTimeout(() => {
      speak("இயந்திர பிழை கண்டறியப்பட்டது. பிழை அதிக வெப்பம்", "ta");
    }, 4000);

    setTimeout(() => {
      setErrorSimulated(false);
      setStatus("Running");
    }, 10000); // clears after 10s
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex flex-col h-full relative overflow-hidden group">
      {(errorSimulated || status === "Error" || status === "Emergency") && (
        <div className="absolute inset-0 bg-red-900/10 pointer-events-none transition-colors duration-500"></div>
      )}

      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-red-400 text-xl">🚨</span>
          <h3 className="font-semibold text-slate-200">
            {t("errorMonitoring")}
          </h3>
        </div>
        <div className="flex gap-1 text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10 mb-6">
        {!errorSimulated && status !== "Error" && status !== "Emergency" ? (
          <div className="bg-slate-800/80 border border-green-500/30 rounded-xl p-5 flex items-center justify-center gap-4 h-full shadow-inner">
            <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></span>
            </div>
            <span className="text-green-400 font-bold text-lg">
              {t("systemNormal")}
            </span>
          </div>
        ) : (
          <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-5 flex flex-col gap-3 h-full animate-pulse shadow-inner">
            <span className="text-red-400 font-bold text-lg">
              {t("machineErrorDetected")}
            </span>
            <div className="flex flex-col gap-2 text-sm bg-black/40 p-4 rounded-lg border border-red-500/20 h-full justify-center">
              <span className="text-orange-400 font-medium">
                ⚠️ {t("error")}: {t("overheating")}
              </span>
              <span className="text-blue-300">
                🔵 English: Temperature high
              </span>
              <span className="text-orange-300">🟠 Tamil: வெப்பம் அதிகம்</span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={simulateFault}
        disabled={errorSimulated || status === "Error"}
        className="w-full bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-auto relative z-10"
      >
        {t("simulateFault")}
      </button>
    </div>
  );
};

export default ErrorMonitorWidget;
