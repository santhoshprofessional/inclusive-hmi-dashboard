import React, { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import ControlPanelWidget from "./components/widgets/ControlPanelWidget";
import ErrorMonitorWidget from "./components/widgets/ErrorMonitorWidget";
import VoiceSystemWidget from "./components/widgets/VoiceSystemWidget";
import DashboardWidget from "./components/widgets/DashboardWidget";
import AccessibilityWidget from "./components/widgets/AccessibilityWidget";
import SignLanguageWidget from "./components/widgets/SignLanguageWidget";

const DashboardContent = () => {
  const { t } = useLanguage();

  // Shared State
  const [status, setStatus] = useState("Running");
  const [errorSimulated, setErrorSimulated] = useState(false);
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const [chartData, setChartData] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      name: i,
      temp: 60 + Math.random() * 5,
      pressure: 30 + Math.random() * 2,
      vibration: 10 + Math.random() * 1,
    })),
  );

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Simulating real-time global dashboard updates
  useEffect(() => {
    let interval;
    if (status === "Running" && !errorSimulated) {
      interval = setInterval(() => {
        setChartData((prev) => {
          const newData = [...prev.slice(1)];
          newData.push({
            name: prev[prev.length - 1].name + 1,
            temp: 60 + Math.random() * 5,
            pressure: 30 + Math.random() * 2,
            vibration: 10 + Math.random() * 1,
          });
          return newData;
        });
      }, 2000);
    } else if (errorSimulated) {
      // Simulate spiked data
      interval = setInterval(() => {
        setChartData((prev) => {
          const newData = [...prev.slice(1)];
          newData.push({
            name: prev[prev.length - 1].name + 1,
            temp: 90 + Math.random() * 10, // Spike
            pressure: 45 + Math.random() * 5, // Spike
            vibration: 25 + Math.random() * 5, // Spike
          });
          return newData;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, errorSimulated]);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <main className="container mx-auto px-4 py-8 max-w-[1400px]">
        {/* Layout Title & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 px-2">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase flex items-center gap-3">
            <span className="text-blue-500">⚙️</span>
            Inclusive HMI Dashboard
          </h2>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
            <span>Machine ID: M-001</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
            <span>Uptime: 145h</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
            <span className="text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></span>
              Live Synced
            </span>
          </div>
        </div>

        {/* 6-Block Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* Row 1 */}
          <ControlPanelWidget status={status} setStatus={setStatus} />
          <ErrorMonitorWidget
            status={status}
            setStatus={setStatus}
            errorSimulated={errorSimulated}
            setErrorSimulated={setErrorSimulated}
          />
          <VoiceSystemWidget />

          {/* Row 2 */}
          <DashboardWidget data={chartData} />
          <AccessibilityWidget theme={theme} toggleTheme={toggleTheme} />
          <SignLanguageWidget />
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
}

export default App;
