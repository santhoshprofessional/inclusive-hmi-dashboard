// Simulating a live JSON feed of industrial sensor data
export const mockSensorData = {
  machineID: "CNC-Milli-01",
  timestamp: new Date().toISOString(),
  metrics: {
    temperature: {
      value: 85,
      unit: "°C",
      status: "warning", // 'normal', 'warning', 'critical'
      trend: "+5°C/hr",
    },
    vibration: {
      value: 12.4,
      unit: "mm/s",
      status: "critical",
      trend: "increasing",
    },
    power: {
      value: 4.2,
      unit: "kW",
      status: "normal",
      trend: "stable",
    },
  },
  activeAlerts: [
    {
      id: "A-001",
      code: "E402",
      rawLog: "E402 - Motor Overcurrent detected in Axis-X",
      severity: "critical",
      timestamp: new Date(Date.now() - 5000).toISOString(), // 5 seconds ago
    },
    {
      id: "A-002",
      code: "V302",
      rawLog: "V302 - High frequency vibration > 12mm/s",
      severity: "warning",
      timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
    },
  ],
};
