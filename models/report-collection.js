import sequelize from "../db/sequelize-config.js";

class ReportCollection {

  constructor(timeframe) {
    this.timeframe = timeframe
    this.uniqueVisits = null
    this.interactionAverage = null
  }

}
export default ReportCollection