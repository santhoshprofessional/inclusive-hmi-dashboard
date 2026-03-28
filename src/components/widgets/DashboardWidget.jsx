import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DashboardWidget = ({ data }) => {
  const { t } = useLanguage();

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex flex-col h-full col-span-1 lg:col-span-2 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-blue-300 text-xl">📊</span>
          <h3 className="font-semibold text-slate-200">Dashboard Live Feed</h3>
        </div>
        <div className="flex gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-red-400"></span>
            <span className="text-slate-400">{t("temperature")}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-blue-400"></span>
            <span className="text-slate-400">{t("pressure")}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-green-400"></span>
            <span className="text-slate-400">{t("vibration")}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
              labelStyle={{ color: "#94a3b8", fontSize: "10px" }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              name={t("temperature")}
              stroke="#f87171"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#f87171", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="pressure"
              name={t("pressure")}
              stroke="#60a5fa"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#60a5fa", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="vibration"
              name={t("vibration")}
              stroke="#4ade80"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#4ade80", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardWidget;
