import express from 'express'
import ReportController from "./controllers/report-controller.js"

const app = express()
const port = 420
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect("https://coffeedust.io/")
})

app.post('/report', (req, res) => {
  new ReportController(req, res, "create")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})