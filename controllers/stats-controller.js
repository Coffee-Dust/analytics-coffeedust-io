import AppController from "./app-controller.js"
import ReadableResponse from "../models/readable-response.js"
import Timeframe from "../models/timeframe.js"

class StatsController extends AppController {



  checkReqAPIKey() {
    if (this.headers.apikey !== process.env.ANALYTICS_CD_IO_STATS_API_KEY) {
      this.response.status = 403
      throw new Error("<InvalidApiKey> The header apikey is missing or incorrect!")
    }
  }
}

export default StatsController