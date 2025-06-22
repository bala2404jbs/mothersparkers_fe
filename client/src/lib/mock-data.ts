// Mock data for charts and visualizations - using actual data structure for consistency
export const mockSpendData = [
  { name: "Coffee", value: 450000, color: "#8B4513" },
  { name: "Tea", value: 320000, color: "#10B981" },
  { name: "Sugar", value: 180000, color: "#F59E0B" },
  { name: "Cocoa", value: 95000, color: "#D2691E" },
  { name: "Packaging", value: 130000, color: "#3B82F6" },
];

// Real Mother Parkers price data from Excel export
export const realPriceData = [
  { date: "Apr 02", price: 388.85, volume: 13885, change: -0.05 },
  { date: "Apr 03", price: 385.25, volume: 16445, change: -0.93 },
  { date: "Apr 04", price: 365.70, volume: 24921, change: -5.07 },
  { date: "Apr 07", price: 344.80, volume: 37079, change: -5.72 },
  { date: "Apr 08", price: 342.90, volume: 25850, change: -0.55 },
  { date: "Apr 09", price: 341.70, volume: 28737, change: -0.35 },
  { date: "Apr 10", price: 342.85, volume: 20192, change: 0.34 },
  { date: "Apr 11", price: 357.70, volume: 23383, change: 4.33 },
  { date: "Apr 14", price: 358.50, volume: 19261, change: 0.22 },
  { date: "Apr 15", price: 367.15, volume: 19845, change: 2.41 },
  { date: "Apr 16", price: 373.80, volume: 12907, change: 1.81 },
  { date: "Apr 17", price: 372.60, volume: 12503, change: -0.32 },
  { date: "Apr 21", price: 364.55, volume: 10472, change: -2.16 },
  { date: "Apr 22", price: 372.75, volume: 11580, change: 2.25 },
  { date: "Apr 23", price: 385.75, volume: 14104, change: 3.49 },
  { date: "Apr 24", price: 398.80, volume: 14882, change: 3.38 },
  { date: "Apr 25", price: 399.85, volume: 17481, change: 0.26 },
  { date: "Apr 28", price: 410.05, volume: 13631, change: 2.55 },
  { date: "Apr 29", price: 399.80, volume: 14526, change: -2.50 },
  { date: "Apr 30", price: 400.75, volume: 11807, change: 0.24 },
  { date: "May 01", price: 384.65, volume: 14291, change: -4.02 },
  { date: "May 02", price: 385.40, volume: 10039, change: 0.19 },
  { date: "May 05", price: 388.25, volume: 8160, change: 0.74 },
  { date: "May 06", price: 389.85, volume: 9956, change: 0.41 },
  { date: "May 07", price: 384.10, volume: 10776, change: -1.47 },
  { date: "May 08", price: 387.35, volume: 8221, change: 0.85 },
  { date: "May 09", price: 387.75, volume: 9485, change: 0.10 },
  { date: "May 12", price: 372.95, volume: 18734, change: -3.82 },
  { date: "May 20", price: 369.30, volume: 9934, change: -1.82 },
  { date: "May 21", price: 370.30, volume: 7625, change: 0.27 },
  { date: "May 22", price: 360.75, volume: 14747, change: -2.58 },
  { date: "May 23", price: 361.00, volume: 10660, change: 0.07 },
  { date: "May 27", price: 361.70, volume: 12122, change: 0.19 },
  { date: "May 28", price: 351.95, volume: 15417, change: -2.70 },
  { date: "May 29", price: 348.40, volume: 13380, change: -1.01 },
  { date: "May 30", price: 342.45, volume: 14944, change: -1.71 },
  { date: "Jun 02", price: 344.45, volume: 16733, change: 0.58 },
  { date: "Jun 03", price: 340.85, volume: 13971, change: -1.05 },
  { date: "Jun 04", price: 346.15, volume: 12780, change: 1.55 },
  { date: "Jun 05", price: 359.75, volume: 20188, change: 3.93 },
  { date: "Jun 06", price: 358.05, volume: 25705, change: -0.47 },
  { date: "Jun 09", price: 359.40, volume: 19175, change: 0.38 },
  { date: "Jun 10", price: 353.05, volume: 21690, change: -1.77 },
  { date: "Jun 11", price: 348.60, volume: 15311, change: -1.26 },
  { date: "Jun 12", price: 345.30, volume: 20097, change: -0.95 },
  { date: "Jun 13", price: 346.00, volume: 24237, change: 0.20 },
  { date: "Jun 16", price: 340.25, volume: 13763, change: -1.66 },
  { date: "Jun 17", price: 332.45, volume: 18697, change: -2.29 },
  { date: "Jun 18", price: 322.30, volume: 21664, change: -3.05 },
  { date: "Jun 20", price: 315.05, volume: 18786, change: -2.25 }
];

// AI Predictions based on trend analysis
export const aiPredictions = [
  { date: "Jun 23", price: 318.50, confidence: 85, type: "prediction" },
  { date: "Jun 24", price: 321.75, confidence: 82, type: "prediction" },
  { date: "Jun 25", price: 319.20, confidence: 78, type: "prediction" },
  { date: "Jun 26", price: 325.80, confidence: 75, type: "prediction" },
  { date: "Jun 27", price: 328.45, confidence: 72, type: "prediction" }
];

export const mockPriceData = [
  { month: "Jan", coffee: 1.85, tea: 7.2 },
  { month: "Feb", coffee: 1.92, tea: 7.5 },
  { month: "Mar", coffee: 2.05, tea: 7.8 },
  { month: "Apr", coffee: 2.15, tea: 8.1 },
  { month: "May", coffee: 2.08, tea: 8.3 },
  { month: "Jun", coffee: 2.12, tea: 8.5 },
];

export const mockMarketData = [
  { week: "Week 1", actual: 2.10, prediction: null },
  { week: "Week 2", actual: 2.15, prediction: null },
  { week: "Week 3", actual: 2.08, prediction: null },
  { week: "Week 4", actual: 2.12, prediction: null },
  { week: "Pred 1", actual: null, prediction: 2.18 },
  { week: "Pred 2", actual: null, prediction: 2.25 },
];

export const mockVolumeData = [
  { volume: 100, cost: 125000 },
  { volume: 150, cost: 189500 },
  { volume: 80, cost: 95000 },
  { volume: 200, cost: 245000 },
  { volume: 120, cost: 145000 },
  { volume: 180, cost: 220000 },
];

export const mockFXData = [
  { month: "Jan", rate: 5.2 },
  { month: "Feb", rate: 5.15 },
  { month: "Mar", rate: 5.3 },
  { month: "Apr", rate: 5.25 },
  { month: "May", rate: 5.1 },
  { month: "Jun", rate: 5.05 },
];

export const mockAITrendsData = [
  { quarter: "Q1 2023", optimization: 5, riskReduction: 3 },
  { quarter: "Q2 2023", optimization: 8, riskReduction: 7 },
  { quarter: "Q3 2023", optimization: 12, riskReduction: 10 },
  { quarter: "Q4 2023", optimization: 15, riskReduction: 14 },
  { quarter: "Q1 2024", optimization: 18, riskReduction: 16 },
  { quarter: "Q2 2024", optimization: 22, riskReduction: 20 },
];

export const mockNewsData = [
  {
    id: 1,
    headline: "Coffee Prices Surge on Brazil Weather Concerns",
    summary: "Arabica futures rise 8% as drought threatens Brazilian crop yields...",
    source: "Reuters",
    time: "2 hours ago",
    priority: "high"
  },
  {
    id: 2,
    headline: "Global Tea Production Increases 5%",
    summary: "Higher yields from India and Sri Lanka offset lower Chinese production...",
    source: "Bloomberg",
    time: "5 hours ago",
    priority: "medium"
  },
  {
    id: 3,
    headline: "Sugar Market Volatility Expected",
    summary: "El Niño weather patterns may impact global sugar cane production...",
    source: "MarketWatch",
    time: "1 day ago",
    priority: "medium"
  }
];
