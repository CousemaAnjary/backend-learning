import express from "express"
const router = express.Router()

// Importation des contrôleurs
const Auth = require("../controllers/Auth")

// Définition des routes
router.post("/register", Auth.register)

module.exports = router
