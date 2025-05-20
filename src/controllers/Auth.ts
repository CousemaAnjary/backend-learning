import { Request, Response } from "express"
import { registerSchema } from "../schema/auth.schema"
import db from "../db/drizzle"

module.exports = {
  async register(req: Request, res: Response) {
    try {
      // Validation des données d'entrée (Zod)
      const validatedData = registerSchema.safeParse(req.body)
      if (!validatedData.success) return res.status(400).json({ success: false, errors: validatedData.error.errors }) 

     // Destructuration des données validées
      const { name, email, password, image } = validatedData.data

      // Vérification si l'utilisateur existe déjà
      const existingUser = await db.query.users

    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  },
}
