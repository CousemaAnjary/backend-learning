import express from "express"
import authMiddleware from "../middlewares/authMiddleware"

const router = express.Router()

// Importation des contrôleurs
const Auth = require("../controllers/Auth")
const Categories = require("../controllers/Categories")

// Définition des routes

// Route pour l'authentification
router.post("/register", Auth.register)
router.post("/login", Auth.login)


// ==== 🏷️ Catégories (protégées par middleware) ====
router.post("/category", authMiddleware, Categories.createCategory);

module.exports = router
