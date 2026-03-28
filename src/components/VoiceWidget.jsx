import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSpeech } from "../hooks/useSpeech";
import { FaMicrophone, FaRegStopCircle } from "react-icons/fa";
import { activeGlobalAlerts } from "../data/mockData";

const VoiceWidget = () => {
  const { t, language } = useLanguage();
  const { listen, speak, isListening, stopSpeaking, stopListening } =
    useSpeech();
  const [lastCommand, setLastCommand] = useState("");
  const [feedback, setFeedback] = useState("");

  const processCommand = (command) => {
    setLastCommand(command);
    const lowerCmd = command.toLowerCase();

    // Simple intent matching
    if (
      lowerCmd.includes("status") ||
      lowerCmd.includes("ஸ்டேட்டஸ்") ||
      lowerCmd.includes("நிலை")
    ) {
      const resp = t("GEN01");
      setFeedback(resp);
      speak(resp, language);
    } else if (
      lowerCmd.includes("alert") ||
      lowerCmd.includes("எச்சரிக்கை") ||
      lowerCmd.includes("அலர்ட்")
    ) {
      if (activeGlobalAlerts.length > 0) {
        // Read the first alert machine and message
        const firstAlert = activeGlobalAlerts[0];
        const resp = `${t(firstAlert.machine)}: ${t(firstAlert.message)}`;
        setFeedback(resp);
        speak(resp, language);
      } else {
        const resp = t("noAlerts");
        setFeedback(resp);
        speak(resp, language);
      }
    } else {
      const resp =
        language === "ta"
          ? "மன்னிக்கவும், எனக்கு புரியவில்லை"
          : "Sorry, I did not understand that.";
      setFeedback(resp);
      speak(resp, language);
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      return;
    }

    stopSpeaking();
    setFeedback("");
    setLastCommand("");

    listen((transcript) => {
      processCommand(transcript);
    }, language);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 max-w-sm">
      {/* Speech Bubble Feedback */}
      {(lastCommand || feedback) && (
        <div className="glass-panel p-4 rounded-2xl rounded-br-sm shadow-2xl border border-blue-500/30 w-full animate-fade-in">
          {lastCommand && (
            <div className="mb-2">
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                You Said:
              </span>
              <p className="text-slate-200 italic">"{lastCommand}"</p>
            </div>
          )}
          {feedback && (
            <div className="border-t border-slate-700/50 pt-2 mt-2">
              <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">
                System:
              </span>
              <p className="text-white font-medium">{feedback}</p>
            </div>
          )}
        </div>
      )}

      {/* Mic Button */}
      <button
        onClick={handleVoiceToggle}
        className={`relative p-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center
          ${
            isListening
              ? "bg-red-500 animate-pulse text-white shadow-[0_0_30px_rgba(239,68,68,0.7)]"
              : "bg-gradient-to-tr from-blue-600 to-indigo-500 text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          }
        `}
        aria-label={isListening ? t("listening") : t("speak")}
        title={t("voiceCommandHint")}
      >
        {isListening ? (
          <>
            <div className="absolute inset-0 rounded-full border-4 border-red-400 opacity-50 animate-ping"></div>
            <FaRegStopCircle size={32} />
          </>
        ) : (
          <FaMicrophone size={32} />
        )}
      </button>

      {!isListening && !lastCommand && (
        <div className="bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-300 animate-bounce cursor-default shadow-lg">
          {t("voiceCommandHint")}
        </div>
      )}
    </div>
  );
};

export default VoiceWidget;
