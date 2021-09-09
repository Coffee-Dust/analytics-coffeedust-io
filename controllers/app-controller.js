class AppController {

  constructor(req, res, action) {
    this.method = req.method
    this.headers = req.headers
    this.action = action
    this.params = req.body
    this.response = res

    if (this[action] !== undefined) {
      this[action]()
    } else {
      this.response.status = 404
      this.response.send({error: "Invalid Action"})
      throw Error("InvalidActionForController> Action not defined/not found")
    }
  }

}

export default AppController