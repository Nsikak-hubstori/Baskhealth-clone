import { pgTable, text, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";
export const tenants = pgTable("tenants", { id: uuid("id").defaultRandom().primaryKey(), slug: text("slug").unique().notNull(), name: text("name").notNull(), createdAt: timestamp("created_at").defaultNow() });
export const questions = pgTable("questions", { id: uuid("id").defaultRandom().primaryKey(), tenantId: text("tenant_id").notNull(), label: text("label").notNull(), type: text("type").notNull(), options: jsonb("options") });
export const submissions = pgTable("submissions", { id: uuid("id").defaultRandom().primaryKey(), tenantId: text("tenant_id").notNull(), data: jsonb("data").notNull(), status: text("status").default("pending"), createdAt: timestamp("created_at").defaultNow() });
