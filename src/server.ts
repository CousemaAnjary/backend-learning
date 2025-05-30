import express from "express"
const webRoutes = require("./routes/web")
const apiRoutes = require("./routes/api")


const app = express()
const port = 3000

// Middleware pour parser le JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Définir les routes
app.use("/", webRoutes);
app.use("/api", apiRoutes); // Préfixe toutes les routes API avec /api


app.listen(port, () => {
  console.log(`Serveur d'application démarré sur http://localhost:${port}`)
})
