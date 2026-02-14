// Load environment variables explicitly (Windows-friendly)
import dotenv from "dotenv";
dotenv.config(); // MUST be first line

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set in your .env file! Did you forget to create it or load dotenv?"
  );
}

// Create PostgreSQL pool using connection string from .env
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle ORM with your schema
export const db = drizzle(pool, { schema });

console.log("✅ Connected to PostgreSQL database successfully!");
