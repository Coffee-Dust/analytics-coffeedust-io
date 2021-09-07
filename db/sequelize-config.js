import sqlize from "sequelize";
import Report from "../models/report.js";
const {Sequelize, DataTypes} = sqlize;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

//Define model schema:

Report.init({
  // Model attributes are defined here
  eventType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventDetails: {
    type: DataTypes.STRING,
    get(){JSON.parse(this.getDataValue('eventDetails'))},
    set(value){this.setDataValue('eventDetails', JSON.stringify(value))}
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  countryName: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, 
{
  // Other model options go here
  sequelize,
  timestamps: false,
  modelName: 'Report'
});

sequelize.sync();