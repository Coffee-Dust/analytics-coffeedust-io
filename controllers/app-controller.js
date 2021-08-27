class AppController {

  constructor(req, res, action) {
    this.method = req.method
    this.action = action
    this.params = req.body
    this.response = res
  }
}

export default AppController