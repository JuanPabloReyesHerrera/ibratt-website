// src/db/schema/profiles.schema.ts
import { pgTable, pgEnum, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["artist", "producer"]);

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  role: roleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
