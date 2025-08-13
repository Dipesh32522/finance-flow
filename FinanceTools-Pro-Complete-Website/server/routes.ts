import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCalculationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Save calculation result
  app.post("/api/calculations", async (req, res) => {
    try {
      const validatedData = insertCalculationSchema.parse(req.body);
      const calculation = await storage.saveCalculation(validatedData);
      res.json(calculation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid calculation data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save calculation" });
      }
    }
  });

  // Get calculation by ID
  app.get("/api/calculations/:id", async (req, res) => {
    try {
      const calculation = await storage.getCalculation(req.params.id);
      if (!calculation) {
        res.status(404).json({ message: "Calculation not found" });
        return;
      }
      res.json(calculation);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch calculation" });
    }
  });

  // Get calculations by type
  app.get("/api/calculations/type/:type", async (req, res) => {
    try {
      const calculations = await storage.getCalculationsByType(req.params.type);
      res.json(calculations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch calculations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
