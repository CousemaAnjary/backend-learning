import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import db from "../db/drizzle"
import { users } from "../db/schema"
import { loginSchema, registerSchema } from "../schema/auth.schema"

const JWT_SECRET = process.env.JWT_SECRET as string 

module.exports = {
  async register(req: Request, res: Response) {
    try {
      // Validation des données d'entrée (Zod)
      const validatedData = registerSchema.safeParse(req.body)
      if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() }) 

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

      // Returner une réponse de succès
      return res.status(201).json({ success: true, message: "User created successfully" })

    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  },

  async login(req: Request, res: Response)  {
    try {
      // Validation des données d'entrée (Zod)
      const validatedData = loginSchema.safeParse(req.body)
      if (!validatedData.success) return res.status(400).json({ success: false, error: validatedData.error.format() })

      // Destructuration des données validées
      const { email, password } = validatedData.data

      // Recherche de l'utilisateur dans la base de données
      const user = await db.query.users.findFirst({ where: eq(users.email, email) })
      if (!user) return res.status(401).json({ success: false, message: "Invalid email" })

      // Comparer les mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) return res.status(401).json({ success: false, message: "Invalid password" })

      // Générer un token JWT (à implémenter)
      const token = jwt.sign({ id: user.id, email: user.email , role:user.role }, JWT_SECRET, { expiresIn: "1h" })

      // Retourner une réponse de succès avec le token
      return res.status(200).json({success: true, message: "Login successful", token })



    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  }
}
