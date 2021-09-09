import ReportsStatistics from "./reports-statistics.js";

class ReadableResponse {

  summary() {
    return `
    coffeedust.io has received ${this.stats.uniqueVisits} unique visits so far ${this.timeframe.keyword},\n
    With user interaction at an average of ${Math.round(this.stats.interactionAverage)} clicks,\n
    ------------\n
    Project details have been viewed ${this.stats.projects.totalClicks} times with ${this.stats.projects.mostViewed} being the most viewed,\n
    ${this.stats.demos.totalStarts} project demo's have been started today and ${this.stats.demos.totalVisits} users went to demo.cd.io after starting,\n
    ------------\n
    Users locations included: ${this.stats.locations.stateAndCountries.reduce((prev, curr)=> `${prev},\n${curr}`, "")}
    `
  }

  static async generateForFormat(format, timeframe) {
    const readableResponse = new this(format, timeframe)
    await readableResponse.stats.getPropDataFromAllQueryMethods()

    if (typeof readableResponse[readableResponse.format] === 'function') {
      return readableResponse[readableResponse.format]()
    } else {
      throw new Error("<UnknownReadableResponseFormatRequested> Invalid/Unknown dataFormat. Check spelling and make sure it's in camelCase.")
    }
  }

  constructor(format, timeframe) {
    this.format = format
    this.timeframe = timeframe
    this.stats = new ReportsStatistics(this.timeframe)
  }

}

export default ReadableResponse