import express from 'express'
import ReportController from "./controllers/report-controller.js"

const app = express()
const port = 420
app.use(express.json());

app.get('/', (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})