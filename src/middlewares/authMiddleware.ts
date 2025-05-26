import { RequestHandler } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "vraiment-secret"


const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Non autorisé : token manquant" })
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string , email: string , role?: string }
    req.user = decoded
    next() 

  } catch (err) {
    res.status(401).json({ message: "Token invalide" })
  }
}

export default authMiddleware
