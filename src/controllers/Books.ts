import { Request, Response } from "express";
import { bookSchema } from "../schema/books.schema";

module.exports = {

  async getBooks(req: Request, res: Response) {
   
  },

  async createBook(req: Request, res: Response) {
    try {
      // Validation des données d'entrée (Zod)
      const validatedData = bookSchema.safeParse(req.body);
      if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() })

      // Destructuration des données validées
      const { title, author, description, coverImage, categoryId } = validatedData.data;
      const userId = req.user.id;
     

      // Retourner une réponse de succès
      return res.status(201).json({ success: true, message: "Book created successfully", book: newBook });

      
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}