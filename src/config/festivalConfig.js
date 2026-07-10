export const festivalConfig = {
  // DEV_OVERRIDE: Set to true to force a specific day or mode for testing.
  DEV_OVERRIDE: false,
  FORCED_DAY: 1, // 1 | 2 | 3

  startDate: "2026-08-18",
  endDate: "2026-08-20",

  days: [
    {
      id: 1,
      name: "Explore",
      title: "Explore",
      theme: "explore",
      date: "2026-08-18",
      accent: "#d9040b",
      description: "Deconstruct structural code architectures and edge systems."
    },
    {
      id: 2,
      name: "Create",
      title: "Create",
      theme: "create",
      date: "2026-08-19",
      accent: "#d9040b",
      description: "Accelerate creation with decentralized engineering panels."
    },
    {
      id: 3,
      name: "Celebrate",
      title: "Celebrate",
      theme: "celebrate",
      date: "2026-08-20",
      accent: "#d9040b",
      description: "Celebrate high-performance web innovations and design."
    }
  ]
};
