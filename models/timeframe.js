import moment from "moment"

class Timeframe {

  constructor(timeframeKeyword) {
    switch (timeframeKeyword) {
      case "today":
        this.from = moment().startOf('day')
        this.to = moment().endOf('day')
        break;
      default:
        throw new Error("<UnknownTimeframeKeyword> Unknown or invalid timeframe keyword was provided to Timeframe instance.")
    }
  }

  get from() {
    return moment(this._from).format('YYYY-MM-DD HH:mm')
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