import express from "express"
const router = express.Router()

// Importation des contrôleurs

// Définition des routes
router.get("/", (req, res) => {
  res.send("Hello World! This is the web route.")
})

module.exports = router
