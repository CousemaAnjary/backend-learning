import { Request, Response } from "express"

module.exports = {
  async register(req: Request, res: Response) {
    try {


    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  },
}
