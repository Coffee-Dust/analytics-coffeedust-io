import Report from "../models/report.js"
import AppController from "./app-controller.js"

class ReportController extends AppController {

  create() {

    const report = Report.build(this.params)
    report.save()
    .catch(error=> {
      this.response.status(569).send({error: true, backtrace: error})
    })
    .then(_=> {
      this.response.send(report)
    })
  }

}

export default ReportController