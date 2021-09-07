import sequelize from "../db/sequelize-config.js";

class ReportCollection {
  // All property setting query method names must start with 'query'

  async queryUniqueVisitsAndInteractionCount() {
    const [data, _] = await sequelize.query(`
    SELECT ip, COUNT(eventType) as 'interactionCount' FROM 'Reports' 
    WHERE createdAt BETWEEN '${this.timeframe.from}' AND '${this.timeframe.to}' 
    GROUP BY ip;`)

    this.uniqueVisits = data.length
    const sum = data.reduce((prev, curr)=> prev.interactionCount || 0 + curr.interactionCount, 0)
    this.interactionAverage = sum / this.uniqueVisits
  }

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