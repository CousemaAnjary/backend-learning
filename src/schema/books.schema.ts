import { z } from "zod"

export const bookSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  description: z.string().optional(),
  coverImage: z.string().url({ message: "Invalid cover image URL" }).optional(),
  categoryId: z.string().uuid({ message: "Invalid category ID" }),
})
