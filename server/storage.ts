
import { db } from "./db";
import { responses, type InsertResponse, type Response } from "@shared/schema";

export interface IStorage {
  createResponse(res: InsertResponse): Promise<Response>;
  getResponses(): Promise<Response[]>;
}

export class DatabaseStorage implements IStorage {
  async createResponse(res: InsertResponse): Promise<Response> {
    const [newResponse] = await db.insert(responses).values(res).returning();
    return newResponse;
  }

  async getResponses(): Promise<Response[]> {
    return await db.select().from(responses);
  }
}

export const storage = new DatabaseStorage();
