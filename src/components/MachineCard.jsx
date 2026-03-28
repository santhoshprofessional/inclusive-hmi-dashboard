import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

const MachineCard = ({ machine }) => {
  const { t } = useLanguage();

  const getStatusColor = (status) => {
    switch (status) {
      case "Normal":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "Warning":
        return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      case "Critical":
        return "text-red-500 bg-red-500/10 border-red-500/30";
      case "Offline":
        return "text-slate-400 bg-slate-400/10 border-slate-400/30";
      default:
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
    }
  };

  const getChartColor = (status) => {
    switch (status) {
      case "Normal":
        return "#4ade80"; // green-400
      case "Warning":
        return "#fb923c"; // orange-400
      case "Critical":
        return "#ef4444"; // red-500
      case "Offline":
        return "#94a3b8"; // slate-400
      default:
        return "#60a5fa"; // blue-400
    }
  };

  const chartData = machine.history.map((val, i) => ({
    name: i,
    val: val,
  }));

  const isOffline = machine.status === "Offline";

  return (
    <div
      className={`glass-panel rounded-2xl p-5 flex flex-col gap-4 border transition-all hover:shadow-lg ${
        machine.status === "Warning"
          ? "border-orange-500/50 hover:shadow-orange-500/10"
          : "border-slate-700/50 hover:border-slate-600"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
            {/* Simple icon representation */}
            {machine.name.includes("CNC") && "⚙️"}
            {machine.name.includes("Hydraulic") && "📡"}
            {machine.name.includes("Conveyor") && "📦"}
            {machine.name.includes("Welding") && "🤖"}
            {machine.name.includes("Air") && "💨"}
            {machine.name.includes("Pump") && "💧"}
          </div>
          <div>
            <h3 className="font-bold text-slate-100">{t(machine.name)}</h3>
            <p className="text-xs text-slate-500">{t(machine.zone)}</p>
          </div>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full border font-medium ${getStatusColor(
            machine.status,
          )}`}
        >
          {t(machine.status)}
        </span>
      </div>

      {/* Alert Banner */}
      {machine.activeAlert && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2 flex items-center gap-2 text-sm text-orange-200">
          <span className="text-orange-400">⚠️</span>
          {t(machine.activeAlert)}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
            {t("temperature")}
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-lg font-bold ${isOffline ? "text-slate-600" : "text-slate-200"}`}
            >
              {isOffline ? "-" : machine.metrics.temperature.value}
            </span>
            <span className="text-xs text-slate-500">
              {machine.metrics.temperature.unit}
            </span>
          </div>
          {/* Mock bar indicator */}
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full ${machine.metrics.temperature.value > 80 ? "bg-red-500" : "bg-green-500"}`}
              style={{
                width: isOffline
                  ? "0%"
                  : `${Math.min(100, (machine.metrics.temperature.value / 100) * 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
            {t("vibration")}
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-lg font-bold ${isOffline ? "text-slate-600" : "text-cyan-400"}`}
            >
              {isOffline ? "-" : machine.metrics.vibration.value}
            </span>
            <span className="text-xs text-slate-500">
              {machine.metrics.vibration.unit}
            </span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full ${machine.metrics.vibration.value > 3 ? "bg-orange-500" : "bg-cyan-500"}`}
              style={{
                width: isOffline
                  ? "0%"
                  : `${Math.min(100, (machine.metrics.vibration.value / 5) * 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
            {t("pressure")}
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-lg font-bold ${isOffline ? "text-slate-600" : "text-yellow-400"}`}
            >
              {isOffline ? "-" : machine.metrics.pressure.value}
            </span>
            <span className="text-xs text-slate-500">
              {machine.metrics.pressure.unit}
            </span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full bg-yellow-500`}
              style={{
                width: isOffline
                  ? "0%"
                  : `${Math.min(100, (machine.metrics.pressure.value / 10) * 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer / Chart */}
      <div className="mt-auto pt-4 border-t border-slate-700/50">
        <div className="flex justify-between text-[10px] text-slate-500 mb-2">
          <span className="flex items-center gap-1">
            🕒 {t("uptime")}: flex-1 {machine.uptime}
          </span>
          <span>
            {t("lastChecked")}: {machine.lastChecked}
          </span>
        </div>

        {/* Sparkline chart */}
        <div className="h-12 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
              <Line
                type="monotone"
                dataKey="val"
                stroke={getChartColor(machine.status)}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MachineCard;
