import express from "express"
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("Bienvenue sur mon serveur Express ! 👋")
})

app.listen(port, () => {
  console.log(`Serveur d'application démarré sur http://localhost:${port}`)
})
