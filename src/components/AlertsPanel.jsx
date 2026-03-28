import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSpeech } from "../hooks/useSpeech";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";

const AlertsPanel = ({ alerts }) => {
  const { t, language } = useLanguage();
  const { speak, stopSpeaking, isSpeaking } = useSpeech();

  const handleSpeak = (alertCode) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(t(alertCode), language);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <span className="text-red-400">🚨</span>
        {t("alerts")}
      </h2>

      {alerts.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <p className="text-lg text-green-400 font-medium">{t("noAlerts")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-xl border flex gap-4 ${
                alert.severity === "critical"
                  ? "bg-red-500/10 border-red-500/40 text-red-100"
                  : "bg-amber-500/10 border-amber-500/40 text-amber-100"
              }`}
            >
              <div className="text-3xl mt-1">
                {alert.severity === "critical" ? "🔴" : "🟡"}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-sm opacity-70 bg-black/20 px-2 py-0.5 rounded">
                    {alert.code}
                  </span>
                  <span className="text-xs opacity-60">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-lg font-medium leading-relaxed">
                  {t(alert.code)}
                </p>
              </div>
              <button
                onClick={() => handleSpeak(alert.code)}
                className={`p-4 rounded-full transition-all flex-shrink-0 self-center ${
                  isSpeaking
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
                aria-label={t("speak")}
                title={t("speak")}
              >
                {isSpeaking ? (
                  <HiOutlineSpeakerXMark size={28} />
                ) : (
                  <HiOutlineSpeakerWave size={28} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;
