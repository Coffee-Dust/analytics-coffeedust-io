import sequelize from "../db/sequelize-config.js";
import Report from "./report.js";

class ReportsStatistics {
  // All property setting query method names must start with 'query'

  async queryUniqueVisitsAndInteractionCount() {
    const [data, _] = await sequelize.query(`
    SELECT ip, COUNT(eventType) as 'interactionCount' FROM 'Reports' 
    ${this.timeframe.sqlQuery()} 
    GROUP BY ip;`)

    this.uniqueVisits = data.length
    const sum = data.reduce((prev, curr)=> prev.interactionCount || 0 + curr.interactionCount, 0)
    this.interactionAverage = sum / this.uniqueVisits
  }

  async queryProjectStatistics() {
    const reports = await sequelize.query(`
    SELECT * FROM 'Reports'
    ${this.timeframe.sqlQuery()} 
    AND eventType = 'projectDetailsClick';`, {model: Report, mapToModel: true})

    this.projects.totalClicks = reports.length

    this.projects.mostViewed = (function() {
      const nameToOccurances = {}
      const mostViewed = {name: null, occurances: 0}

      reports.forEach(report => {
        const projectName = report.eventDetails.projectName

        if (typeof nameToOccurances[projectName] === "number") {
          let num = nameToOccurances[projectName] += 1
          if (num > mostViewed.occurances) {
            mostViewed.name = projectName; mostViewed.occurances = num
          }
        } else { nameToOccurances[report.eventDetails.projectName] = 1 }
      })//endof foreach

      return `${mostViewed.name} at ${mostViewed.occurances} views,`
    })()
  }

  async queryDemoStatistics() {
    const [startedDemos, _] = await sequelize.query(`
    SELECT id, eventDetails FROM 'Reports'
    ${this.timeframe.sqlQuery()} 
    AND eventType = 'projectDemoStart';`);
    this.demos.totalStarts = startedDemos.length

    const [visitedDemos, _sql] = await sequelize.query(`
    SELECT id, eventDetails FROM 'Reports'
    ${this.timeframe.sqlQuery()} 
    AND eventType = 'projectDemoVisit';`);
    this.demos.totalVisits = visitedDemos.length
  }

  async queryLocationStatistics() {
    const [regionAndCountryData, _] = await sequelize.query(`
    SELECT region, countryName FROM 'Reports'
    ${this.timeframe.sqlQuery()}
    GROUP BY region, countryName;`)

    this.locations.stateAndCountries = regionAndCountryData.map(obj=> `${obj.region}, ${obj.countryName}`)
  }


  async getPropDataFromAllQueryMethods() {
    // Automatic method invoker for instance methods that start with 'query'
    for (const methodName of Object.getOwnPropertyNames(this.constructor.prototype)) {
      if (methodName.slice(0, 5) === "query") { await this[methodName]() }
    }
  }

  constructor(timeframe) {
    this.timeframe = timeframe
    this.uniqueVisits = null
    this.interactionAverage = null
    this.projects = {}
    this.demos = {}
    this.locations = {}
  }

}
export default ReportsStatistics