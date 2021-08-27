class AppController {

  constructor(req, res, action) {
    this.method = req.method
    this.action = action
    this.params = req.body
    this.response = res

    try {
      this[action]()
    } catch (error) {
      this.response.status = 404
      this.response.send({error: "Invalid Action"})
      throw Error("InvalidActionForController> Action not defined/not found")
    }
  }
}

export default AppController