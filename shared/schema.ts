import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  status: text("status").notNull().default("active"),
  performanceScore: integer("performance_score").notNull().default(0),
  totalSpend: decimal("total_spend", { precision: 12, scale: 2 }).notNull().default("0"),
  onTimeDelivery: integer("on_time_delivery").notNull().default(0),
  qualityRating: decimal("quality_rating", { precision: 3, scale: 1 }).notNull().default("0"),
  activeOrders: integer("active_orders").notNull().default(0),
  riskLevel: text("risk_level").notNull().default("low"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const purchaseOrders = pgTable("purchase_orders", {
  id: serial("id").primaryKey(),
  poNumber: text("po_number").notNull().unique(),
  supplierId: integer("supplier_id").references(() => suppliers.id),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  type: text("type").notNull(), // contract or spot
  status: text("status").notNull().default("active"),
  orderDate: timestamp("order_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const commodities = pgTable("commodities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  currentPrice: decimal("current_price", { precision: 10, scale: 2 }).notNull(),
  priceUnit: text("price_unit").notNull(),
  priceChange: decimal("price_change", { precision: 5, scale: 2 }).notNull().default("0"),
  volatility: text("volatility").notNull().default("low"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  priority: text("priority").notNull().default("medium"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true,
});

export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrders).omit({
  id: true,
  createdAt: true,
});

export const insertCommoditySchema = createInsertSchema(commodities).omit({
  id: true,
  lastUpdated: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;
export type Supplier = typeof suppliers.$inferSelect;
export type InsertPurchaseOrder = z.infer<typeof insertPurchaseOrderSchema>;
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type InsertCommodity = z.infer<typeof insertCommoditySchema>;
export type Commodity = typeof commodities.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;
