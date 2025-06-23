import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertSupplierSchema, insertPurchaseOrderSchema, insertAlertSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In a real app, you'd set up proper session management
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          role: user.role 
        },
        message: "Login successful"
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Supplier routes
  app.get("/suppliers", async (req, res) => {
    try {
      const suppliers = await storage.getSuppliers();
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch suppliers" });
    }
  });

  app.get("/suppliers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const supplier = await storage.getSupplier(id);
      
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      
      res.json(supplier);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch supplier" });
    }
  });

  app.post("/suppliers", async (req, res) => {
    try {
      const validatedData = insertSupplierSchema.parse(req.body);
      const supplier = await storage.createSupplier(validatedData);
      res.status(201).json(supplier);
    } catch (error) {
      res.status(400).json({ message: "Invalid supplier data" });
    }
  });

  // Purchase Order routes
  app.get("/purchase-orders", async (req, res) => {
    try {
      const orders = await storage.getPurchaseOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch purchase orders" });
    }
  });

  app.post("/purchase-orders", async (req, res) => {
    try {
      const validatedData = insertPurchaseOrderSchema.parse(req.body);
      const order = await storage.createPurchaseOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Invalid purchase order data" });
    }
  });

  // Commodity routes
  app.get("/commodities", async (req, res) => {
    try {
      const commodities = await storage.getCommodities();
      res.json(commodities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch commodities" });
    }
  });

  // Alert routes
  app.get("/alerts", async (req, res) => {
    try {
      const alerts = await storage.getAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.post("/alerts", async (req, res) => {
    try {
      const validatedData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(validatedData);
      res.status(201).json(alert);
    } catch (error) {
      res.status(400).json({ message: "Invalid alert data" });
    }
  });

  app.patch("/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const alert = await storage.updateAlert(id, req.body);
      
      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      
      res.json(alert);
    } catch (error) {
      res.status(500).json({ message: "Failed to update alert" });
    }
  });

  // Dashboard summary route
  app.get("/dashboard/summary", async (req, res) => {
    try {
      const suppliers = await storage.getSuppliers();
      const orders = await storage.getPurchaseOrders();
      const commodities = await storage.getCommodities();
      const alerts = await storage.getAlerts();

      const totalSpend = orders.reduce((sum, order) => sum + parseFloat(order.amount), 0);
      const activeSuppliers = suppliers.filter(s => s.status === "active").length;
      const riskSuppliers = suppliers.filter(s => s.riskLevel === "high" || s.status === "risk").length;
      const activeAlerts = alerts.filter(a => a.status === "active").length;
      const highPriorityAlerts = alerts.filter(a => a.priority === "high" && a.status === "active").length;
      const trackedCommodities = commodities.length;
      const volatileCommodities = commodities.filter(c => c.volatility === "high").length;

      res.json({
        totalSpend: totalSpend.toFixed(2),
        activeSuppliers,
        riskSuppliers,
        activeAlerts,
        highPriorityAlerts,
        trackedCommodities,
        volatileCommodities,
        summarySpend: (totalSpend * 4.2).toFixed(0) // Simulated annual summary
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard summary" });
    }
  });

  // Procurement Intelligence API proxy routes
  app.get("/procurement/summaries", async (req, res) => {
    try {
      const response = await fetch('https://h6q97gt0-8000.inc1.devtunnels.ms/procurement/procurement-news-analysis/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching procurement summaries:', error);
      res.status(500).json({ message: "Failed to fetch procurement summaries" });
    }
  });

  app.post("/procurement/details", async (req, res) => {
    try {
      const { uuids } = req.body;
      const response = await fetch('https://h6q97gt0-8000.inc1.devtunnels.ms/procurement/commodity-news/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuids }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching commodity news details:', error);
      res.status(500).json({ message: "Failed to fetch commodity news details" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
