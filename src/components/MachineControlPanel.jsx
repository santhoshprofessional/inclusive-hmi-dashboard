import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSpeech } from "../hooks/useSpeech";

const MachineControlPanel = () => {
  const { t } = useLanguage();
  const { speak } = useSpeech();
  const [status, setStatus] = useState("Running");
  const [errorSimulated, setErrorSimulated] = useState(false);

  const simulateFault = () => {
    setErrorSimulated(true);
    setStatus("Error");

    // Speak in English first
    speak("Machine Error Detected. Error: Overheating", "en");
    // Speak in Tamil after English finishes
    setTimeout(() => {
      speak("இயந்திர பிழை கண்டறியப்பட்டது. பிழை அதிக வெப்பம்", "ta");
    }, 4000);

    setTimeout(() => {
      setErrorSimulated(false);
      setStatus("Running");
    }, 10000); // clears after 10s to give time for audio
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Control Panel */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 col-span-1 md:col-span-2 lg:col-span-1">
        <div className="flex justify-between items-center mb-4">
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

        <div className="grid grid-cols-3 gap-3 mb-4">
          <button
            onClick={() => setStatus("Running")}
            className="bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white border border-green-600/50 py-2 rounded-lg font-medium transition-all"
          >
            {t("start")}
          </button>
          <button
            onClick={() => setStatus("Stopped")}
            className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/50 py-2 rounded-lg font-medium transition-all"
          >
            {t("stop")}
          </button>
          <button
            onClick={() => setStatus("Emergency")}
            className="bg-orange-600/20 hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-600/50 py-2 rounded-lg font-medium transition-all col-span-3 mt-1"
          >
            {t("emergency")}
          </button>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/50 py-2 px-3 rounded-lg border border-slate-700">
          <span className="text-slate-400 text-sm">{t("status")}:</span>
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${status === "Running" ? "bg-green-500 animate-pulse" : status === "Error" || status === "Emergency" ? "bg-red-500 animate-ping" : "bg-slate-500"}`}
            ></span>
            <span
              className={`font-medium ${status === "Running" ? "text-green-400" : status === "Error" || status === "Emergency" ? "text-red-500" : "text-slate-300"}`}
            >
              {status === "Running" ? t("running") : status}
            </span>
          </div>
        </div>
      </div>

      {/* Error Monitoring */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 relative overflow-hidden group">
        {(errorSimulated || status === "Error" || status === "Emergency") && (
          <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div>
        )}

        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-red-400">🚨</span>
            <h3 className="font-semibold text-slate-200">
              {t("errorMonitoring")}
            </h3>
          </div>
        </div>

        {!errorSimulated && status !== "Error" && status !== "Emergency" ? (
          <div className="bg-slate-800/80 border border-green-500/30 rounded-lg p-3 flex items-center gap-3 mb-4">
            <div className="bg-green-500/20 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <span className="text-green-400 font-medium">
              {t("systemNormal")}
            </span>
          </div>
        ) : (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex flex-col gap-2 mb-4 animate-pulse">
            <span className="text-red-400 font-bold">
              {t("machineErrorDetected")}
            </span>
            <div className="flex flex-col gap-1 text-sm bg-black/20 p-2 rounded border border-red-500/20">
              <span className="text-orange-300">
                ⚠️ {t("error")}: {t("overheating")}
              </span>
              <span className="text-slate-300">
                🔵 English: Temperature high
              </span>
              <span className="text-slate-300">🟠 Tamil: வெப்பம் அதிகம்</span>
            </div>
          </div>
        )}

        <button
          onClick={simulateFault}
          disabled={errorSimulated || status === "Error"}
          className="w-full bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 py-2 border-dashed rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("simulateFault")}
        </button>
      </div>

      {/* Sign Language Video Widget Placeholder Box - as shown in Image 2 */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">🖐️</span>
          <h3 className="font-semibold text-slate-200">
            {t("signLanguageAssistant")}
          </h3>
        </div>

        <div className="flex-1 bg-black rounded-lg border border-slate-700 overflow-hidden relative group">
          {/* Mock Video Player */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-500/50">
                <span className="text-xl">▶️</span>
              </div>
              <p className="text-xs text-slate-400">
                {t("realTimeInstructions")}
              </p>
            </div>
          </div>

          {/* Mock Player Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <div className="flex gap-2 text-slate-300 text-[10px] items-center">
              <span>▶</span>
              <div className="h-1 bg-slate-600 rounded-full flex-1">
                <div className="w-1/3 h-full bg-blue-500 rounded-full"></div>
              </div>
              <span>🔊</span>
              <span>[ ]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineControlPanel;
