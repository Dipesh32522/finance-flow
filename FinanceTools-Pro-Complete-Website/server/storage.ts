import { type Calculation, type InsertCalculation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  saveCalculation(calculation: InsertCalculation): Promise<Calculation>;
  getCalculation(id: string): Promise<Calculation | undefined>;
  getCalculationsByType(type: string): Promise<Calculation[]>;
}

export class MemStorage implements IStorage {
  private calculations: Map<string, Calculation>;

  constructor() {
    this.calculations = new Map();
  }

  async saveCalculation(insertCalculation: InsertCalculation): Promise<Calculation> {
    const id = randomUUID();
    const calculation: Calculation = {
      ...insertCalculation,
      id,
      createdAt: new Date(),
    };
    this.calculations.set(id, calculation);
    return calculation;
  }

  async getCalculation(id: string): Promise<Calculation | undefined> {
    return this.calculations.get(id);
  }

  async getCalculationsByType(type: string): Promise<Calculation[]> {
    return Array.from(this.calculations.values()).filter(
      (calc) => calc.type === type
    );
  }
}

export const storage = new MemStorage();
