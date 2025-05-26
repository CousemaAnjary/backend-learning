import { users } from "./auth";
import { categories } from "./categories"
import { boolean, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  description: text("description"),
  coverImage: text("cover_image"),

  categoryId: uuid("category_id").notNull().references(() => categories.id),
  userId: uuid("user_id").notNull().references(() => users.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});
