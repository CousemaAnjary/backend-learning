
import { Request, Response } from "express";
import db from "../db/drizzle";
import { categories } from "../db/schema/categories";
import { categorySchema } from "../schema/categories.schema";


module.exports = {

  async getCategories(req: Request, res: Response) {

  },

  async createCategory(req: Request, res: Response) {
    try {
      // Validation des données d'entrée (Zod)
      const validatedData = categorySchema.safeParse(req.body);
      if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() });

      // Destructuration des données validées
      const { name } = validatedData.data

      // Insertion de la catégorie dans la base de données
      const newCategory = await db.insert(categories).values({
        name,
      });

      // Retourner une réponse de succès
      return res.status(201).json({ success: true, message: "Category created successfully", category: newCategory });

    }
    catch (error) {
      res.status(500).json({success: false ,message: "Internal server error" });
    }
  }
}