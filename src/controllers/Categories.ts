
import { Request, Response } from "express";


module.exports = {

  async getCategories(req: Request, res: Response) {

  },

  async createCategory(req: Request, res: Response) {
    try {
      

    }
    catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}