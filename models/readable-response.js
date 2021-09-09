import ReportCollection from "./report-collection.js";

class ReadableResponse {

  summary() {
    return `
    coffeedust.io has received ${this.reports.uniqueVisits} unique visits so far,\n
    With user interaction at an average of ${Math.round(this.reports.interactionAverage)} clicks,\n
    ------------\n
    Project details have been viewed ${this.reports.projects.totalClicks} times with ${this.reports.projects.mostViewed} being the most viewed,\n
    ${this.reports.demos.totalStarts} project demo's have been started today and ${this.reports.demos.totalVisits} users went to demo.cd.io after starting,\n
    ------------\n
    Users locations included: ${this.reports.locations.stateAndCountries.reduce((prev, curr)=> `${prev},\n${curr}`, "")}
    `
  }

  static async generateForFormat(format, timeframe) {
    const readableResponse = new this(format, timeframe)
    await readableResponse.reports.runQueryStatisticDataMethods()

    if (typeof readableResponse[readableResponse.format] === 'function') {
      return readableResponse[readableResponse.format]()
    } else {
      throw new Error("<UnknownReadableResponseFormatRequested> Invalid/Unknown dataFormat. Check spelling and make sure it's in camelCase.")
    }
  }

  constructor(format, timeframe) {
    this.format = format
    this.timeframe = timeframe
    this.reports = new ReportCollection(this.timeframe)
  }

}

export default ReadableResponse