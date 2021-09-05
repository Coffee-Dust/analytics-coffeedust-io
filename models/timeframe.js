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

  get to() {
    return this._to
  }

  set to(dateTime) {
    this._to = new Date(dateTime)
  }

}

export default Timeframe