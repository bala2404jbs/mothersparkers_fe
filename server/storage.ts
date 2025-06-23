import { 
  users, 
  suppliers, 
  purchaseOrders, 
  commodities, 
  alerts,
  type User, 
  type InsertUser,
  type Supplier,
  type InsertSupplier,
  type PurchaseOrder,
  type InsertPurchaseOrder,
  type Commodity,
  type InsertCommodity,
  type Alert,
  type InsertAlert
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Supplier methods
  getSuppliers(): Promise<Supplier[]>;
  getSupplier(id: number): Promise<Supplier | undefined>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: number, supplier: Partial<InsertSupplier>): Promise<Supplier | undefined>;
  
  // Purchase Order methods
  getPurchaseOrders(): Promise<PurchaseOrder[]>;
  getPurchaseOrder(id: number): Promise<PurchaseOrder | undefined>;
  createPurchaseOrder(po: InsertPurchaseOrder): Promise<PurchaseOrder>;
  
  // Commodity methods
  getCommodities(): Promise<Commodity[]>;
  getCommodity(id: number): Promise<Commodity | undefined>;
  updateCommodity(id: number, commodity: Partial<InsertCommodity>): Promise<Commodity | undefined>;
  
  // Alert methods
  getAlerts(): Promise<Alert[]>;
  getAlert(id: number): Promise<Alert | undefined>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: number, alert: Partial<InsertAlert>): Promise<Alert | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private suppliers: Map<number, Supplier>;
  private purchaseOrders: Map<number, PurchaseOrder>;
  private commodities: Map<number, Commodity>;
  private alerts: Map<number, Alert>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.suppliers = new Map();
    this.purchaseOrders = new Map();
    this.commodities = new Map();
    this.alerts = new Map();
    this.currentId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    this.createUser({
      username: "admin",
      password: "procurement2025",
      role: "procurement_manager"
    });

    // Initialize suppliers
    const suppliersData = [
      {
        name: "Premium Coffee Co.",
        category: "Coffee Beans & Roasting",
        location: "São Paulo, Brazil",
        status: "active",
        performanceScore: 95,
        totalSpend: "2100000",
        onTimeDelivery: 98,
        qualityRating: "4.8",
        activeOrders: 15,
        riskLevel: "low"
      },
      {
        name: "Tea Gardens Ltd",
        category: "Premium Tea Leaves",
        location: "Darjeeling, India",
        status: "risk",
        performanceScore: 87,
        totalSpend: "1450000",
        onTimeDelivery: 92,
        qualityRating: "4.5",
        activeOrders: 8,
        riskLevel: "medium"
      },
      {
        name: "Global Roasters",
        category: "Processing & Distribution",
        location: "Toronto, Canada",
        status: "active",
        performanceScore: 72,
        totalSpend: "980000",
        onTimeDelivery: 85,
        qualityRating: "4.1",
        activeOrders: 12,
        riskLevel: "low"
      }
    ];

    suppliersData.forEach(supplier => this.createSupplier(supplier));

    // Initialize commodities - Mother Parkers core products
    const commoditiesData = [
      {
        name: "Colombian Arabica Coffee",
        currentPrice: "2.18",
        priceUnit: "$/lb",
        priceChange: "3.2",
        volatility: "high"
      },
      {
        name: "Ceylon Orange Pekoe Tea",
        currentPrice: "9.25",
        priceUnit: "$/kg",
        priceChange: "1.8",
        volatility: "medium"
      },
      {
        name: "Brazilian Coffee Beans",
        currentPrice: "1.95",
        priceUnit: "$/lb",
        priceChange: "2.1",
        volatility: "high"
      },
      {
        name: "Kenyan Black Tea",
        currentPrice: "8.75",
        priceUnit: "$/kg",
        priceChange: "-0.5",
        volatility: "medium"
      },
      {
        name: "Earl Grey Tea Blend",
        currentPrice: "12.50",
        priceUnit: "$/kg",
        priceChange: "0.8",
        volatility: "low"
      },
      {
        name: "Herbal Tea Blends",
        currentPrice: "15.30",
        priceUnit: "$/kg",
        priceChange: "1.2",
        volatility: "low"
      }
    ];

    commoditiesData.forEach(commodity => {
      const id = this.currentId++;
      this.commodities.set(id, {
        id,
        ...commodity,
        lastUpdated: new Date()
      });
    });

    // Initialize purchase orders
    const poData = [
      {
        poNumber: "PO-2024-001",
        supplierId: 1,
        amount: "125000",
        type: "contract",
        status: "active",
        orderDate: new Date("2024-01-15")
      },
      {
        poNumber: "PO-2024-002",
        supplierId: 2,
        amount: "89500",
        type: "spot",
        status: "active",
        orderDate: new Date("2024-01-12")
      },
      {
        poNumber: "PO-2024-003",
        supplierId: 3,
        amount: "67200",
        type: "contract",
        status: "active",
        orderDate: new Date("2024-01-10")
      }
    ];

    poData.forEach(po => this.createPurchaseOrder(po));

    // Initialize alerts - Mother Parkers operational insights
    const alertsData = [
      {
        type: "market_intelligence",
        priority: "high",
        title: "Colombian Coffee Market Surge",
        description: "Arabica prices up 18% due to La Niña weather patterns affecting Colombian harvest yields",
        status: "active"
      },
      {
        type: "supply_chain",
        priority: "high",
        title: "Ceylon Tea Shipping Delays",
        description: "Sri Lankan tea exports delayed 2-3 weeks due to Colombo port congestion - affecting 2.5M cups daily",
        status: "active"
      },
      {
        type: "procurement_optimization",
        priority: "medium",
        title: "Brazilian Coffee Forward Contract",
        description: "Opportunity to lock in favorable pricing for 500k lbs Brazilian coffee at $1.92/lb",
        status: "active"
      },
      {
        type: "quality_assurance",
        priority: "low",
        title: "Kenyan Tea Quality Excellence",
        description: "Recent Kenyan tea batches scoring 4.8/5 - exceeding Mother Parkers quality standards",
        status: "resolved"
      },
      {
        type: "sustainability",
        priority: "medium",
        title: "Fair Trade Certification Update",
        description: "3 new suppliers achieved Fair Trade certification, supporting our 100+ year commitment to quality",
        status: "active"
      }
    ];

    alertsData.forEach(alert => this.createAlert(alert));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser,
      role: insertUser.role || "user",
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Supplier methods
  async getSuppliers(): Promise<Supplier[]> {
    return Array.from(this.suppliers.values());
  }

  async getSupplier(id: number): Promise<Supplier | undefined> {
    return this.suppliers.get(id);
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const id = this.currentId++;
    const supplier: Supplier = {
      ...insertSupplier,
      status: insertSupplier.status || "active",
      performanceScore: insertSupplier.performanceScore || 0,
      totalSpend: insertSupplier.totalSpend || "0",
      onTimeDelivery: insertSupplier.onTimeDelivery || 0,
      qualityRating: insertSupplier.qualityRating || "0",
      activeOrders: insertSupplier.activeOrders || 0,
      riskLevel: insertSupplier.riskLevel || "low",
      id,
      createdAt: new Date()
    };
    this.suppliers.set(id, supplier);
    return supplier;
  }

  async updateSupplier(id: number, supplier: Partial<InsertSupplier>): Promise<Supplier | undefined> {
    const existing = this.suppliers.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...supplier };
    this.suppliers.set(id, updated);
    return updated;
  }

  // Purchase Order methods
  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    return Array.from(this.purchaseOrders.values());
  }

  async getPurchaseOrder(id: number): Promise<PurchaseOrder | undefined> {
    return this.purchaseOrders.get(id);
  }

  async createPurchaseOrder(insertPo: InsertPurchaseOrder): Promise<PurchaseOrder> {
    const id = this.currentId++;
    const po: PurchaseOrder = {
      ...insertPo,
      status: insertPo.status || "active",
      supplierId: insertPo.supplierId || null,
      orderDate: insertPo.orderDate || null,
      id,
      createdAt: new Date()
    };
    this.purchaseOrders.set(id, po);
    return po;
  }

  // Commodity methods
  async getCommodities(): Promise<Commodity[]> {
    return Array.from(this.commodities.values());
  }

  async getCommodity(id: number): Promise<Commodity | undefined> {
    return this.commodities.get(id);
  }

  async updateCommodity(id: number, commodity: Partial<InsertCommodity>): Promise<Commodity | undefined> {
    const existing = this.commodities.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...commodity, lastUpdated: new Date() };
    this.commodities.set(id, updated);
    return updated;
  }

  // Alert methods
  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async getAlert(id: number): Promise<Alert | undefined> {
    return this.alerts.get(id);
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = this.currentId++;
    const alert: Alert = {
      ...insertAlert,
      priority: insertAlert.priority || "medium",
      status: insertAlert.status || "active",
      id,
      createdAt: new Date()
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async updateAlert(id: number, alert: Partial<InsertAlert>): Promise<Alert | undefined> {
    const existing = this.alerts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...alert };
    this.alerts.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
