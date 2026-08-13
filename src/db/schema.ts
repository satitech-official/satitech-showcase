import { jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const enquiries = pgTable("enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  business: varchar("business", { length: 160 }),
  contact: varchar("contact", { length: 180 }).notNull(),
  projectType: varchar("project_type", { length: 120 }).notNull(),
  budgetRange: varchar("budget_range", { length: 120 }),
  message: text("message").notNull(),
  source: varchar("source", { length: 80 }).default("portfolio"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
