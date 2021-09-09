import AppController from "./app-controller.js"
import ReadableResponse from "../models/readable-response.js"
import Timeframe from "../models/timeframe.js"

class StatsController extends AppController {

  async index() {
    this.checkReqAPIKey()
    const response = await ReadableResponse.generateForFormat(this.params.dataFormat, new Timeframe(this.params.timeframe))
    this.response.send(response)
  }

  checkReqAPIKey() {
    if (!this.headers["api-key"] || this.headers["api-key"] !== process.env.ANALYTICS_CD_IO_STATS_API_KEY) {
      this.response.status = 403
      this.response.send("<InvalidApiKey> The header apikey is missing or incorrect!")
      throw new Error("<InvalidApiKey> The header apikey is missing or incorrect!")
    }
  }
}

export default StatsController