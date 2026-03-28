// Simulating a live JSON feed of industrial sensor data for multiple machines
export const mockMachinesData = [
  {
    id: "M-001",
    name: "CNC Lathe Unit",
    zone: "Zone A",
    status: "Normal", // Normal, Warning, Offline
    uptime: "155h",
    lastChecked: "10s ago",
    activeAlert: null,
    metrics: {
      temperature: { value: 62.2, unit: "°C" },
      vibration: { value: 0.98, unit: "mm/s" },
      pressure: { value: 4.7, unit: "bar" },
    },
    history: [60, 61, 62, 59, 63, 62, 60, 62.2, 58, 62],
  },
  {
    id: "M-002",
    name: "Hydraulic Press",
    zone: "Zone A",
    status: "Offline",
    uptime: "0h",
    lastChecked: "3s ago",
    activeAlert: "Power supply lost",
    metrics: {
      temperature: { value: 0, unit: "°C" },
      vibration: { value: 0, unit: "mm/s" },
      pressure: { value: 0, unit: "bar" },
    },
    // Adding some empty or flatline data history for offline
    history: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "M-003",
    name: "Conveyor Belt",
    zone: "Zone B",
    status: "Warning",
    uptime: "175h",
    lastChecked: "1s ago",
    activeAlert: "Pressure drop observed",
    metrics: {
      temperature: { value: 85.3, unit: "°C" },
      vibration: { value: 2.41, unit: "mm/s" },
      pressure: { value: 3.6, unit: "bar" },
    },
    history: [80, 82, 85, 84, 86, 88, 85, 85.3, 84, 86],
  },
  {
    id: "M-004",
    name: "Welding Robot",
    zone: "Zone B",
    status: "Warning",
    uptime: "25h",
    lastChecked: "12s ago",
    activeAlert: "Temperature rising",
    metrics: {
      temperature: { value: 88.2, unit: "°C" },
      vibration: { value: 2.85, unit: "mm/s" },
      pressure: { value: 3.7, unit: "bar" },
    },
    history: [75, 78, 80, 85, 87, 88, 88.2, 87, 86, 88],
  },
  {
    id: "M-005",
    name: "Air Compressor",
    zone: "Zone C",
    status: "Warning",
    uptime: "450h",
    lastChecked: "5s ago",
    activeAlert: "Vibration spike detected",
    metrics: {
      temperature: { value: 94.8, unit: "°C" },
      vibration: { value: 3.52, unit: "mm/s" },
      pressure: { value: 2.7, unit: "bar" },
    },
    history: [1.2, 1.4, 1.3, 2.5, 3.0, 3.5, 3.52, 3.2, 3.4, 3.5],
  },
  {
    id: "M-006",
    name: "Coolant Pump",
    zone: "Zone C",
    status: "Warning",
    uptime: "55h",
    lastChecked: "2s ago",
    activeAlert: "Temperature rising",
    metrics: {
      temperature: { value: 95.1, unit: "°C" },
      vibration: { value: 2.0, unit: "mm/s" },
      pressure: { value: 2.2, unit: "bar" },
    },
    history: [70, 75, 80, 85, 90, 92, 95.1, 94, 95, 96], // temperature data
  },
];

export const globalStats = {
  totalMachines: 6,
  critical: 0,
  warnings: 4,
  healthy: 1,
  activeAlertsNumber: 3,
};

export const activeGlobalAlerts = [
  {
    id: "A-001",
    machine: "Conveyor Belt",
    status: "Warning",
    message: "Pressure drop observed",
  },
  {
    id: "A-002",
    machine: "Air Compressor",
    status: "Warning",
    message: "Vibration spike detected",
  },
  {
    id: "A-003",
    machine: "Coolant Pump",
    status: "Warning",
    message: "Temperature rising",
  },
];
