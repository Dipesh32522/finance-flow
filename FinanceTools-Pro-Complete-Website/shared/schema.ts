import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const calculations = pgTable("calculations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // 'emi', 'sip', 'rent-vs-buy', 'gst', 'compound-interest', 'unit-converter'
  inputs: json("inputs").notNull(),
  results: json("results").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCalculationSchema = createInsertSchema(calculations).pick({
  type: true,
  inputs: true,
  results: true,
});

export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type Calculation = typeof calculations.$inferSelect;
