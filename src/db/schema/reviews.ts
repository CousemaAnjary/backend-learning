import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { books } from "./books";

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  bookId: uuid("book_id").notNull().references(() => books.id),
  content: text("content").notNull(),
  rating: integer("rating").notNull(), // tu peux ajouter des contraintes plus tard (1-5)
  createdAt: timestamp("created_at").notNull().defaultNow(),
});