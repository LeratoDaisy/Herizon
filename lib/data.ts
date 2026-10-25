export const user = {
  name: "Naledi",
  business: "Naledi's Kitchen",
  skills: ["Catering", "Food preparation", "Customer service"],
  goals: ["Grow my business", "Increase income"],
};

export const transactions = [
  { label: "Catering order", date: "18 Oct", amount: 850, type: "in", icon: "Utensils" },
  { label: "Ingredients", date: "17 Oct", amount: 120, type: "out", icon: "ShoppingBasket" },
  { label: "Transport", date: "16 Oct", amount: 65, type: "out", icon: "Car" },
  { label: "Client payment", date: "14 Oct", amount: 500, type: "in", icon: "Banknote" },
];

export const opportunities = [
  { id: 1, title: "Soweto Food Market Stall", type: "Business opportunity", match: 94, reason: "3 verified catering jobs, steady sales and a goal to grow your customer base.", benefit: "Reach new customers", tags: ["Catering", "Weekend", "Small business"] },
  { id: 2, title: "Small Business Financial Workshop", type: "Skills programme", match: 91, reason: "You are actively tracking business income and working toward an equipment goal.", benefit: "Improve business decisions", tags: ["Finance", "Business", "Free"] },
  { id: 3, title: "Local Supplier Networking Day", type: "Networking", match: 86, reason: "Your catering work and customer-facing skills are a strong fit.", benefit: "Find better suppliers", tags: ["Networking", "Food", "Business"] },
];

export const workRecords = [
  { title: "Catering for 30 guests", client: "Thando M.", date: "18 Oct 2026", amount: 850, skills: ["Catering", "Food preparation"], verified: true },
  { title: "Birthday event catering", client: "Lerato K.", date: "11 Oct 2026", amount: 1200, skills: ["Catering", "Customer service"], verified: true },
  { title: "Corporate lunch", client: "Mpho D.", date: "03 Oct 2026", amount: 950, skills: ["Catering", "Event service"], verified: true },
];

export const lessons = [
  { title: "How to price your products", time: "5 min", progress: 0, category: "Business basics" },
  { title: "Separate business and personal money", time: "4 min", progress: 60, category: "Money management" },
  { title: "Build a savings buffer", time: "6 min", progress: 100, category: "Saving" },
];
