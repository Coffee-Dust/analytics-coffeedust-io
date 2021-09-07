import { Sequelize } from "sequelize"

class Report extends Sequelize.Model {

  static async findAllDataForTimeframe(timeframe) {
    return this.findAll({where: {
      createdAt: {[Sequelize.Op.between]: [timeframe.from, timeframe.to]}
    }})
  }

}

export default Report