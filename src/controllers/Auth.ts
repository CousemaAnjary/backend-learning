import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { Request, Response } from "express"
import db from "../db/drizzle"
import { users } from "../db/schema"
import { registerSchema } from "../schema/auth.schema"


module.exports = {
  async register(req: Request, res: Response) {
    try {
      // Validation des données d'entrée (Zod)
      const validatedData = registerSchema.safeParse(req.body)
      if (!validatedData.success) return res.status(400).json({ success: false, errors: validatedData.error.errors }) 

     // Destructuration des données validées
      const { name, email, password, image } = validatedData.data

      // Vérification si l'utilisateur existe déjà
      const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) })
      if (existingUser) return res.status(400).json({ success: false, message: "User already exists" })

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insertion de l'utilisateur dans la base de données
      const newUser = await db.insert(users).values({
        name, 
        email, 
        password: hashedPassword, 
        image,
      })

    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  },
}
