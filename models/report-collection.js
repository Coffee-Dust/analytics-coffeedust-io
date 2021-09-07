import sequelize from "../db/sequelize-config.js";

class ReportCollection {
  // All property setting query method names must start with 'query'

  async runQueryStatisticDataMethods() {
    // Automatic method invoker for instance methods that start with 'query'
    for (const methodName of Object.getOwnPropertyNames(this.constructor.prototype)) {
      if (methodName.slice(0, 5) === "query") { await this[methodName]() }
    }
  }

  constructor(timeframe) {
    this.timeframe = timeframe
    this.uniqueVisits = null
    this.interactionAverage = null
  }

}
export default ReportCollection