import ReportCollection from "./report-collection.js";

class ReadableResponse {

  summary() {

  }

  static async generateForFormat(format, timeframe) {
    const rr = new this(format, timeframe)
    await rr.reports.runQueryStatisticDataMethods()

    if (typeof rr[rr.format] === 'function') {
      return rr[rr.format]()
    } else {
      throw new Error("<UnknownReadableResponseFormatRequested> Invalid/Unknown dataFormat. Check spelling and make sure it's in camelCase.")
    }
  }

  constructor(format, timeframe) {
    this.format = format
    this.reports = new ReportCollection(timeframe)
  }

}

export default ReadableResponse