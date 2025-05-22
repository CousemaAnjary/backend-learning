import { boolean, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});