import moment from "moment"

class Timeframe {

  constructor(timeframeKeyword) {

  }

  get from() {
    return this._from
  }

  set from(dateTime) {
    this._from = new Date(dateTime)
  }

}