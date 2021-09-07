import ReportCollection from "./report-collection.js";

class ReadableResponse {


  constructor(format, timeframe) {
    this.format = format
    this.reports = new ReportCollection(timeframe)
  }

}

export default ReadableResponse