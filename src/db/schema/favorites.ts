import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { books } from "./books";
import { users } from "./auth";

export const favorites = pgTable("favorites", {
  userId: uuid("user_id").notNull().references(() => users.id),
  bookId: uuid("book_id").notNull().references(() => books.id),
  addedAt: timestamp("added_at").notNull().defaultNow(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.bookId] })
]);
