import express from 'express'
import './db/sequelize-config.js'
import ReportController from "./controllers/report-controller.js"

const app = express()
const port = 420
app.use(express.json());

app.use(function (req, res, next) {

  const allowedOrigins = [
    "https://coffeedust.io",
    "http://localhost:3000"
  ]

  if (allowedOrigins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'POST')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  }
  next()
})

app.get('/', (req, res) => {
  res.redirect("https://coffeedust.io/")
})

app.post('/report', (req, res) => {
  new ReportController(req, res, "create")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})