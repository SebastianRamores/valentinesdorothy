
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.response.create.path, async (req, res) => {
    try {
      const input = api.response.create.input.parse(req.body);
      const response = await storage.createResponse(input);
      res.status(201).json(response);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.response.getStats.path, async (req, res) => {
    const stats = await storage.getResponses();
    res.json(stats);
  });

  return httpServer;
}
