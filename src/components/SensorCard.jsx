import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { FaThermometerHalf, FaWaveSquare, FaBolt } from "react-icons/fa";

const iconMap = {
  temperature: <FaThermometerHalf size={32} />,
  vibration: <FaWaveSquare size={32} />,
  power: <FaBolt size={32} />,
};

const SensorCard = ({ type, data }) => {
  const { t } = useLanguage();

  // Status colors based on ergonomics
  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "text-red-400 border-red-500 bg-red-500/10";
      case "warning":
        return "text-amber-400 border-amber-500 bg-amber-500/10";
      default:
        return "text-green-400 border-green-500 bg-green-500/10";
    }
  };

  const statusColorClass = getStatusColor(data.status);

  return (
    <div
      className={`glass-panel p-6 rounded-2xl flex flex-col gap-4 border-l-4 ${statusColorClass} transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl ${statusColorClass.replace("border-l-4", "border")}`}
          >
            {iconMap[type]}
          </div>
          <h2 className="text-xl font-bold text-slate-100">{t(type)}</h2>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${statusColorClass.replace("border-l-4", "border")}`}
        >
          {t(data.status)}
        </span>
      </div>

      <div className="mt-2">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-extrabold">{data.value}</span>
          <span className="text-2xl text-slate-400 font-medium">
            {data.unit}
          </span>
        </div>
        <p className="text-slate-400 mt-2 text-sm font-medium">
          Trend: {data.trend}
        </p>
      </div>
    </div>
  );
};

export default SensorCard;
