import React, { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import AlertsPanel from "./components/AlertsPanel";
import VoiceWidget from "./components/VoiceWidget";
import { mockSensorData } from "./data/mockData";

const DashboardContent = () => {
  const { t } = useLanguage();
  const [data, setData] = useState(mockSensorData);

  // Simulating real-time data updates (just for visual effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          temperature: {
            ...prev.metrics.temperature,
            value: (85 + (Math.random() * 2 - 1)).toFixed(1),
          },
          vibration: {
            ...prev.metrics.vibration,
            value: (12.4 + (Math.random() * 0.5 - 0.25)).toFixed(2),
          },
          power: {
            ...prev.metrics.power,
            value: (4.2 + (Math.random() * 0.2 - 0.1)).toFixed(2),
          },
        },
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      <Header />

      <main className="container mx-auto px-4 py-8 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-2">
              {t("machineStatus")}
            </h2>
            <p className="text-slate-400 font-medium font-mono bg-slate-800 inline-block px-3 py-1 rounded-md border border-slate-700">
              ID: {data.machineID}
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl">🏭</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Sensor Metrics Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SensorCard type="temperature" data={data.metrics.temperature} />
              <SensorCard type="vibration" data={data.metrics.vibration} />
              <SensorCard type="power" data={data.metrics.power} />
            </div>

            <div className="glass-panel p-6 rounded-2xl flex-1 border border-slate-700 mt-2">
              <h3 className="text-xl font-bold mb-4 text-slate-300">
                System Overview
              </h3>
              <div className="h-64 bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-center justify-center flex-col gap-4">
                <p className="text-slate-500 font-medium">
                  IoT Data Visualization goes here
                </p>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span
                    className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
                    style={{ animationDelay: "200ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
                    style={{ animationDelay: "400ms" }}
                  ></span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Alerts Area */}
          <div className="lg:col-span-1 h-full min-h-[500px]">
            <AlertsPanel alerts={data.activeAlerts} />
          </div>
        </div>
      </main>

      <VoiceWidget data={data} />
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
