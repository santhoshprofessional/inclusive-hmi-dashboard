import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useSpeech } from "../../hooks/useSpeech";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { activeGlobalAlerts } from "../../data/mockData";

const VoiceSystemWidget = () => {
  const { t, language } = useLanguage();
  const { listen, speak, stopListening, isListening } = useSpeech();

  // Fake audio wave data
  const [wave, setWave] = useState(
    Array(20)
      .fill(0)
      .map((_, i) => ({ i, val: 10 })),
  );

  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setWave(
          Array(20)
            .fill(0)
            .map((_, i) => ({ i, val: 10 + Math.random() * 40 })),
        );
      }, 100);
    } else {
      setWave(
        Array(20)
          .fill(0)
          .map((_, i) => ({ i, val: 10 + Math.random() * 5 })),
      );
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const processCommand = (command) => {
    const lowerCmd = command.toLowerCase();

    // Command matching
    if (
      lowerCmd.includes("status") ||
      lowerCmd.includes("ஸ்டேட்டஸ்") ||
      lowerCmd.includes("நிலை")
    ) {
      speak(t("GEN01"), language);
    } else if (
      lowerCmd.includes("alert") ||
      lowerCmd.includes("எச்சரிக்கை") ||
      lowerCmd.includes("அலர்ட்")
    ) {
      if (activeGlobalAlerts.length > 0) {
        speak(
          `${t(activeGlobalAlerts[0].machine)}: ${t(activeGlobalAlerts[0].message)}`,
          language,
        );
      } else {
        speak(t("noAlerts"), language);
      }
    } else {
      speak(
        language === "ta"
          ? "மன்னிக்கவும், எனக்கு புரியவில்லை"
          : "Sorry, I did not understand that.",
        language,
      );
    }
  };

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      listen((transcript) => processCommand(transcript), language);
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 text-xl">🔊</span>
          <h3 className="font-semibold text-slate-200">Voice System</h3>
        </div>
        <div className="flex gap-1 text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
        </div>
      </div>

      <div className="relative group w-full mb-6">
        <button
          onClick={handleToggle}
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            isListening
              ? "bg-red-500/20 text-red-400 border border-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              : "bg-blue-600 text-white shadow-lg hover:bg-blue-500"
          }`}
        >
          {isListening ? "Listening..." : "Voice Alert"}
        </button>
        {/* Help Tooltip */}
        <div className="absolute left-1/2 -top-12 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 shadow-xl whitespace-nowrap z-50 flex flex-col items-center">
          {t("voiceCommandHint")}
          <div className="w-2 h-2 bg-slate-800 border-b border-r border-slate-700 transform rotate-45 absolute -bottom-1"></div>
        </div>
      </div>

      <div className="flex-1 bg-slate-800/50 rounded-xl border border-slate-700 p-4 relative overflow-hidden flex flex-col justify-end">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wave}>
              <Line
                type="monotone"
                dataKey="val"
                stroke={isListening ? "#ef4444" : "#3b82f6"}
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="val"
                stroke={isListening ? "#f87171" : "#60a5fa"}
                strokeWidth={1}
                dot={false}
                isAnimationActive={false}
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute top-2 left-4 right-4 flex justify-between text-[10px] text-slate-500 font-mono">
          <span>{isListening ? "ACTIVE RECORDING" : "STANDBY"}</span>
          <span>{isListening ? "44.1kHz" : "0Hz"}</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceSystemWidget;
