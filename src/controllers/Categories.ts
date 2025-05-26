
import { Request, Response } from "express";
import db from "../db/drizzle";
import { categories } from "../db/schema/categories";


module.exports = {

  async getCategories(req: Request, res: Response) {

  },

  async createCategory(req: Request, res: Response) {
    try {
      // Validation des données d'entrée (Zod)
      const validatedData = req.body; // Assuming you have a Zod schema to validate this
      if (!validatedData) return res.status(400).json({ success: false, message: "Invalid data" });

      // Destructuration des données validées
      const { name } = validatedData

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