import express from "express"
const router = express.Router()

// Importation des contrôleurs
const Auth = require("../controllers/Auth")

// Définition des routes

// Route pour l'authentification
router.post("/register", Auth.register)
router.post("/login", Auth.login)

// Route pour catégories


module.exports = router
