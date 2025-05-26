import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;

  // Vérifie que le header existe et commence par "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non autorisé : token manquant" });
  }

  const token = authHeader.split(" ")[1]; // Récupère juste le token

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role?: string };

    //  Injecte l'utilisateur dans la requête
    req.user = decoded;

    next(); // tout est bon, on continue
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

export default authMiddleware;
