import express from 'express'
import https from 'https'
import fs from 'fs'
import './db/sequelize-config.js'
import ReportController from "./controllers/report-controller.js"
import StatsController from './controllers/stats-controller.js'

const httpsOptions = {
  key: fs.readFileSync(process.env["DEMO_SERVER_SSL_KEY"]),
  cert: fs.readFileSync(process.env["DEMO_SERVER_SSL_CRT"])
};

const app = express()
const port = 420
app.use(express.json());

//Cors Setup:
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

app.post('/stats', (req, res)=> {
  new StatsController(req, res, "index")
})

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

https.createServer(httpsOptions, app).listen(port);