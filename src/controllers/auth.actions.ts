import { Request, Response } from 'express';

module.exports = {
  
  async register(req: Request, res: Response) {
    // Logic for user registration
    res.status(201).json({ message: "User registered successfully" });
  },
}
